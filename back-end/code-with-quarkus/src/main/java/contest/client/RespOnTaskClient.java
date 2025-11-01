package contest.client;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.POST;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(baseUri = "http://194.87.30.33:8022/api/calculate_employee_performance_rating")
@ApplicationScoped
public interface RespOnTaskClient {

    @POST
    RespOnTaskResponse getRespOnTask(RespOnTaskRequest request);
}
