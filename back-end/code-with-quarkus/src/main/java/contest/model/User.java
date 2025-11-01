package contest.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user", schema = "contest")
public class User {
    @Id
    private UUID id;
    /**
     * Имя пользователя.
     */
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    /**
     * Имя.
     */
    @Column(name = "first_name")
    private String firstName;

    /**
     * Фамилия.
     */
    @Column(name = "last_name")
    private String lastName;

    /**
     * Отчество.
     */
    @Column(name = "patronymic")
    private String patronymic;

    /**
     * Отдел.
     */
    private String department;

    /**
     * Команда.
     */
    private String team;

    /**
     * Должность
     */
    private String post;

    public String getName(){
        return lastName + " " +
                firstName.charAt(0) + "."
                + (patronymic == null? "" : patronymic.charAt(0)+".");
    }
}
