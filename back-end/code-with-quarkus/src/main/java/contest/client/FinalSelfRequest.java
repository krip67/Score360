package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class FinalSelfRequest {
    @JsonProperty("list_answers_1")
    private List<Integer> listAnswers1;

    @JsonProperty("list_answers_2")
    private List<Integer> listAnswers2;

    public FinalSelfRequest() {
        listAnswers1 = new ArrayList<>();
        listAnswers2 = new ArrayList<>();
    }

    public void addAnswer1(Integer string){
        listAnswers1.add(string);
    }

    public void addAnswer2(Integer string){
        listAnswers2.add(string);
    }
}
