package com.sunjae.Wimy.controller;

import com.sunjae.Wimy.domain.Ingredient;
import com.sunjae.Wimy.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
@RequiredArgsConstructor
public class IngredientController {

    private final IngredientRepository ingredientRepository;

    // 1. 식재료 등록 (POST)
    @PostMapping
    public Ingredient addIngredient(@RequestBody Ingredient ingredient) {
        // 프론트에서 넘어온 데이터를 DB에 저장하고, 저장된 결과를 반환합니다.
        return ingredientRepository.save(ingredient);
    }

    // 2. 전체 식재료 조회 (GET)
    @GetMapping
    public List<Ingredient> getAllIngredients() {
        // DB에 있는 모든 식재료를 목록으로 가져옵니다.
        return ingredientRepository.findAll();
    }
    @PutMapping("/{id}")
    public Ingredient updateIngredient(@PathVariable Long id, @RequestBody Ingredient updatedIngredient) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 식재료가 없습니다. id=" + id));

        // 의미를 알 수 없는 Setter 대신, 목적이 분명한 메서드 하나를 호출합니다.
        ingredient.updateInfo(
                updatedIngredient.getName(),
                updatedIngredient.getQuantity(),
                updatedIngredient.getExpiredAt(),
                updatedIngredient.getCategory()
        );

        return ingredientRepository.save(ingredient);
    }
    @DeleteMapping("/{id}")
    public String deleteIngredient(@PathVariable Long id) {
        // 해당 id의 데이터를 DB에서 삭제합니다.
        ingredientRepository.deleteById(id);
        return "식재료가 성공적으로 삭제되었습니다. id=" + id;
    }
}