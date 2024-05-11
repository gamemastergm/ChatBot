package gm.dev.chatbot.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import gm.dev.chatbot.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{
    
}
