package contest.mapper;

import contest.dto.AggregateRequest;
import contest.model.PotentialScore;
import contest.model.PromotionEnum;
import contest.model.ReadinessEnum;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.Mapper;

@Mapper(componentModel = "jakarta")
public interface PotentialMapper {

    PotentialScore toEntity(AggregateRequest request);

    default PromotionEnum toPromEnum(String value){
        return PromotionEnum.findByDescription(value)
                .orElseThrow(()-> new EntityNotFoundException("Не найдено значение " + value));
    }

    default ReadinessEnum toReadEnum(String value){
        return ReadinessEnum.findByDescription(value);
    }
}
