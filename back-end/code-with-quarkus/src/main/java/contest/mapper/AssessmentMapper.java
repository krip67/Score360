package contest.mapper;

import contest.dto.RespAssessmentDto;
import contest.dto.SelfAssessmentDto;
import contest.model.RespAssessment;
import contest.model.SelfAssessment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "jakarta")
public interface AssessmentMapper {

    SelfAssessmentDto toSelfDto(SelfAssessment selfAssessment);

    RespAssessmentDto toRespDto(RespAssessment respAssessment);
}
