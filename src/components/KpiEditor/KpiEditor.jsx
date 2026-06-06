import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { bonusStore } from '../../stores/BonusStore';

const KpiEditor = observer(() => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [editWeight, setEditWeight] = useState('');

  const startEdit = (index, currentValue, currentWeight) => {
    setEditingIndex(index);
    setEditValue(currentValue);
    setEditWeight(currentWeight * 100);
  };

  const saveEdit = (index) => {
    bonusStore.updateKpi(index, 'value', parseFloat(editValue));
    bonusStore.updateKpi(index, 'weight', parseFloat(editWeight) / 100);
    setEditingIndex(null);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <button onClick={() => {
        const name = prompt('Введите название KPI:');
        const value = parseFloat(prompt('Введите значение:'));
        const weight = parseFloat(prompt('Введите вес (0-1):'));
        if (name && !isNaN(value) && !isNaN(weight)) {
          bonusStore.addKpi(name, value, weight);
        }
      }} style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        ➕ Добавить KPI
      </button>
    </div>
  );
});

export default KpiEditor;