package contest.repository;

import contest.model.Metric;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class MetricRepository {

    @Inject
    EntityManager entityManager;

    public List<Metric> findAllByCategoryId(String categoryId) {
        return entityManager.createQuery("from Metric where category.id = :categoryId", Metric.class)
                .setParameter("categoryId", categoryId)
                .getResultStream()
                .collect(Collectors.toList());
    }

    public Metric findById(Integer metricId) {
        return entityManager.createQuery("from Metric where id = :id", Metric.class)
                .setParameter("id", metricId)
                .getResultStream()
                .findAny()
                .orElseThrow(()-> new EntityNotFoundException());
    }
}
