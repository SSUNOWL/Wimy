package com.sunjae.Wimy.service;

import com.sunjae.Wimy.domain.Ingredient;
import com.sunjae.Wimy.domain.Recipe;
import com.sunjae.Wimy.domain.RecipeItem;
import com.sunjae.Wimy.repository.IngredientRepository;
import com.sunjae.Wimy.repository.RecipeRepository;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;

    @Transactional
    public void useRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 레시피입니다."));

        for (RecipeItem item : recipe.getRecipeItems()) {
            String targetName = item.getIngredientName();
            int neededQty = item.getRequiredQuantity();
            String recipeUnit = item.getUnit();

            List<Ingredient> stocks = ingredientRepository.findAllByNameOrderByExpiredAtAsc(targetName);

            if (stocks.isEmpty()) {
                throw new RuntimeException(targetName + " 재고가 없습니다.");
            }

            // 소스류 단위(숟가락, g, ml, 보유 등)이거나 냉장고 재고 단위가 '보유'인 경우 수량을 차감하지 않음
            boolean isSauceUnit = "숟가락".equals(recipeUnit) || "g".equals(recipeUnit) ||
                    "ml".equals(recipeUnit) || "보유".equals(recipeUnit);
            boolean isStockPossession = "보유".equals(stocks.get(0).getUnit());

            if (isSauceUnit || isStockPossession) {
                continue; // 차감 없이 다음 재료로 이동
            }

            // 일반 재료 수량 확인 및 차감 로직
            int totalAvailable = stocks.stream().mapToInt(Ingredient::getQuantity).sum();
            if (totalAvailable < neededQty) {
                throw new RuntimeException(targetName + " 재고가 부족합니다.");
            }

            for (Ingredient stock : stocks) {
                if (neededQty <= 0) break;
                int currentStockQty = stock.getQuantity();
                if (currentStockQty <= neededQty) {
                    neededQty -= currentStockQty;
                    ingredientRepository.delete(stock);
                } else {
                    stock.setQuantity(currentStockQty - neededQty);
                    neededQty = 0;
                }
            }
        }
    }
}