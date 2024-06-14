package gm.dev.chatbot.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotNull;

import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "password")
})
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    @NotNull
    @Column(unique = true, nullable = false)
    private String username;

    @NotNull
    @Column(unique = true, nullable = false)
    private String password;
}
