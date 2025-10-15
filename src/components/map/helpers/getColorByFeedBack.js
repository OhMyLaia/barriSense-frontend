export const getColorByFeedback = (feedbacks) => {
  if (feedbacks === 0) return "#FFFFFF"; // gray-300
  if (feedbacks <= 2) return "#000000"; // yellow-200
  if (feedbacks <= 4) return "#FBBF24"; // yellow-4001765dbff
  if (feedbacks <= 6) return "#F97316"; // orange-500
  return "#DC2626"; // red-600
};
