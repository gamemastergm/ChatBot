package gm.dev.chatbot.endpoints;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import gm.dev.chatbot.controller.UserController;
import gm.dev.chatbot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.validation.ConstraintViolationException;

@Endpoint
@AnonymousAllowed
public class UserEndpoint {

    @Autowired
    UserController userController;

    public ResponseEntity<?> getAuthenticatedUser(String username, String password) {
        try {
            User user = userController.auth(username, password);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<User> saveUser(String username, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        try {
            User savedUser = userController.insert(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        } catch (ConstraintViolationException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
