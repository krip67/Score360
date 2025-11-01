package contest.dto;
import contest.model.TaskPriorityEnum;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class TaskDto {
    private Integer id;
    private String name;
    private String description;
    private Instant dateStart;
    private Instant dateEnd;
    private String categoryName;
    private String metricName;
    private String metricValue;
    private TaskPriorityEnum priority;
    private List<Integer> subtaskIds;
    private Integer parentTaskId;
}
