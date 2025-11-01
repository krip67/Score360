package contest.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import contest.model.TaskPriorityEnum;
import lombok.Data;

import java.time.Instant;

@Data
public class CreateTaskDto {
    private String name;
    private String description;
    private Instant dateStart;
    private Instant dateEnd;
    @JsonProperty("category_id")
    private Integer categoryId;
    private Integer metricId;
    private String metricValue;
    private TaskPriorityEnum taskPriorityEnum;
    private Integer parentId;
}
