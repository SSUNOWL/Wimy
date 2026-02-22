import { useEffect, useState } from 'react';
import { getDDayInfo } from './utils/dateUtils';
import IngredientForm from './components/IngredientForm';
import IngredientTable from './components/IngredientTable';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import './App.css';
import api from './utils/axios';
function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  // 식재료 상태
  const [form, setForm] = useState({ name: '', quantity: 0, expiredAt: '', category: '냉장', unit: '개' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', quantity: 0, expiredAt: '', category: '냉장', unit: '개' });

  // 레시피 상태
  const [recipeForm, setRecipeForm] = useState({ name: '', recipeItems: [{ ingredientName: '', requiredQuantity: 1 }] });
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [recipeEditForm, setRecipeEditForm] = useState({ name: '', recipeItems: [] });

  useEffect(() => {
    fetchIngredients();
    fetchRecipes();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await api.get('/api/ingredients');
      setIngredients(response.data);
    } catch (error) { console.error("조회 실패:", error); }
  };

  const fetchRecipes = async () => {
    try {
      const response = await api.get('/api/recipes');
      setRecipes(response.data);
    } catch (error) { console.error("레시피 조회 실패:", error); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'quantity' ? parseInt(value) || 0 : value;
    setForm({ ...form, [name]: finalValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/ingredients', form);
      alert('추가되었습니다.');
      setForm({ name: '', quantity: 0, expiredAt: '', category: '냉장', unit: '개' });
      fetchIngredients();
    } catch (error) { console.error("추가 실패:", error); }
  };

  const handleDelete = async (id) => {
    if (window.confirm('정말 이 식재료를 삭제하시겠습니까?')) {
      try {
        await api.delete(`/api/ingredients/${id}`);
        fetchIngredients();
      } catch (error) { console.error("삭제 실패:", error); }
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditForm({ name: item.name, quantity: item.quantity, expiredAt: item.expiredAt, category: item.category, unit: item.unit || '개' });
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/api/ingredients/${id}`, editForm);
      setEditingId(null);
      fetchIngredients();
    } catch (error) { console.error("수정 실패:", error); }
  };

  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/recipes', recipeForm);
      alert('레시피가 등록되었습니다.');
      setRecipeForm({ name: '', recipeItems: [{ ingredientName: '', requiredQuantity: 1 }] });
      fetchRecipes();
    } catch (error) { console.error("레시피 등록 실패:", error); }
  };

  const handleUseRecipe = async (recipe) => {
    const expiredItems = recipe.recipeItems.filter(rItem => {
      const stock = ingredients.find(ing => ing.name === rItem.ingredientName);
      return stock && getDDayInfo(stock.expiredAt).text.includes('만료');
    });

    if (expiredItems.length > 0) {
      const itemNames = expiredItems.map(i => i.ingredientName).join(', ');
      if (!window.confirm(`[주의] 유통기한이 지난 재료(${itemNames})가 있습니다. 요리하시겠습니까?`)) return;
    }

    try {
      const response = await api.post(`/api/recipes/${recipe.id}/use`);
      alert(response.data);
      fetchIngredients();
    } catch (error) {
      alert(error.response?.data || "요리 처리 중 에러가 발생했습니다.");
    }
  };

  const addRecipeItemField = (isEdit = false) => {
    const newItem = { ingredientName: '', requiredQuantity: 1, unit: '개' };
    if (isEdit) setRecipeEditForm({ ...recipeEditForm, recipeItems: [...recipeEditForm.recipeItems, newItem] });
    else setRecipeForm({ ...recipeForm, recipeItems: [...recipeForm.recipeItems, newItem] });
  };

  const removeRecipeItemField = (index, isEdit = false) => {
    if (isEdit) {
      const newItems = recipeEditForm.recipeItems.filter((_, i) => i !== index);
      setRecipeEditForm({ ...recipeEditForm, recipeItems: newItems });
    } else {
      const newItems = recipeForm.recipeItems.filter((_, i) => i !== index);
      setRecipeForm({ ...recipeForm, recipeItems: newItems });
    }
  };

  const handleRecipeDelete = async (id) => {
    if (window.confirm('이 레시피를 삭제하시겠습니까?')) {
      try {
        await api.delete(`/api/recipes/${id}`);
        fetchRecipes();
      } catch (error) { console.error("삭제 실패:", error); }
    }
  };

  const handleRecipeEditClick = (recipe) => {
    setEditingRecipeId(recipe.id);
    setRecipeEditForm({ name: recipe.name, recipeItems: JSON.parse(JSON.stringify(recipe.recipeItems)) });
  };

  const handleRecipeUpdate = async (id) => {
    try {
      await api.put(`/api/recipes/${id}`, recipeEditForm);
      setEditingRecipeId(null);
      fetchRecipes();
    } catch (error) { console.error("레시피 수정 실패:", error); }
  };

  // 공통 프롭스 묶음
  const ingredientProps = {
    editingId, editForm, setEditForm, handleUpdate, setEditingId, handleEditClick, handleDelete
  };

  const recipeProps = {
    editingRecipeId, recipeEditForm, setRecipeEditForm, handleRecipeUpdate, setEditingRecipeId, 
    handleRecipeEditClick, handleRecipeDelete, handleUseRecipe, addRecipeItemField, removeRecipeItemField
  };

// App.jsx의 return 문 내부 레이아웃 부분

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>Wimy 냉장고 관리</h1>
      </header>

      <div className="input-section">
        <IngredientForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
        <RecipeForm 
          recipeForm={recipeForm} setRecipeForm={setRecipeForm} handleRecipeSubmit={handleRecipeSubmit} 
          addRecipeItemField={addRecipeItemField} removeRecipeItemField={removeRecipeItemField} 
        />
      </div>

      <div className="main-storage">
        {/* 냉장고 구역 */}
        <div className="fridge-body">
          <div className="freezer-zone">
            <h3 className="zone-title">[냉동실]</h3>
            <div className="table-wrapper">
              <IngredientTable ingredients={ingredients.filter(i => i.category === '냉동')} {...ingredientProps} />
            </div>
          </div>
          <div className="refrigeration-zone">
            <h3 className="zone-title">[냉장실]</h3>
            <div className="table-wrapper">
              <IngredientTable ingredients={ingredients.filter(i => i.category === '냉장')} {...ingredientProps} />
            </div>
          </div>
        </div>

        {/* 실온 바구니 구역 */}
        <div className="basket-body">
          <h3 className="zone-title">[실온 보관함]</h3>
          <div className="table-wrapper">
            <IngredientTable ingredients={ingredients.filter(i => i.category === '실온')} {...ingredientProps} />
          </div>
        </div>
      </div>

      {/* 레시피 보드 구역 */}
      <footer className="recipe-countertop">
        <h2 className="section-title">주방 레시피 보드</h2>
        <RecipeList recipes={recipes} {...recipeProps} />
      </footer>
    </div>
  );
}

export default App;