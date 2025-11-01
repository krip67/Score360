package contest.endpoint;

import contest.model.Category;
import contest.repository.CategoryRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import org.eclipse.microprofile.openapi.annotations.Operation;

import java.util.List;

@Path("category")
@RequiredArgsConstructor
@ApplicationScoped
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GET
    @Operation(summary = "Категории метрик")
    public List<Category> getAllCategory(){
        return categoryRepository.findAll();
    }
}
