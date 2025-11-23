import { SelectBottomSheet, Spacing, TextField } from 'tosslib';
import { SAVINGS_TERMS } from '../constants/savingsTerms';
import type { SavingsFormState } from '../hooks/useSavingsForm';

interface SavingsFormProps {
  formState: SavingsFormState;
  onTargetAmountChange: (value: string) => void;
  onMonthlyAmountChange: (value: string) => void;
  onSavingsTermChange: (value: number) => void;
}

export function SavingsForm({
  formState,
  onTargetAmountChange,
  onMonthlyAmountChange,
  onSavingsTermChange,
}: SavingsFormProps) {
  return (
    <>
      <Spacing size={16} />
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        onChange={e => onTargetAmountChange((e.target as HTMLInputElement).value)}
        value={formState.targetAmount}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        onChange={e => onMonthlyAmountChange((e.target as HTMLInputElement).value)}
        value={formState.monthlyAmount}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={formState.savingsTerm}
        onChange={value => onSavingsTermChange(value as number)}
      >
        {SAVINGS_TERMS.map(term => (
          <SelectBottomSheet.Option key={term.value} value={term.value}>
            {term.label}
          </SelectBottomSheet.Option>
        ))}
      </SelectBottomSheet>
    </>
  );
}
