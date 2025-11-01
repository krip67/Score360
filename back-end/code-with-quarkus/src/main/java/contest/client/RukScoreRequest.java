package contest.client;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RukScoreRequest {

    List<Integer> result = new ArrayList<>();
    List<Integer> quality = new ArrayList<>();
    List<Integer> rating = new ArrayList<>();

    public void addRes(Integer value){
        result.add(value);
    }

    public void addQual(Integer value){
        quality.add(value);
    }

    public void addRate(Integer value){
        rating.add(value);
    }

}
