package contest.dto;

import lombok.Data;

@Data
public class SelfAssessmentDto {
    private String result;
    private String personalContribution;
    private String experience;
    private String future;
    private Integer interactionScore;
    private Integer satisfaction;
}
