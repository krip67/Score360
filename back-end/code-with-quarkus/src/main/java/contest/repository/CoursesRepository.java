package contest.repository;

import contest.model.Course;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class CoursesRepository {

    @Inject
    EntityManager entityManager;

    public List<Course> findAll() {
        return entityManager.createQuery("from Course", Course.class)
                .getResultStream()
                .toList();
    }

    public List<Course> findAllById(List<Integer> ids){
        return entityManager.createQuery("from Course where id in :id", Course.class)
                .setParameter("id", ids)
                .getResultStream()
                .toList();
    }
}
