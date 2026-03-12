# Wimy (What's in my Refrigerator)

Wimy는 효율적인 식재료 관리와 스마트한 레시피 활용을 돕는 웹 애플리케이션입니다. 사용자는 냉장고 안의 재료를 카테고리별로 관리하고, 유통기한을 실시간으로 추적하며, 등록된 레시피를 통해 재고를 지능적으로 소진할 수 있습니다.

---

## 1. 프로젝트 개요
* **목적**: 식재료 낭비 방지 및 체계적인 재고 관리
* **주요 기능**: 식재료 CRUD, 유통기한 D-Day 알림, 단위 기반 관리, 지능형 재고 소진 레시피

---

## 2. 기술 스택

### Frontend
* **React**
* **Axios**
* **CSS3** (Responsive Design)

### Backend
* **Java 17**
* **Spring Boot 3.5.11**
* **Spring Data JPA**
* **Lombok**

### Database & DevOps
* **MySQL**
* **Docker**
* **Docker Compose**

---

## 3. 주요 기능 및 로직

### 식재료 관리 (Inventory Management)
* **카테고리 분류**: 냉동, 냉장, 실온 보관함으로 자동 분류하여 시각화.
* **유통기한 추적 (D-Day)**: 현재 날짜 기준 D-Day 자동 계산 및 시각적 경고 제공.
    * **만료**: 빨간색
    * **임박**: 노란색
    * **안전**: 초록색
* **단위 기반 관리**:
    * **수량 기반 재료**: 개, 병, g, ml 등 사용 시 수량 차감.
    * **소스/양념류**: 수량을 차감하지 않고 존재 여부(보유)만 확인.

### 지능형 재고 소진 로직 (Smart Deduction Logic)
* **유통기한 우선순위 (FIFO)**: 동일 재료가 여러 개일 경우, 유통기한이 가장 임박한 재료부터 먼저 차감합니다.
* **트랜잭션 관리 (@Transactional)**: 레시피 사용 중 재고가 하나라도 부족할 경우 전체 과정을 롤백하여 데이터의 무결성을 보장합니다.
* **사전 유통기한 검증**: 요리 시작 전 유통기한이 만료된 재료가 포함되어 있는지 사용자에게 확인 절차를 거칩니다.

---

## 4. 데이터베이스 설계

### Ingredient Table
| Column | Type | Description |
| :--- | :--- | :--- |
| id | Long (PK) | 식재료 고유 식별자 |
| name | String | 식재료명 |
| quantity | Double | 현재 수량 |
| expired_at | LocalDate | 유통기한 |
| category | String | 보관 분류 (냉장, 냉동, 실온) |
| unit | String | 관리 단위 (개, g, ml, 보유 등) |

### Recipe Table
| Column | Type | Description |
| :--- | :--- | :--- |
| id | Long (PK) | 레시피 고유 식별자 |
| name | String | 레시피명 |

### RecipeItem Table
| Column | Type | Description |
| :--- | :--- | :--- |
| id | Long (PK) | 레시피 항목 식별자 |
| recipe_id | Long (FK) | 연관된 레시피 ID |
| ingredient_name | String | 필요한 재료 이름 |
| required_quantity| Double | 필요 수량 |
| unit | String | 필요 단위 |

---

## 5. API 명세

### 식재료 API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /api/ingredients | 전체 식재료 목록 조회 |
| POST | /api/ingredients | 신규 식재료 등록 |
| PUT | /api/ingredients/{id} | 식재료 정보 수정 (수량, 기한 등) |
| DELETE | /api/ingredients/{id} | 식재료 삭제 |

### 레시피 API
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /api/recipes | 전체 레시피 목록 조회 |
| POST | /api/recipes | 신규 레시피 등록 |
| PUT | /api/recipes/{id} | 레시피 정보 및 필요 재료 수정 |
| POST | /api/recipes/{id}/use | 레시피 사용 (실제 재고 차감 실행) |

---

## 6. 설치 및 실행 방법 (Docker)

프로젝트 환경을 구축하기 위해 다음 명령어를 실행하십시오.

```bash
# 저장소 복제
git clone [https://github.com/your-username/wimy.git](https://github.com/your-username/wimy.git)

# 프로젝트 폴더 이동
cd wimy

# Docker 컨테이너 실행
docker-compose up -d
