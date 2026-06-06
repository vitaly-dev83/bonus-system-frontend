import { observer } from 'mobx-react-lite';
import { bonusStore } from '../../stores/BonusStore';
import styles from './BonusWidget.module.css';

const BonusWidget = observer(() => {
  const handleMonthChange = (e) => {
    bonusStore.setMonth(e.target.value);
  };

  const handleAddKpi = () => {
    const name = prompt('Введите название KPI:');
    const value = parseFloat(prompt('Введите значение:'));
    const weight = parseFloat(prompt('Введите вес (0-1):'));
    if (name && !isNaN(value) && !isNaN(weight)) {
      bonusStore.addKpi(name, value, weight);
    }
  };

  const handleSave = async () => {
    const success = await bonusStore.saveKpi();
    if (success) {
      alert('✅ Данные сохранены!');
    } else {
      alert('❌ Ошибка сохранения');
    }
  };

  if (bonusStore.isLoading) {
    return <div className={styles.loader}>⏳ Загрузка данных...</div>;
  }

  if (bonusStore.error) {
    return <div className={styles.error}>❌ {bonusStore.error}</div>;
  }

  return (
    <div className={styles.widget}>
      <h2 className={styles.title}>💰 Расчет премии</h2>
      
      <div className={styles.controls}>
        <label className={styles.label}>📅 Месяц: </label>
        <input 
          type="month" 
          className={styles.input}
          value={bonusStore.selectedMonth}
          onChange={handleMonthChange}
        />
      </div>

      <div className={styles.kpiSection}>
        <h3 className={styles.kpiTitle}>📊 KPI показатели:</h3>
        <div className={styles.kpiList}>
          {bonusStore.kpiList.map((kpi, index) => (
            <div key={index} className={styles.kpiItem}>
              <span className={styles.kpiName}>{kpi.name}</span>
              <span className={styles.kpiValue}>Значение: {kpi.value.toLocaleString()}</span>
              <span className={styles.kpiWeight}>Вес: {kpi.weight * 100}%</span>
              <span className={styles.kpiBonus}>Бонус: {(kpi.value * kpi.weight).toLocaleString()} ₽</span>
              <button 
                onClick={() => bonusStore.removeKpi(index)}
                className={styles.deleteButton}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.totalSection}>
        <span className={styles.totalLabel}>
          🎯 Итого премия: {bonusStore.totalBonus.toLocaleString()} ₽
        </span>
      </div>

      {/* Кнопки по центру - простой вариант */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        <button 
          onClick={handleAddKpi} 
          style={{ 
            padding: '10px 20px', 
            background: '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          ➕ Добавить KPI
        </button>
        <button 
          onClick={handleSave} 
          style={{ 
            padding: '10px 20px', 
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          💾 Сохранить
        </button>
      </div>
    </div>
  );
});

export default BonusWidget;