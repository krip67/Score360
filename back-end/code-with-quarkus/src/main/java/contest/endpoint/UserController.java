package contest.endpoint;

import contest.model.User;
import contest.repository.UserRepository;
import contest.service.UserService;
import io.quarkus.security.Authenticated;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;

import java.util.List;

@Path("user")
@ApplicationScoped
@RequiredArgsConstructor
@Authenticated
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    private final UserRepository userRepository;
    private final UserService userService;

    @GET
    public List<User> users() {
        return userRepository.findAll()
                .stream()
                .filter(x -> !x.getUsername().equals("boss"))
                .toList();
    }

    @GET
    @Path("/me")
    public User me() {
        return userService.me();
    }
}
