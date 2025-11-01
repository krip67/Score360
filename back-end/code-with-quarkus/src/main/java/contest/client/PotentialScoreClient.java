package contest.client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.POST;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(baseUri = "http://194.87.30.33:8023/api/calculate_potential_score")
@ApplicationScoped
public interface PotentialScoreClient {
    @POST
    PotentialScoreResponse getRespOnTask(PotentialScoreRequest request);
}
