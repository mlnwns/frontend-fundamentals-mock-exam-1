import { useState } from 'react';
import { formatNumberWithComma } from '../utils/formatNumber';

export interface SavingsFormState {
  targetAmount: string;
  monthlyAmount: string;
  savingsTerm: number;
}

export const useSavingsForm = () => {
  const [formState, setFormState] = useState<SavingsFormState>({
    targetAmount: '',
    monthlyAmount: '',
    savingsTerm: 12,
  });

  const handleTargetAmountChange = (value: string) => {
    const formatted = formatNumberWithComma(value);
    setFormState(prev => ({
      ...prev,
      targetAmount: formatted,
    }));
  };

  const handleMonthlyAmountChange = (value: string) => {
    const formatted = formatNumberWithComma(value);
    setFormState(prev => ({
      ...prev,
      monthlyAmount: formatted,
    }));
  };

  const handleSavingsTermChange = (value: number) => {
    setFormState(prev => ({
      ...prev,
      savingsTerm: value,
    }));
  };

  return {
    formState,
    handleTargetAmountChange,
    handleMonthlyAmountChange,
    handleSavingsTermChange,
  };
};
