package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class CourseResponse {
    @JsonProperty("course_id")
    List<Integer> courses;
}
