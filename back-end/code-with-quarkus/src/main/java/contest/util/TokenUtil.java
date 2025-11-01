package contest.util;

import contest.model.User;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.UUID;

public class TokenUtil {

    public static UUID parseUuid(JsonWebToken jsonWebToken){
        return UUID.fromString(parseClaim(jsonWebToken, "user_id"));
    }

    public static User createUser(JsonWebToken jsonWebToken){
        return User.builder()
                .id(parseUuid(jsonWebToken))
                .username(parseClaim(jsonWebToken, "preferred_username"))
                .firstName(parseClaim(jsonWebToken, "given_name"))
                .lastName(parseClaim(jsonWebToken, "family_name"))
                .patronymic(parseClaim(jsonWebToken, "patronymic"))
                .department(parseClaim(jsonWebToken, "department"))
                .team(parseClaim(jsonWebToken, "team"))
                .post(parseClaim(jsonWebToken, "post"))
                .build();
    }

    private static String parseClaim(JsonWebToken jsonWebToken, String claimName){
        return jsonWebToken.getClaim(claimName);
    }
}
