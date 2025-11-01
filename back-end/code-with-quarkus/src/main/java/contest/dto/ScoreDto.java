package contest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class ScoreDto {
    private Integer effectiveness;
    private Integer potential;
    private Double rating;
    private String recommendation;
    private Instant createTime;
    private Integer potentialScoreId;
    private List<Integer> selectedCourses;
}
