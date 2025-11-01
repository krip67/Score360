package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PotentialScoreResponse {
    @JsonProperty("final_potential_result")
    Integer score;
}
