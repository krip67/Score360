package contest.endpoint;

import contest.dto.AggregateRequest;
import contest.dto.ScoreDto;
import contest.service.ScoreService;
import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import lombok.RequiredArgsConstructor;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

import java.util.List;
import java.util.UUID;

@Path("score")
@ApplicationScoped
@RequiredArgsConstructor
@Authenticated
public class ScoreController {

    private final ScoreService scoreService;

    @GET
    @Path("/history")
    public List<ScoreDto> getMyHistory(){
        return scoreService.getMyHistory();
    }

    @GET
    @RolesAllowed("boss")
    @Path("/history/{userId}")
    public List<ScoreDto> getMyHistory(@PathParam("userId") UUID userId){
        return scoreService.getUserHistory(userId);
    }

    @POST
    @RolesAllowed("boss")
    @Path("/aggregate/{userId}")
    public ScoreDto aggregateScore(@PathParam("userId") UUID userId, @RequestBody AggregateRequest aggregateRequest){
        return scoreService.aggregateScore(userId, aggregateRequest);
    }

    @POST
    @RolesAllowed("boss")
    @Path("/finalize/{userId}")
    public ScoreDto finalizeScore(@PathParam("userId") UUID userId, @RequestBody ScoreDto scoreDto){
        return scoreService.saveScoreForUser(userId, scoreDto);
    }
}
