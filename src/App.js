import React, { useEffect } from 'react';
import { kafkaService } from './services/kafkaService';
import BonusWidget from './components/BonusWidget/BonusWidget';
import { bonusStore } from './stores/BonusStore';
import KpiEditor from './components/KpiEditor/KpiEditor';
function App() {
  useEffect(() => {
    bonusStore.loadKpi();
  }, []);

  return (
    <div className="App">
      <BonusWidget />
      <KpiEditor />
      
      <button onClick={() => bonusStore.saveKpi()}>
        💾 Сохранить
      </button>
    </div>
    
  );
  
}


export default App;