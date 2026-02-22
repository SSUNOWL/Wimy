import React from 'react';

const IngredientForm = ({ form, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px' }}>
    <h3>새 재료 등록</h3>
    <input name="name" placeholder="재료명" value={form.name} onChange={handleChange} required />
    <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required style={{ width: '50px' }} />
    <input type="date" name="expiredAt" value={form.expiredAt} onChange={handleChange} required />
    <select name="category" value={form.category} onChange={handleChange}>
      <option value="냉장">냉장</option><option value="냉동">냉동</option><option value="실온">실온</option>
    </select>
    <select name="unit" value={form.unit} onChange={handleChange} style={{ marginLeft: '5px' }}>
      <option value="개">개</option>
      <option value="병">병</option>
      <option value="g">g</option>
      <option value="보유">보유(소스/양념)</option>
    </select>
    <button type="submit">추가</button>
  </form>
);

export default IngredientForm;