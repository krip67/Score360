package contest.endpoint;

import contest.dto.MetricDto;
import contest.service.MetricService;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Path("/metric")
@RequiredArgsConstructor
public class MetricController {
    private final MetricService metricService;

    @GET
    @Path("/{categoryId}")
    public List<MetricDto> allByCategoryId(@PathParam("categoryId") String categoryId) {
        return metricService.findAllByCategoryId(categoryId);
    }
}
