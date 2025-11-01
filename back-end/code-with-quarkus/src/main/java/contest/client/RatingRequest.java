package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RatingRequest {
    /**
     * Финальный потенциал
     */
    @JsonProperty("final_potential_result")
    private Integer potential;
    @JsonProperty("final_self")
    private Integer self;
    @JsonProperty("final_reasp")
    private Integer reasp;
    @JsonProperty("final_score")
    private Integer boss;
    /**
     * Результативность из потенциала
     */
    @JsonProperty("potential_score_res")
    private Integer potentialResult;
}
