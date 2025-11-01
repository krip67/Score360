package contest.repository;

import contest.model.PotentialScore;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;

@ApplicationScoped
public class PotantialScoreRepository {
    @Inject
    EntityManager entityManager;

    public void save(PotentialScore potentialScore){
        entityManager.persist(potentialScore);
    }

    public PotentialScore findById(Integer id){
       return entityManager.createQuery("from PotentialScore where id = :id", PotentialScore.class)
                .setParameter("id", id)
                .getResultStream()
                .findFirst()
                .orElseThrow(()-> new EntityNotFoundException("Потенциал не найден"));
    }
}
