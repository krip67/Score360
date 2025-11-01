package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RespOnTaskRequest {
    @JsonProperty("results_list")
    private List<Integer> answer1 = new ArrayList<>();
    @JsonProperty("interaction_list")
    private List<Integer> answer2 = new ArrayList<>();

    public void addAnswer1(Integer string){
        answer1.add(string);
    }

    public void addAnswer2(Integer string){
        answer2.add(string);
    }
}
