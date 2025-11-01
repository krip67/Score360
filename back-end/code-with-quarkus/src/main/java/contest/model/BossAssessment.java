package contest.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "boss_assessment", schema = "contest")
public class BossAssessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer resultScore;
    private String comment;
    private String contribution;
    private Integer interactionScore;
    private String recommendation;
    private Integer totalScore;
}
