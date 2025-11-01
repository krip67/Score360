package contest.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "metric", schema = "contest")
public class Metric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String description;
    @ManyToOne
    private Category category;
}
