package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FinalRespResponse {
    @JsonProperty("final_reasp")
    Integer finalResp;
}
