package com.sunjae.Wimy.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RecipeItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ingredientName; // 매칭할 식재료 이름 (예: 콩나물)
    private int requiredQuantity;  // 필요한 수량 (예: 1개)
    private String unit;
}