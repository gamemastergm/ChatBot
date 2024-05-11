package gm.dev.chatbot.repository;

import org.springframework.data.repository.CrudRepository;

import gm.dev.chatbot.model.Question;

public interface QuestionRepository extends CrudRepository<Question, Long>{
    
}
