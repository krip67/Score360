package contest.repository;

import contest.model.RespAssessment;
import contest.model.SelfAssessment;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class RespAssessmentRepository {
    @Inject
    EntityManager entityManager;

    public void save(RespAssessment assessment){
        entityManager.persist(assessment);
    }
}
