package contest.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class SubtaskDto {
    private Integer id;
    private String name;
    private String description;
    private Instant dateStart;
    private Instant dateEnd;
    private String categoryName;
}
