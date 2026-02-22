import React from 'react';

const RecipeForm = ({ recipeForm, setRecipeForm, handleRecipeSubmit, addRecipeItemField, removeRecipeItemField }) => (
  <form onSubmit={handleRecipeSubmit} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px' }}>
    <h3>새 레시피 등록</h3>
    <input placeholder="레시피 이름" value={recipeForm.name} onChange={(e) => setRecipeForm({ ...recipeForm, name: e.target.value })} required style={{ marginBottom: '10px', display: 'block' }} />
    {recipeForm.recipeItems.map((item, index) => (
      <div key={index} style={{ marginBottom: '5px' }}>
        <input 
          placeholder="재료명" 
          value={item.ingredientName} 
          onChange={(e) => {
            const newItems = [...recipeForm.recipeItems];
            newItems[index].ingredientName = e.target.value;
            setRecipeForm({ ...recipeForm, recipeItems: newItems });
          }} 
          required 
        />
        <input 
          type="number" 
          value={item.requiredQuantity} 
          onChange={(e) => {
            const newItems = [...recipeForm.recipeItems];
            newItems[index].requiredQuantity = parseInt(e.target.value) || 0;
            setRecipeForm({ ...recipeForm, recipeItems: newItems });
          }} 
          style={{ width: '40px', marginLeft: '5px' }} 
          required 
        />
        <select 
          value={item.unit} 
          onChange={(e) => {
            const newItems = [...recipeForm.recipeItems];
            newItems[index].unit = e.target.value;
            setRecipeForm({ ...recipeForm, recipeItems: newItems });
          }}
          style={{ marginLeft: '5px' }}
        >
          <option value="개">개</option>
          <option value="숟가락">숟가락</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="보유">보유</option>
        </select>
        <button type="button" onClick={() => removeRecipeItemField(index)} style={{ marginLeft: '5px' }}>삭제</button>
      </div>
    ))}
    <button type="button" onClick={() => addRecipeItemField()}>재료 추가</button>
    <button type="submit" style={{ marginLeft: '10px', backgroundColor: '#e1f5fe' }}>레시피 저장</button>
  </form>
);

export default RecipeForm;