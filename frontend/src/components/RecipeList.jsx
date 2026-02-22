import React from 'react';

const RecipeList = ({ 
  recipes, 
  editingRecipeId, 
  recipeEditForm, 
  setRecipeEditForm, 
  handleRecipeUpdate, 
  setEditingRecipeId, 
  handleRecipeEditClick, 
  handleRecipeDelete, 
  handleUseRecipe, 
  addRecipeItemField, 
  removeRecipeItemField 
}) => (
  <div className="recipe-grid">
    {recipes.map((recipe) => (
      <div key={recipe.id} className="recipe-card">
        {editingRecipeId === recipe.id ? (
          /* [레시피 수정 모드] */
          <>
            <input 
              value={recipeEditForm.name} 
              onChange={(e) => setRecipeEditForm({ ...recipeEditForm, name: e.target.value })} 
              style={{ width: '100%', marginBottom: '10px', fontWeight: 'bold' }} 
            />
            {recipeEditForm.recipeItems.map((item, index) => (
              <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                <input 
                  value={item.ingredientName} 
                  onChange={(e) => {
                    const newItems = [...recipeEditForm.recipeItems];
                    newItems[index].ingredientName = e.target.value;
                    setRecipeEditForm({ ...recipeEditForm, recipeItems: newItems });
                  }} 
                  style={{ width: '80px' }} 
                />
                <input 
                  type="number" 
                  value={item.requiredQuantity} 
                  onChange={(e) => {
                    const newItems = [...recipeEditForm.recipeItems];
                    newItems[index].requiredQuantity = parseInt(e.target.value) || 0;
                    setRecipeEditForm({ ...recipeEditForm, recipeItems: newItems });
                  }} 
                  style={{ width: '40px', marginLeft: '5px' }} 
                />
                {/* 수정 모드에서도 단위 선택 가능하게 추가 */}
                <select 
                  value={item.unit || '개'} 
                  onChange={(e) => {
                    const newItems = [...recipeEditForm.recipeItems];
                    newItems[index].unit = e.target.value;
                    setRecipeEditForm({ ...recipeEditForm, recipeItems: newItems });
                  }}
                  style={{ marginLeft: '5px' }}
                >
                  <option value="개">개</option>
                  <option value="숟가락">숟가락</option>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="보유">보유</option>
                </select>
                <button type="button" onClick={() => removeRecipeItemField(index, true)} style={{ marginLeft: '5px', color: 'red' }}>x</button>
              </div>
            ))}
            <button type="button" onClick={() => addRecipeItemField(true)} style={{ fontSize: '0.8em', marginBottom: '10px' }}>재료 추가</button>
            <div style={{ marginTop: '10px', display: 'flex', gap: '5px' }}>
              <button onClick={() => handleRecipeUpdate(recipe.id)} style={{ backgroundColor: '#e3f2fd' }}>저장</button>
              <button onClick={() => setEditingRecipeId(null)}>취소</button>
            </div>
          </>
        ) : (
          /* [일반 모드] */
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{recipe.name}</h3>
              <div>
                <button onClick={() => handleRecipeEditClick(recipe)} style={{ fontSize: '0.8em' }}>수정</button>
                <button onClick={() => handleRecipeDelete(recipe.id)} style={{ fontSize: '0.8em', color: 'red', marginLeft: '5px' }}>삭제</button>
              </div>
            </div>
            <ul style={{ paddingLeft: '20px', margin: '15px 0' }}>
              {recipe.recipeItems.map((item) => (
                <li key={item.id} style={{ marginBottom: '5px' }}>
                  {/* null 방지를 위해 || '개' 추가 및 차감제외 문구 삭제 */}
                  {item.ingredientName} : {item.requiredQuantity}{item.unit || '개'}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleUseRecipe(recipe)} 
              style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              이 레시피로 요리하기
            </button>
          </>
        )}
      </div>
    ))}
  </div>
);

export default RecipeList;