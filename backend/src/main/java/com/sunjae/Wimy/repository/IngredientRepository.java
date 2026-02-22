package com.sunjae.Wimy.repository;

import com.sunjae.Wimy.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// JpaRepository<관리할 엔티티, 식별자(PK)의 타입>
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    List<Ingredient> findAllByNameOrderByExpiredAtAsc(String name);
}