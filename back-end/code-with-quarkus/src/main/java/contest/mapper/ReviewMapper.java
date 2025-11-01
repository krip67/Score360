package contest.mapper;

import contest.dto.RespAssessmentDto;
import contest.dto.ReviewDto;
import contest.model.Review;
import contest.model.Task;
import jakarta.inject.Inject;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@Mapper(componentModel = "jakarta", uses = {AssessmentMapper.class})
public abstract class ReviewMapper {

    @Inject
    private AssessmentMapper assessmentMapper;

    @Mapping(target = "taskId", source = "task.id")
    @Mapping(target = "taskName", source = "task.name")
    @Mapping(target = "taskDescription", source = "task.description")
    @Mapping(target = "selfAssessment", source = "task.selfAssessment")
    public abstract ReviewDto toDto(Review review);


    @Mapping(target = "respAssessments", source = "reviews", qualifiedByName = "reviewToRespAss")
    @Mapping(target = "taskId", source = "task.id")
    @Mapping(target = "taskName", source = "task.name")
    @Mapping(target = "taskDescription", source = "task.description")
    public  abstract ReviewDto taskToReviewDto(Task task);

    @Named("reviewToRespAss")
    public List<RespAssessmentDto> reviewToRespAss(List<Review> reviews){
        return reviews.stream()
                .map(x->x.getRespAssessment())
                .filter(Objects::nonNull)
                .map(x->assessmentMapper.toRespDto(x))
                .collect(Collectors.toList());
    }
}
