package contest.repository;

import contest.model.Task;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@ApplicationScoped
@RequiredArgsConstructor
public class TaskRepository {

    private final EntityManager entityManager;

    public List<Task> findAllMyOpen(UUID myId) {
        return entityManager.createQuery("""
                            from Task where score is null and author.id = :userId
                        """, Task.class)
                .setParameter("userId", myId)
                .getResultStream()
                .collect(Collectors.toList());
    }


    public List<Task> getAllOpen() {
        return entityManager.createQuery("""
                            from Task where score is null
                        """, Task.class)
                .getResultStream()
                .collect(Collectors.toList());
    }

    public void saveTask(Task task){
        entityManager.persist(task);
    }


    public Task findById(Integer taskId) {
        return entityManager.createQuery("from Task where id = :id", Task.class)
                .setParameter("id", taskId)
                .getResultStream()
                .findAny()
                .orElseThrow(()->new EntityNotFoundException());
    }

    public List<Task> findAllOnReviewByUser(UUID userId) {
        return entityManager.createQuery("""
                            from Task where selfAssessment is not null
                            and score is null
                            and author.id = :userId
                        """, Task.class)
                .setParameter("userId", userId)
                .getResultStream()
                .collect(Collectors.toList());
    }

    public List<Task> getAllForBossReview(UUID userId) {
        return entityManager.createQuery("""
                            from Task where selfAssessment is not null
                            and bossAssessment is null
                        """, Task.class)
                .getResultStream()
                .collect(Collectors.toList());
    }

    public List<Task> getHistoryByAuthorId(UUID userId) {
        return entityManager.createQuery("""
                    from Task where author.id = :id
                    and score is not null
                """, Task.class)
                .setParameter("id", userId)
                .getResultStream()
                .collect(Collectors.toList());
    }

    public List<Task> getAllMyToReview(UUID uuid) {
        return entityManager.createQuery("""
                    from Task where author.id = :id
                    and selfAssessment is null
                """, Task.class)
                .setParameter("id", uuid)
                .getResultStream()
                .collect(Collectors.toList());
    }
}
