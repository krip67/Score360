package contest.repository;

import contest.model.Category;
import contest.model.Task;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@RequiredArgsConstructor
public class CategoryRepository {

    private final EntityManager entityManager;

    public List<Category> findAll() {
        return entityManager.createQuery("""
                            from Category
                        """, Category.class)
                .getResultStream()
                .collect(Collectors.toList());
    }

    public Category findById(Integer id){
        return entityManager.createQuery("from Category where id = :id", Category.class)
                .setParameter("id", id)
                .getSingleResult();
    }
}
