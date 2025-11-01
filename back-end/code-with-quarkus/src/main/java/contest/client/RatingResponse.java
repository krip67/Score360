package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RatingResponse {
    @JsonProperty("employee_rating")
    Double score;
}
