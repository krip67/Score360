package contest.repository;

import contest.model.BossAssessment;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class BossAssessmentRepository {
    @Inject
    EntityManager entityManager;

    public BossAssessment findById(Integer id){
        return entityManager.createQuery("from BossAssessment where id = :id", BossAssessment.class)
                .setParameter("id", id)
                .getResultStream()
                .findAny()
                .orElse(null);
    }

    public void save(BossAssessment bossAssessment){
        entityManager.persist(bossAssessment);
    }
}
