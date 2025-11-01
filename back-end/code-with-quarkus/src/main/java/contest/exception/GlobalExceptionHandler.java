package contest.exception;

import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.util.HashMap;
import java.util.Map;

@Provider
public class GlobalExceptionHandler implements ExceptionMapper<Exception>{

    @Override
    public Response toResponse(Exception e) {
        Map<String, Object> response = new HashMap<>();
        response.put("Ошибка", e.getMessage());
        return Response.status(Response.Status.BAD_REQUEST)
                .entity(response)
                .build();
    }
}
