package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class PotentialScoreRequest {
    @JsonProperty("personal_traits")
    private List<String> traits;
    @JsonProperty("motivational_meeting_needed")
    private Boolean isMotivation;
    @JsonProperty("development_interest")
    private Integer interes;
    @JsonProperty("successor_status")
    private Boolean isSuccessor;
    @JsonProperty("readiness_period")
    private String readinessPeriod;
    @JsonProperty("retention_risk_level")
    private Integer retentionRisk;
}
