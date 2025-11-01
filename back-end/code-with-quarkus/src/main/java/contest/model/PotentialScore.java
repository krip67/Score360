package contest.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "potential", schema = "contest")
public class PotentialScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String hardSkill;
    private String  softSkill;
    private Boolean isMotivation;
    private PromotionEnum promotionEnum;
    private Boolean isSuccessor;
    private ReadinessEnum readiness;
    private Integer leavingRisk;
}
