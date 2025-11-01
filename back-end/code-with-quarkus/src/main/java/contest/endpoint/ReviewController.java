package contest.endpoint;


import contest.dto.AddReviewRequest;
import contest.dto.RespAssessmentDto;
import contest.dto.ReviewDto;
import contest.model.BossAssessment;
import contest.service.ReviewService;

import jakarta.ws.rs.*;
import lombok.RequiredArgsConstructor;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;

import java.util.List;

@Path("review")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class ReviewController {

    private final ReviewService reviewService;

    @POST
    public void addReview(@RequestBody AddReviewRequest request) {
        reviewService.addReviews(request);
    }

    @GET
    @Path("/resp")
    public List<ReviewDto> getAllForRespReview() {
        return reviewService.getAllForRespReview();
    }

    @POST
    @Path("/{reviewId}/resp")
    public ReviewDto respReview(@PathParam("reviewId") Integer reviewId, @RequestBody RespAssessmentDto respAssessmentDto) {
        return reviewService.respReview(reviewId, respAssessmentDto);
    }

    @GET
    @Path("/boss")
    public List<ReviewDto> getAllForBossReview() {
        return reviewService.getAllForBossReview();
    }

    @POST
    @Path("/{taskId}/boss")
    public ReviewDto bossReview(@PathParam("taskId") Integer taskId, @RequestBody BossAssessment bossAssessment) {
        return reviewService.bossReview(taskId, bossAssessment);
    }

//    @PUT
//    @Path("/{taskId}/boss")
//    public ReviewDto updateBossReview(@PathParam("taskId") Integer taskId, @RequestBody BossAssessment bossAssessment) {
//        return reviewService.updateBossReview(taskId, bossAssessment);
//    }
}
