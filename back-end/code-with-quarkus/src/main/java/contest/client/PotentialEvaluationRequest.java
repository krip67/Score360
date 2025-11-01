package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class PotentialEvaluationRequest {
    private List<String> traits;
    @JsonProperty("communication_case")
    private Boolean commCase;
}
