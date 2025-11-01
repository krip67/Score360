package contest.repository;

import contest.model.Review;
import contest.model.Task;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.List;
import java.util.stream.Collectors;

import static contest.util.TokenUtil.parseUuid;

@ApplicationScoped
public class ReviewRepository {

    @Inject
    EntityManager entityManager;
    @Inject
    JsonWebToken jsonWebToken;

    public List<Review> getAllForRespReview() {
        return entityManager.createQuery("from Review rev " +
                                "join fetch rev.task task " +
                                "join fetch task.author " +
                                "where respAssessment is null and reviewer.id = :myId" ,
                        Review.class)
                .setParameter("myId", parseUuid(jsonWebToken))
                .getResultStream()
                .collect(Collectors.toList());
    }

    public void saveAll(List<Review> reviews) {
        reviews.forEach(entityManager::persist);
    }

    public Review getById(Integer id){
        return entityManager.createQuery("from Review where id = :id", Review.class)
                .setParameter("id", id)
                .getResultStream()
                .findAny()
                .orElseThrow(() -> new EntityNotFoundException(""));
    }
    public void delete(Review review) {
        entityManager.remove(review);
    }
}
