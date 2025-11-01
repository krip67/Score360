package contest.dto;

import lombok.Data;

@Data
public class TaskHistoryDto {
    private Integer id;
    private String name;
    private String description;
    private Integer effectiveness;
    private Integer value;
}
