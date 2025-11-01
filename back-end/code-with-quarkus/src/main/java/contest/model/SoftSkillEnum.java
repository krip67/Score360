package contest.model;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum SoftSkillEnum {
    INITIATIVE("Не боялся брать на себя больше ответственности в задаче"),
    TRANSPARENT_COMMUNICATION("Выстраивал открытую прозрачную и точную коммуникацию с коллегами"),
    PROMPT_INFO_SHARING("Оперативно делился информацией о задаче с коллегами"),
    TASK_ORGANIZATION("Выстраивал работу по задаче");


    private final String description;
}
