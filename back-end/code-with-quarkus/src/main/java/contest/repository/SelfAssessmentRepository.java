package contest.repository;

import contest.model.SelfAssessment;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class SelfAssessmentRepository {
    @Inject
    EntityManager entityManager;

    public void save(SelfAssessment selfAssessment){
        entityManager.persist(selfAssessment);
    }
}
