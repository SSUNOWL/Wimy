import React from 'react';
import { getDDayInfo } from '../utils/dateUtils';
const IngredientTable = ({ ingredients, editingId, editForm, setEditForm, handleUpdate, setEditingId, handleEditClick, handleDelete }) => (
  <table border="1" style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse', marginBottom: '40px' }}>
    <thead>
      <tr style={{ backgroundColor: '#f4f4f4' }}>
        <th>이름</th><th>수량/단위</th><th>유통기한</th><th>카테고리</th><th>관리</th>
      </tr>
    </thead>
    <tbody>
      {ingredients.map((item) => {
        const dday = getDDayInfo(item.expiredAt);
        return (
          <tr key={item.id} style={{ backgroundColor: editingId === item.id ? '#fff' : `${dday.color}11` }}>
            {editingId === item.id ? (
              /* [수정 모드] */
              <>
                <td>{item.name}</td>
                <td>
                  <input type="number" value={editForm.quantity} onChange={(e) => setEditForm({...editForm, quantity: parseInt(e.target.value)}) } style={{ width: '40px' }} />
                  <select value={editForm.unit} onChange={(e) => setEditForm({...editForm, unit: e.target.value}) }>
                    <option value="개">개</option><option value="병">병</option><option value="g">g</option><option value="보유">보유</option>
                  </select>
                </td>
                <td><input type="date" value={editForm.expiredAt} onChange={(e) => setEditForm({...editForm, expiredAt: e.target.value}) } /></td>
                <td>
                  <select value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value}) }>
                    <option value="냉장">냉장</option><option value="냉동">냉동</option><option value="실온">실온</option>
                  </select>
                </td>
                <td><button onClick={() => handleUpdate(item.id)}>저장</button><button onClick={() => setEditingId(null)}>취소</button></td>
              </>
            ) : (
              /* [일반 모드] */
              <>
                <td>{item.name}</td>
                <td>
                  {/* 단위가 '보유'면 수량 대신 '보유 중' 표시 */}
                  {item.unit === '보유' ? <span style={{ color: '#1890ff', fontWeight: 'bold' }}>보유 중</span> : `${item.quantity} ${item.unit || '개'}`}
                </td>
                <td style={{ color: dday.color, fontWeight: 'bold' }}>{item.expiredAt} ({dday.text})</td>
                <td>{item.category}</td>
                <td><button onClick={() => handleEditClick(item)}>수정</button><button onClick={() => handleDelete(item.id)} style={{ color: 'red' }}>삭제</button></td>
              </>
            )}
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default IngredientTable;