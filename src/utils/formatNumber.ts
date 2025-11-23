export const formatNumberWithComma = (value: string): string => {
  const numberOnly = value.replace(/[^\d]/g, '');
  return numberOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parseNumberWithComma = (value: string): string => {
  return value.replace(/,/g, '');
};
