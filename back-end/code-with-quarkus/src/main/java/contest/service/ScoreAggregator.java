package contest.service;

import contest.client.*;
import contest.dto.ScoreDto;
import contest.model.PotentialScore;
import contest.model.RespAssessment;
import contest.model.Review;
import contest.model.Score;
import contest.model.Task;
import contest.repository.TaskRepository;
import contest.repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.naming.OperationNotSupportedException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@ApplicationScoped
public class ScoreAggregator {

    @Inject
    TaskRepository taskRepository;
    @RestClient
    FinalSelfClient finalSelfClient;
    @RestClient
    RespOnTaskClient respOnTaskClient;
    @RestClient
    AllRespClient allRespClient;
    @RestClient
    RukScoreClient rukScoreClient;
    @RestClient
    PotentialEvaluationClient potentialEvaluationClient;
    @RestClient
    FinalResultClient finalResultClient;
    @RestClient
    PotentialScoreClient potentialScoreClient;
    @RestClient
    RatingClient ratingClient;
    @RestClient
    CourseClient courseClient;
    @RestClient
    RecommendationClient recommendationClient;

    public ScoreDto aggregateResultScore(
            List<Task> tasks,
            PotentialScore potentialScore,
            UUID userId
    ){
        //Агрегируем самооценку
        var selfReq = new FinalSelfRequest();
        tasks.forEach(x -> {
            var self = x.getSelfAssessment();
            selfReq.addAnswer1(self.getInteractionScore());
            selfReq.addAnswer2(self.getSatisfaction());
        });
        var finalSelf = finalSelfClient.getFinalSelf(selfReq).getFinalSelf();


        //Агрегируем оценку руководителя
        if(tasks.stream().anyMatch(x->isNull(x.getBossAssessment()))){
            throw new RuntimeException("Есть задачи без оценки руководителя. \nПроверьте раздел Оценка задач подчиненных");
        }
        var rukReq = new RukScoreRequest();
        tasks.forEach(x -> {
            var boss = x.getBossAssessment();
            rukReq.addRes(boss.getResultScore());
            rukReq.addQual(boss.getInteractionScore());
            rukReq.addRate(boss.getTotalScore());
        });
        var rukResponse = rukScoreClient.getRukScore(rukReq).getFinalScore();


        //Агрегируем оценку респондентов
        var resps = tasks.stream()
                .map(x -> {
                    var resp = x.getReviews();
                    var req = new RespOnTaskRequest();
                    resp.stream()
                            .filter(xx -> nonNull(xx.getRespAssessment()))
                            .forEach(y -> {
                                req.addAnswer1(y.getRespAssessment().getResultScore());
                                req.addAnswer2(y.getRespAssessment().getInteractionScore());
                            });
                    return respOnTaskClient.getRespOnTask(req).getTaskResp();
                })
                .collect(Collectors.toList());
        var respResult = allRespClient.getAllResp(new FinalRespRequest(resps)).getFinalResp();

        //Агрегируем оценку результативности из потенциала
        PotentialEvaluationRequest potentialEvaluationRequest = new PotentialEvaluationRequest();
        potentialEvaluationRequest.setCommCase(potentialScore.getIsMotivation());
        potentialEvaluationRequest.setTraits(
                Arrays.stream(potentialScore.getHardSkill().split(","))
                        .map(String::trim)
                        .collect(Collectors.toList()));
        var potentialEvaluation = potentialEvaluationClient.getPotentialEvaluation(potentialEvaluationRequest).getScore();

        //Получаем финальную оценку результативности
        var finalResultScore = finalResultClient.finalResult(
                FinalResultRequest.builder()
                        .boss(rukResponse)
                        .self(finalSelf)
                        .reasp(respResult)
                        .potentialScore(potentialEvaluation)
                        .build()
        ).getScore();


        //Получаем оценку потенциала
        var potentialRequest = new PotentialScoreRequest();
        potentialRequest.setTraits(
                Arrays.stream(potentialScore.getSoftSkill().split(","))
                        .map(String::trim)
                        .collect(Collectors.toList())
        );
        potentialRequest.setIsMotivation(potentialScore.getIsMotivation());
        potentialRequest.setIsSuccessor(potentialScore.getIsSuccessor());
        if (nonNull(potentialScore.getReadiness())) {
            potentialRequest.setReadinessPeriod(potentialScore.getReadiness().getPriority());
        }
        potentialRequest.setInteres(potentialScore.getPromotionEnum().getLevel());
        potentialRequest.setRetentionRisk(potentialScore.getLeavingRisk());
        var potentialResultScore = potentialScoreClient.getRespOnTask(potentialRequest).getScore();

        //Получаем рейтинг
        var rating = ratingClient.getRating(
                RatingRequest.builder()
                        .self(finalSelf)
                        .reasp(respResult)
                        .boss(rukResponse)
                        .potentialResult(potentialEvaluation)
                        .potential(potentialResultScore)
                        .build()
        ).getScore();


        //Получаем список курсов
        var courseIds = courseClient.getAllResp(
                CourseRequest.builder()
                        .employeeFeedback(
                                tasks.stream()
                                        .map(x -> x.getSelfAssessment().getFuture())
                                        .toList()
                        )
                        .peerFeedback(
                                tasks.stream()
                                        .map(x->x.getReviews().stream()
                                                .map(Review::getRespAssessment)
                                                .filter(Objects::nonNull)
                                                .map(RespAssessment::getRecommendation)
                                                .toList()
                                        )
                                        .toList()
                        )
                        .managerFeedback(
                                tasks.stream()
                                        .map(x->x.getBossAssessment().getRecommendation())
                                        .toList()
                        )
                        .build()
        ).getCourses();

        //Получаем рекомендацию
        String recomm;
        try {
            recomm = recommendationClient.getRecommend(
                    RecommendRequest.builder()
                            .employeeFeedback(
                                    tasks.stream()
                                            .map(x -> x.getSelfAssessment().getFuture())
                                            .toList()
                            )
                            .peerFeedback(
                                    tasks.stream()
                                            .map(x -> x.getReviews().stream()
                                                    .map(Review::getRespAssessment)
                                                    .filter(Objects::nonNull)
                                                    .map(RespAssessment::getRecommendation)
                                                    .toList()
                                            )
                                            .toList()
                            )
                            .managerFeedback(
                                    tasks.stream()
                                            .map(x -> x.getBossAssessment().getRecommendation())
                                            .toList()
                            )
                            .build()
            ).getRecommendation();
        } catch (Exception e){
            System.out.println(e.getStackTrace());
            System.out.println(e.getMessage());
            recomm = "Напишите Ваш отзыв";
            recomm = recomm.replaceAll("[#*$-]", "");
        }


        return ScoreDto.builder()
                .effectiveness(finalResultScore)
                .potential(potentialResultScore)
                .rating(rating)
                .recommendation(recomm)
                .selectedCourses(courseIds)
                .build();
    }

}
