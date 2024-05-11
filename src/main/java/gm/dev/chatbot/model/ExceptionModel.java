package gm.dev.chatbot.model;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class ExceptionModel {
    
    private String mensagem;
}
