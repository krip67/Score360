package contest.service;

import contest.model.User;
import contest.repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.UUID;

import static contest.util.TokenUtil.createUser;
import static contest.util.TokenUtil.parseUuid;

@ApplicationScoped
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JsonWebToken jsonWebToken;

    @Transactional
    public User me() {
        var id = parseUuid(jsonWebToken);
        var user = userRepository.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        var newUser = createUser(jsonWebToken);
        userRepository.save(newUser);
        return newUser;
    }
}
