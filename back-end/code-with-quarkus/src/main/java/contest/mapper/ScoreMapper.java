package contest.mapper;

import contest.dto.ScoreDto;
import contest.model.Course;
import contest.model.Score;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "jakarta")
public interface ScoreMapper {

    @Mapping(target = "selectedCourses", source = "courses")
    ScoreDto toDto(Score score);

    Score toEntity(ScoreDto scoreDto);

    default Integer courseMapping(Course course){
        return course.getId();
    }
}
