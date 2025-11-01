package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FinalSelfResponse {
    @JsonProperty("final_self")
    Integer finalSelf;
}
