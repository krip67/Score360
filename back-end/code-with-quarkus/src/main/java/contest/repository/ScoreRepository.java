package contest.repository;

import contest.model.Score;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@ApplicationScoped
public class ScoreRepository {
    @Inject
    EntityManager entityManager;

    public void save(Score score) {
        entityManager.persist(score);
    }

    public List<Score> getAllByUserId(UUID uuid) {
        return entityManager.createQuery("from Score where owner.id = :id", Score.class)
                .setParameter("id", uuid)
                .getResultStream()
                .collect(Collectors.toList());

    }
}
