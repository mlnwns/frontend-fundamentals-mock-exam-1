import { useState } from 'react';

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
    setFormState(prev => ({
      ...prev,
      targetAmount: value,
    }));
  };

  const handleMonthlyAmountChange = (value: string) => {
    setFormState(prev => ({
      ...prev,
      monthlyAmount: value,
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
