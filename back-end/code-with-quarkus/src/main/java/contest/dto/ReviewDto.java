package contest.dto;

import contest.model.BossAssessment;
import lombok.Data;

import java.util.List;

@Data
public class ReviewDto {
    private Integer id;
    private Integer taskId;
    private String taskName;
    private String taskDescription;
    private SelfAssessmentDto selfAssessment;
    private List<RespAssessmentDto> respAssessments;
    private BossAssessment bossAssessment;
}
