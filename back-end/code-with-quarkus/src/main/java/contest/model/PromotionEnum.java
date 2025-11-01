package contest.model;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Optional;

@AllArgsConstructor
@Getter
public enum PromotionEnum {
    PROACTIVE(4, "Да, хочет развиваться и проактивно себя ведет"),
    NEEDS_GUIDANCE(3, "Да, хочет развиваться, но сам не может идти по плану развития, нужна помощь менеджера/HR"),
    UNCERTAIN(2, "Не уверен, что есть желание развиваться"),
    NOT_INTERESTED(1, "Не хочет");

    /**
     * Числовой уровень, представляющий степень желания.
     * Может использоваться для сравнения и вычислений.
     */
    private final int level;

    /**
     * Полное текстовое описание варианта.
     */
    @JsonValue
    private final String description;

    public static Optional<PromotionEnum> findByDescription(String description) {
        return Arrays.stream(PromotionEnum.values())
                .filter(interest -> interest.getDescription().equalsIgnoreCase(description))
                .findFirst();
    }
}
