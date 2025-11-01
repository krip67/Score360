package contest.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class AddReviewRequest {
    private Integer taskId;
    private String result;
    private String personalContribution;
    private String experience;
    private String future;
    private Integer interactionScore;
    private Integer satisfaction;
    private List<UUID> reviewerIds;
}
