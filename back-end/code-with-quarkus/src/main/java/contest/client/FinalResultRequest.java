package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FinalResultRequest {
    @JsonProperty("final_score")
    private Integer boss;
    @JsonProperty("potential_score_res")
    private Integer potentialScore;
    @JsonProperty("final_reasp")
    private Integer reasp;
    @JsonProperty("final_self")
    private Integer self;
}
