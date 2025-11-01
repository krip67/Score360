package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RespOnTaskResponse {
    @JsonProperty("final_reasp_for_task")
    Integer taskResp;
}
