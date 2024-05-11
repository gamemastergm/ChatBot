package gm.dev.chatbot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import gm.dev.chatbot.model.User;
import gm.dev.chatbot.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class UserController {
    
    @Autowired
    private UserService us;

    @GetMapping("/listar")
    public Iterable<User> listar(){
        return us.list();
    }
    

}
