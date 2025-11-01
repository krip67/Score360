package contest.client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.POST;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(baseUri = "http://194.87.30.33:8081/api/potential-evaluation")
@ApplicationScoped
public interface PotentialEvaluationClient {

    @POST
    PotentialEvaluationResponse getPotentialEvaluation(PotentialEvaluationRequest request);
}
