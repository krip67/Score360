package contest.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "score", schema = "contest")
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer effectiveness;
    private Integer potential;
    private Double rating;
    private String recommendation;
    @OneToMany(mappedBy = "score", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Task> task;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
    @OneToOne
    private PotentialScore potentialScore;
    private Instant createTime = Instant.now();
    @ManyToMany
    List<Course> courses;
}
