package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PotentialEvaluationResponse {
    @JsonProperty("potential_score_res")
    Integer score;
}
