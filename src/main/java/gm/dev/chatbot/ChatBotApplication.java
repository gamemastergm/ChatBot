package gm.dev.chatbot;

import com.vaadin.flow.theme.Theme;
import gm.dev.chatbot.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.sql.init.SqlDataSourceScriptDatabaseInitializer;
import org.springframework.boot.autoconfigure.sql.init.SqlInitializationProperties;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

@SpringBootApplication
public class ChatBotApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatBotApplication.class, args);
    }

}