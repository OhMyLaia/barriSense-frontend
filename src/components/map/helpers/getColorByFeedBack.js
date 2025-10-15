export const getColorByFeedback = (feedbacks) => {
  if (feedbacks === 0) return "#22C55E";
  if (feedbacks <= 2) return "#EAB308";
  if (feedbacks <= 4) return "#F97316";
  if (feedbacks <= 6) return "#DC2626";
  return "#7F1D1D";
};
