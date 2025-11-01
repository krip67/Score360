package contest.dto;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class TaskSubtaskDto {
    private Integer id;
    private String name;
    private String description;
    private Instant dateStart;
    private Instant dateEnd;
    private String categoryName;
    private List<SubtaskDto> subtasks;
}
