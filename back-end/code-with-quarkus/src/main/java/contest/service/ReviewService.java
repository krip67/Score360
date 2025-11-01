package contest.service;

import contest.dto.AddReviewRequest;
import contest.dto.RespAssessmentDto;
import contest.dto.ReviewDto;
import contest.mapper.AssessmentMapper;
import contest.mapper.ReviewMapper;
import contest.model.*;
import contest.repository.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static contest.util.TokenUtil.parseUuid;
import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@ApplicationScoped
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final ScoreRepository scoreRepository;
    private final SelfAssessmentRepository selfAssessmentRepository;
    private final RespAssessmentRepository respAssessmentRepository;
    private final BossAssessmentRepository bossAssessmentRepository;
    private final AssessmentMapper assessmentMapper;
    private final JsonWebToken jsonWebToken;

    public List<ReviewDto> getAllForRespReview() {
        return reviewRepository.getAllForRespReview().stream()
                .map(x -> {
                            var output = reviewMapper.toDto(x);
                            output.setTaskName(output.getTaskName() + "\n" + x.getTask().getAuthor().getName());
                            return output;
                        }
                )
                .collect(Collectors.toList());
    }

    @Transactional
    public void addReviews(AddReviewRequest request) {
        var task = taskRepository.findById(request.getTaskId());
        var selfAss = SelfAssessment.builder()
                .result(request.getResult())
                .personalContribution(request.getPersonalContribution())
                .experience(request.getExperience())
                .future(request.getFuture())
                .interactionScore(request.getInteractionScore())
                .satisfaction(request.getSatisfaction())
                .build();
        selfAssessmentRepository.save(selfAss);
        task.setSelfAssessment(
                selfAss
        );
        var users = request.getReviewerIds()
                .stream()
                .map(userRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
        var reviews = users.stream()
                .map(x -> {
                    return Review.builder()
                            .reviewer(x)
                            .task(task)
                            .build();
                })
                .collect(Collectors.toList());
        reviewRepository.saveAll(reviews);
    }

    @Transactional
    public ReviewDto respReview(Integer reviewId, RespAssessmentDto respAssessmentDto) {
        var review = reviewRepository.getById(reviewId);
        var respAss = RespAssessment.builder()
                .comment(respAssessmentDto.getComment())
                .recommendation(respAssessmentDto.getRecommendation())
                .resultScore(respAssessmentDto.getResultScore())
                .interactionScore(respAssessmentDto.getResultScore())
                .build();
        respAssessmentRepository.save(respAss);
        review.setRespAssessment(respAss);
        reviewRepository.saveAll(List.of(review));
        var output = reviewMapper.toDto(review);
        // output.setTaskName(output.getTaskName() + review.getTask().getAuthor().getName());
        return output;
    }

    public List<ReviewDto> getAllForBossReview() {
        return taskRepository.getAllForBossReview(parseUuid(jsonWebToken)).stream()
                .filter(x -> x.getReviews().stream().anyMatch(rev -> nonNull(rev.getRespAssessment())))
                .map(x -> {
                            var output = reviewMapper.taskToReviewDto(x);
                            output.setTaskName(output.getTaskName() + "\n" + x.getAuthor().getName());
                            return output;
                        }
                )
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDto bossReview(Integer taskId, BossAssessment bossAssessment) {
        var task = taskRepository.findById(taskId);
        bossAssessmentRepository.save(bossAssessment);
        task.setBossAssessment(bossAssessment);
        taskRepository.saveTask(task);
        return reviewMapper.taskToReviewDto(task);
    }

    @Transactional
    public ReviewDto updateBossReview(Integer taskId, BossAssessment bossAssessment) {
        var task = taskRepository.findById(taskId);
        var bossAss = task.getBossAssessment();
        bossAss.setComment(bossAss.getComment());
        bossAss.setContribution(bossAss.getContribution());
        bossAss.setRecommendation(bossAss.getRecommendation());
        bossAss.setResultScore(bossAss.getResultScore());
        bossAss.setInteractionScore(bossAss.getInteractionScore());
        bossAss.setTotalScore(bossAss.getTotalScore());
        bossAssessmentRepository.save(bossAssessment);
        return reviewMapper.taskToReviewDto(task);
    }
}