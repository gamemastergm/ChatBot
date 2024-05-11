package gm.dev.chatbot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gm.dev.chatbot.model.Question;
import gm.dev.chatbot.repository.QuestionRepository;

@Service
public class QuestionService {
    
    @Autowired
    private QuestionRepository qr;


    public Iterable<Question> list(){
        return qr.findAll();
    }
}
