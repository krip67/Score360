package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseRequest {
    @JsonProperty("employee_feedback")
    private List<String> employeeFeedback;
    @JsonProperty("peer_feedbacks")
    private List<List<String>> peerFeedback;
    @JsonProperty("manager_feedback")
    private List<String> managerFeedback;
}
