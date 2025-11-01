package contest.model;

import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Optional;

import static java.util.Objects.isNull;

@AllArgsConstructor
@Getter
public enum ReadinessEnum {
    IN_ONE_TO_TWO_YEARS("1", "Через 1-2 года"),
    IN_THREE_YEARS("2", "Через 3 года"),
    LONG_TERM("3", "Через 3 и более лет");

    /**
     * Уровень приоритета. Может использоваться для сортировки и логических проверок.
     * 3 - самый высокий приоритет (самый короткий срок).
     */
    private final String priority;

    /**
     * Текстовое описание срока.
     */
    @JsonValue
    private final String description;

    public static ReadinessEnum findByDescription(String description) {
        if(isNull(description)){
            return null;
        }
        return Arrays.stream(ReadinessEnum.values())
                .filter(interest -> interest.getDescription().equalsIgnoreCase(description))
                .findFirst()
                .orElseThrow(()-> new EntityNotFoundException("Не найдено значение " + description));
    }
}
