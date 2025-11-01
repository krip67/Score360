package contest.endpoint;

import contest.dto.CreateTaskDto;
import contest.dto.TaskDto;
import contest.dto.TaskHistoryDto;
import contest.dto.TaskSubtaskDto;
import contest.model.Task;
import contest.service.TaskService;
import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.*;
import lombok.RequiredArgsConstructor;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;

import java.util.List;

@Path("task")
@ApplicationScoped
@RequiredArgsConstructor
@Authenticated
@SecurityRequirement(name = "bearerAuth")
public class TaskController {

    private final TaskService taskService;

    @GET
    @Path("/history")
    public List<TaskHistoryDto> getMyHistory(){
        return taskService.getMyHistory();
    }

    @GET
    @RolesAllowed("boss")
    @Path("history/{userId}")
    public List<TaskDto> getUserHistory(){
        return null;
    }

    @GET
    @Path("/open")
    @Operation(summary = "Список задач")
    public List<TaskDto> getAllTask(){
        return taskService.getAllOpen();
    }

    @GET
    @Path("/open/my")
    @Operation(summary = "Список задач")
    public List<TaskDto> getAllMyOpen(){
        return taskService.getAllMyOpen();
    }


    @GET
    @Path("/open/boss")
    public List<TaskDto> getAllOpenBoss(){
        return taskService.getAllOpenBoss();
    }

    @GET
    @Path("/onReview")
    @Operation(summary = "Задачи на ревью")
    public List<TaskDto> getAllOnReview(){ return taskService.getAllOnReview();}

    @GET
    @Path("/toReview")
    @Operation(summary = "Задачи на ревью")
    public List<TaskDto> getAllMyToReview(){ return taskService.getAllMyToReview();}

    @GET
    @Path("/{taskId}")
    public TaskSubtaskDto getTaskById(@PathParam("taskId") Integer taskId) {return taskService.getById(taskId);}

    //TODO: Возращать задачу
    @POST
    @Operation(summary = "Добавить задачу")
    public void addTask(@RequestBody CreateTaskDto createTaskDto){
        taskService.addTask(createTaskDto);
    }
}
