package contest.endpoint;

import contest.model.Course;
import contest.repository.CoursesRepository;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Path("course")
@RequiredArgsConstructor
public class CoursesController {

    private final CoursesRepository coursesService;

    @GET
    public List<Course> findAll(){
        return coursesService.findAll();
    }

    @POST
    @Path("/byId")
    public List<Course> findAllByIds(List<Integer> ids){
        return coursesService.findAllById(ids);
    }
}
