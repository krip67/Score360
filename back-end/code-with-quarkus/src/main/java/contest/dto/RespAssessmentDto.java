package contest.dto;

import lombok.Data;

@Data
public class RespAssessmentDto {
    private Integer resultScore;
    private String comment;
    private Integer interactionScore;
    private String recommendation;
}
