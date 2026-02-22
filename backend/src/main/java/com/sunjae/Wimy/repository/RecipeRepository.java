package com.sunjae.Wimy.repository;

import com.sunjae.Wimy.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

}
