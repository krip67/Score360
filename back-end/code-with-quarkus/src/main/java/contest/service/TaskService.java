package contest.service;

import contest.dto.CreateTaskDto;
import contest.dto.TaskDto;
import contest.dto.TaskHistoryDto;
import contest.dto.TaskSubtaskDto;
import contest.mapper.TaskMapper;
import contest.model.Task;
import contest.repository.CategoryRepository;
import contest.repository.MetricRepository;
import contest.repository.TaskRepository;
import contest.repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.List;
import java.util.stream.Collectors;

import static contest.util.TokenUtil.parseUuid;

@ApplicationScoped
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final TaskMapper taskMapper;
    private final MetricRepository metricRepository;
    private final JsonWebToken jsonWebToken;

    public List<TaskDto> getAllMyOpen() {
        var myId = parseUuid(jsonWebToken);
        return taskRepository.findAllMyOpen(myId).stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void addTask(CreateTaskDto createTaskDto) {
        var category = categoryRepository.findById(createTaskDto.getCategoryId());
        var user = userRepository.getById(parseUuid(jsonWebToken));
        var metric = metricRepository.findById(createTaskDto.getMetricId());
        var task = Task.builder()
                .name(createTaskDto.getName())
                .description(createTaskDto.getDescription())
                .dateEnd(createTaskDto.getDateEnd())
                .dateStart(createTaskDto.getDateStart())
                .category(category)
                .metric(metric)
                .metricValue(createTaskDto.getMetricValue())
                .author(user)
                .priority(createTaskDto.getTaskPriorityEnum().name())
                .parent(createTaskDto.getParentId() == null ? null : taskRepository.findById(createTaskDto.getParentId()))
                .build();
        taskRepository.saveTask(task);
    }

    public TaskSubtaskDto getById(Integer taskId) {
        return taskMapper.toTaskSubtaskDto(taskRepository.findById(taskId));
    }

    public List<TaskDto> getAllOnReview() {
        return taskRepository.findAllOnReviewByUser(parseUuid(jsonWebToken)).stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<TaskDto> getAllOpen() {
        return taskRepository.getAllOpen().stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<TaskHistoryDto> getMyHistory() {
        var myId = parseUuid(jsonWebToken);
        return taskRepository.getHistoryByAuthorId(myId).stream()
                .map(taskMapper::toHistoryDto)
                .collect(Collectors.toList());
    }

    public List<TaskDto> getAllOpenBoss() {
        var boss = userRepository.findBoss();
        return taskRepository.findAllMyOpen(boss.getId()).stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<TaskDto> getAllMyToReview() {
        return taskRepository.getAllMyToReview(parseUuid(jsonWebToken)).stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }
}
