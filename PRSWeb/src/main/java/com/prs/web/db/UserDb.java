package com.prs.web.db;

import com.prs.web.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDb extends JpaRepository<User, Integer> {
    User findByUsernameAndPassword(String username, String password);
}