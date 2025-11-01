package contest.model;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TaskPriorityEnum {


    HIGHEST("HIGHEST"),
    HIGH("HIGH"),
    LOW("LOW"),
    LOWEST("LOWEST");

    private String name;

    @JsonValue
    public String getName() {
        return name;
    }
}
