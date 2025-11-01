package contest.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AggregateRequest {
    private String hardSkill;
    private String softSkill;
    private Boolean isMotivation;
    private String promotionEnum;
    private Boolean isSuccessor;
    private String readiness;
    private Integer leavingRisk;
}
