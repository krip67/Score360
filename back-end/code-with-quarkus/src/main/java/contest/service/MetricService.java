package contest.service;

import contest.dto.MetricDto;
import contest.model.Metric;
import contest.repository.MetricRepository;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@RequiredArgsConstructor
public class MetricService {

    private final MetricRepository metricRepository;

    public List<MetricDto> findAllByCategoryId(String categoryId) {
        return metricRepository.findAllByCategoryId(categoryId)
                .stream()
                .map(x -> {
                    return new MetricDto(x.getId(), x.getDescription());
                })
                .collect(Collectors.toList());
    }
}
