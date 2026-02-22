package com.sunjae.Wimy.domain;

import jakarta.persistence.*;
import lombok.Getter;
import java.time.LocalDate;

@Entity
@Getter
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // 재료명 (예: 계란)
    private Integer quantity;   // 수량 (예: 10)

    // LocalDate는 날짜만 (YYYY-MM-DD), LocalDateTime은 시간까지
    private LocalDate expiredAt; // 유통기한

    private String category;    // 분류 (냉장, 냉동 등)

    public void updateInfo(String name, Integer quantity, LocalDate expiredAt, String category) {
        this.name = name;
        this.quantity = quantity;
        this.expiredAt = expiredAt;
        this.category = category;
    }

    // 비즈니스 로직이 담긴 전용 메서드 (예: 재료 사용)
    public void consume(int amount) {
        if (this.quantity < amount) {
            throw new IllegalArgumentException("남은 재료가 부족합니다.");
        }
        this.quantity -= amount;
    }
}