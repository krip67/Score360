package contest.model;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum HardSkillEnum {
    RESPONSIBILITY("Ответственность"),
    RESULT_ORIENTATION("Ориентация на результат"),
    PROACTIVITY("Проактивность (исследовал решение глубже, чем ожидалось)"),
    OPEN_MINDEDNESS("Открытое мышление (нестандартное мышление) - тестировал новые подходы"),
    TEAM_PLAYER("Командный игрок (объединял команду, вел за собой)");

    @JsonValue
    private final String description;

}
