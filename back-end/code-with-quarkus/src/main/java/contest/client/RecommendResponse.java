package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RecommendResponse {
    @JsonProperty("recommendation")
    String recommendation;
}
