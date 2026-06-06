import { io } from 'socket.io-client';

class KafkaService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    this.socket = io('http://localhost:5000', {
      path: '/kafka',
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('✅ Подключен к Kafka Gateway');
    });

    this.socket.on('bonus-update', (data) => {
      const callback = this.listeners.get('bonus-update');
      if (callback) callback(data);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Отключен от Kafka');
    });
  }

  subscribe(topic, callback) {
    this.listeners.set(topic, callback);
    if (this.socket) {
      this.socket.emit('subscribe', { topic });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export const kafkaService = new KafkaService();