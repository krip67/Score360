package contest.client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.POST;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(baseUri = "http://194.87.30.33:8027/api/calculate_self_assessment_score")
@ApplicationScoped
public interface FinalSelfClient {

    @POST
    FinalSelfResponse getFinalSelf(FinalSelfRequest request);
}
