export const getDDayInfo = (expiredAt) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(expiredAt);
  target.setHours(0, 0, 0, 0);

  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { text: `만료 (${Math.abs(diffDays)}일 지남)`, color: '#ff4d4f' };
  if (diffDays === 0) return { text: 'D-Day', color: '#faad14' };
  if (diffDays <= 3) return { text: `D-${diffDays}`, color: '#faad14' };
  return { text: `D-${diffDays}`, color: '#52c41a' };
};