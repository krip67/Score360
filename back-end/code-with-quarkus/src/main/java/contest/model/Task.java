package contest.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "task", schema = "contest")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private Instant dateStart;
    private Instant dateEnd;
    @ManyToOne
    private Category category;
    @ManyToOne
    private Metric metric;
    private String metricValue;
    private String priority;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Task parent;
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Task> subtasks;
    @ManyToOne(fetch = FetchType.LAZY)
    private Score score;
    @OneToMany(mappedBy = "task")
    private List<Review> reviews;
    @OneToOne
    private SelfAssessment selfAssessment;
    @OneToOne
    private BossAssessment bossAssessment;
}
