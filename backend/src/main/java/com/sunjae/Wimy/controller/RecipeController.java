package com.sunjae.Wimy.controller;

import com.sunjae.Wimy.domain.Recipe;
import com.sunjae.Wimy.repository.RecipeRepository;
import com.sunjae.Wimy.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import lombok.*;

@RestController
@RequestMapping("/api/recipes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RecipeController {

    private final RecipeRepository recipeRepository;
    private final RecipeService recipeService; // 의존성 주입 추가

    // 전체 레시피 목록 조회
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Recipe> addRecipe(@RequestBody Recipe recipe) {
        // 1. 간단한 유효성 검사 (이름이RecipeService 없으면 에러 반환)
        if (recipe.getName() == null || recipe.getName().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // 2. 데이터 저장
        Recipe savedRecipe = recipeRepository.save(recipe);

        // 3. 201 Created 상태 코드와 함께 저장된 객체 반환
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecipe);
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody Recipe updatedRecipe) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 레시피가 없습니다. id=" + id));

        // 기존 Recipe 엔티티 내부의 update 메서드를 호출하여 정보 갱신
        recipe.update(updatedRecipe.getName(), updatedRecipe.getRecipeItems());

        return recipeRepository.save(recipe);
    }

    // 레시피 삭제
    @DeleteMapping("/{id}")
    public String deleteRecipe(@PathVariable Long id) {
        recipeRepository.deleteById(id);
        return "레시피가 삭제되었습니다. id=" + id;
    }

    // RecipeController.java에 추가

    @PostMapping("/{id}/use")
    public ResponseEntity<String> useRecipe(@PathVariable Long id) {
        try {
            recipeService.useRecipe(id);
            return ResponseEntity.ok("요리 완료! 재고가 차감되었습니다.");
        } catch (RuntimeException e) {
            // 재고 부족 등의 에러 발생 시 400 에러와 메시지 반환
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}