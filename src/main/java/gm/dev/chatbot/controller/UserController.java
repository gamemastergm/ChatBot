package gm.dev.chatbot.controller;

import gm.dev.chatbot.model.User;
import gm.dev.chatbot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;

    public User auth(String username, String password) {
        User user = userRepository.findByUsernameAndPassword(username, password);
        if (user == null) {
            throw new IllegalArgumentException("Usuário ou senha incorretos");
        }
        return user;
    }

    public User insert(User user) {
        // Implementação para inserir o usuário
        return userRepository.save(user);
    }
}
