package contest.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "status", schema = "contest")
@Data
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    /**
     * Название.
     */
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * Описание.
     */
    @Column(name = "description")
    private String description;
}
