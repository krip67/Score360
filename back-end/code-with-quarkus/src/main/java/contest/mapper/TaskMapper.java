package contest.mapper;

import contest.dto.TaskDto;
import contest.dto.TaskHistoryDto;
import contest.dto.TaskSubtaskDto;
import contest.model.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "jakarta")
public interface TaskMapper {

    @Mapping(target = "subtaskIds", source = "task", qualifiedByName = "subtaskIds")
    @Mapping(target = "categoryName", source = "category.name")
    @Mapping(target = "metricName", source = "metric.description")
    @Mapping(target = "parentTaskId", source = "parent.id")
    TaskDto toDto(Task task);

    @Named("subtaskIds")
    default List<Integer> mapSubtaskId(Task task) {
        return task.getSubtasks().stream().map(Task::getId).collect(Collectors.toList());
    }

    @Mapping(target = "categoryName", source = "category.name")
    TaskSubtaskDto toTaskSubtaskDto(Task task);

    @Mapping(target = "effectiveness", source = "score.effectiveness")
    @Mapping(target = "value", source = "score.potential")
    TaskHistoryDto toHistoryDto(Task task);

}
