import BonusWidget from './BonusWidget';
import { bonusStore } from '../../stores/BonusStore';

export default {
  title: 'Bonus/BonusWidget',
  component: BonusWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = () => {
  bonusStore.kpiList = [
    { name: 'Выручка', value: 1200000, weight: 0.5 },
    { name: 'Сроки', value: 98, weight: 0.3 },
    { name: 'Качество', value: 95, weight: 0.2 }
  ];
  bonusStore.calculateTotalBonus();
  bonusStore.isLoading = false;
  return <BonusWidget />;
};

export const Loading = () => {
  bonusStore.isLoading = true;
  return <BonusWidget />;
};

export const Empty = () => {
  bonusStore.kpiList = [];
  bonusStore.totalBonus = 0;
  bonusStore.isLoading = false;
  return <BonusWidget />;
};