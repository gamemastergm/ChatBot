package gm.dev.chatbot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gm.dev.chatbot.model.User;
import gm.dev.chatbot.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository ur;

    public Iterable<User> list(){
        return ur.findAll();
    }
}
