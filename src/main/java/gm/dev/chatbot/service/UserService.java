package gm.dev.chatbot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import gm.dev.chatbot.model.ExceptionModel;
import gm.dev.chatbot.model.User;
import gm.dev.chatbot.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private ExceptionModel ex;

    @Autowired
    private UserRepository ur;

    public Iterable<User> list(){
        return ur.findAll();
    }

    public ResponseEntity<?> cadastrarUser(User user){
        if (user.getLogin().equals("")) {
            ex.setMensagem("O login é obrigatório");
            return new ResponseEntity<>(ex, HttpStatus.BAD_REQUEST);
            
        } else if(user.getPassword().equals("")) {
            ex.setMensagem("A senha é obrigatória");
            return new ResponseEntity<>(ex, HttpStatus.BAD_REQUEST);
         } else if(user.getEmail().equals("")) {
            ex.setMensagem("O email é obrigatório");
            return new ResponseEntity<>(ex, HttpStatus.BAD_REQUEST);
         } else {
            return new ResponseEntity<User>(ur.save(user), HttpStatus.CREATED);
         }

}
}
