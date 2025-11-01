package contest.repository;

import contest.model.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@ApplicationScoped
@RequiredArgsConstructor
public class UserRepository {
    private final EntityManager entityManager;

    public User findBoss() {
        return entityManager.createQuery("from User where username = 'boss'", User.class)
                .getSingleResult();
    }

    public List<User> findAll() {
        return entityManager.createQuery("from User", User.class)
                .getResultStream()
                .collect(Collectors.toList());
    }

    public Optional<User> findById(UUID id) {
        return entityManager.createQuery("from User where id = :id", User.class)
                .setParameter("id", id)
                .getResultStream()
                .findFirst();
    }

    public User getById(UUID id) {
        return entityManager.createQuery("from User where id = :id", User.class)
                .setParameter("id", id)
                .getResultStream()
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException());
    }

    public void save(User user) {
        entityManager.persist(user);
    }

}
