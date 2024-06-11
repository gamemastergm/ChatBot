package gm.dev.chatbot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Controller
public class RegistrationController {

    @Autowired
    private InMemoryUserDetailsManager userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/register")
    public String showRegistrationForm() {
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam("username") String username,
                               @RequestParam("password") String password,
                               @RequestParam("passwordConfirm") String passwordConfirm,
                               RedirectAttributes redirectAttributes) {
        if (!password.equals(passwordConfirm)) {
            redirectAttributes.addFlashAttribute("error", "As senhas não coincidem.");
            return "redirect:/register";
        }

        try {
            UserDetails user = User.withUsername(username)
                                   .password(passwordEncoder.encode(password))
                                   .roles("USER")
                                   .build();
            userDetailsService.createUser(user);
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("message", "Ocorreu um erro ao registrar o usuário.");
            return "redirect:/error";
        }

        return "redirect:/login";
    }
}
