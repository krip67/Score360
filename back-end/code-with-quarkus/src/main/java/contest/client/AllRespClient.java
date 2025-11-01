package contest.client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.POST;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(baseUri = "http://194.87.30.33:8099/api/calculate_employee_final")
@ApplicationScoped
public interface AllRespClient {

    @POST
    public FinalRespResponse getAllResp(FinalRespRequest request);
}
