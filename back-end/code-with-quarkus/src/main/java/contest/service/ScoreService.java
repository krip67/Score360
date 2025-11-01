package contest.service;

import contest.dto.AggregateRequest;
import contest.dto.ScoreDto;
import contest.mapper.PotentialMapper;
import contest.mapper.ScoreMapper;
import contest.repository.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static contest.util.TokenUtil.parseUuid;
import static java.util.Objects.isNull;

@ApplicationScoped
@RequiredArgsConstructor
public class ScoreService {

    private final ScoreAggregator scoreAggregator;
    private final ScoreRepository scoreRepository;
    private final PotentialMapper potentialMapper;
    private final PotantialScoreRepository potantialScoreRepository;
    private final ScoreMapper scoreMapper;
    private final JsonWebToken jsonWebToken;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final CoursesRepository coursesRepository;

    @Transactional
    public ScoreDto aggregateScore(UUID userId, AggregateRequest aggregateRequest) {
        var tasks = taskRepository.findAllOnReviewByUser(userId);
        if (tasks.isEmpty()) {
            throw new RuntimeException("Нет целей на оценку!");
        }
        var potentialScore = potentialMapper.toEntity(aggregateRequest);
        potantialScoreRepository.save(potentialScore);
        var scoreDto = scoreAggregator.aggregateResultScore(tasks, potentialScore, userId);
        scoreDto.setPotentialScoreId(potentialScore.getId());
        return scoreDto;
    }

    @Transactional
    public ScoreDto saveScoreForUser(UUID userId, ScoreDto scoreDto) {
        var tasks = taskRepository.findAllOnReviewByUser(userId);
        var user = userRepository.findById(userId).get();
        var score = scoreMapper.toEntity(scoreDto);
        score.setTask(tasks);
        score.setOwner(user);
        score.setPotentialScore(potantialScoreRepository.findById(scoreDto.getPotentialScoreId()));
        score.setCreateTime(Instant.now());
        scoreRepository.save(score);
        //TODO:Закрыть все ревью не заполненные
        tasks.forEach(x -> {
            x.setScore(score);
            x.getReviews().stream()
                    .filter(rev -> isNull(rev.getRespAssessment()))
                    .forEach(reviewRepository::delete);
        });

        score.setCourses(coursesRepository.findAllById(scoreDto.getSelectedCourses()));
        return scoreMapper.toDto(score);
    }

    public List<ScoreDto> getMyHistory() {
        return scoreRepository.getAllByUserId(parseUuid(jsonWebToken))
                .stream()
                .map(scoreMapper::toDto)
                .toList();
    }

    public List<ScoreDto> getUserHistory(UUID userId) {
        return scoreRepository.getAllByUserId(userId)
                .stream()
                .map(scoreMapper::toDto)
                .toList();
    }
}
