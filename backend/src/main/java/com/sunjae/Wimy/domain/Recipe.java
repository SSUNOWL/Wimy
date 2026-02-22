package com.sunjae.Wimy.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // 레시피 이름 (예: 김치찌개)

    // 레시피에 들어가는 상세 재료 리스트
    // CascadeType.ALL을 주어 레시피가 저장/삭제될 때 상세 아이템도 같이 처리되게 합니다.
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "recipe_id")
    private List<RecipeItem> recipeItems = new ArrayList<>();

    public void update(String name, List<RecipeItem> items) {
        this.name = name;
        this.recipeItems.clear();
        this.recipeItems.addAll(items);
    }
}