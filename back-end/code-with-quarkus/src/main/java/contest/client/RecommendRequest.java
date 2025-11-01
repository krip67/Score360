package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecommendRequest {

    @JsonProperty("employee_feedback")
    private List<String> employeeFeedback;
    @JsonProperty("peer_feedbacks")
    private List<List<String>> peerFeedback;
    @JsonProperty("manager_feedback")
    private List<String> managerFeedback;
}
