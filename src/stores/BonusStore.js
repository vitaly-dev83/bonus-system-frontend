import { makeAutoObservable } from 'mobx';

class BonusStore {
  kpiList = [];
  isLoading = false;
  selectedMonth = '2026-06';
  totalBonus = 0;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  setMonth(month) {
    this.selectedMonth = month;
    this.loadKpi();
  }

  async loadKpi() {
    this.isLoading = true;
    this.error = null;
    
    try {
      // Пытаемся загрузить из localStorage сначала
      const savedData = localStorage.getItem(`kpi_${this.selectedMonth}`);
      if (savedData) {
        this.kpiList = JSON.parse(savedData);
        this.calculateTotalBonus();
        this.isLoading = false;
        return;
      }

      // Иначе используем моковые данные
      const mockData = [
        { name: 'Выручка', value: 1200000, weight: 0.5 },
        { name: 'Сроки', value: 98, weight: 0.3 },
        { name: 'Качество', value: 95, weight: 0.2 }
      ];
      
      this.kpiList = mockData;
      this.calculateTotalBonus();
      
    } catch (error) {
      this.error = 'Не удалось загрузить данные KPI';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  addKpi(name, value, weight) {
    this.kpiList.push({ name, value, weight });
    this.calculateTotalBonus();
    this.saveToLocalStorage();
  }

  removeKpi(index) {
    this.kpiList.splice(index, 1);
    this.calculateTotalBonus();
    this.saveToLocalStorage();
  }

  updateKpi(index, field, newValue) {
    this.kpiList[index][field] = newValue;
    this.calculateTotalBonus();
    this.saveToLocalStorage();
  }

  calculateTotalBonus() {
    this.totalBonus = this.kpiList.reduce((sum, kpi) => {
      return sum + (kpi.value * kpi.weight);
    }, 0);
  }

  saveToLocalStorage() {
    localStorage.setItem(`kpi_${this.selectedMonth}`, JSON.stringify(this.kpiList));
  }

  async saveKpi() {
    try {
      this.saveToLocalStorage();
      console.log('KPI сохранены в localStorage');
      return true;
    } catch (error) {
      console.error('Ошибка сохранения KPI:', error);
      this.error = 'Не удалось сохранить данные';
      return false;
    }
  }

  clearError() {
    this.error = null;
  }
}

export const bonusStore = new BonusStore();