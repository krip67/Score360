package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FinalResultRespone {
    @JsonProperty("final_res_mark")
    Integer score;
}
