class ObservableArray {
  constructor() {
    this.array = [];
    this.listeners = [];
  }

  push(item) {
    this.array.push(item);
    this.notifyObservers();
  }

  remove(item) {
    const index = this.array.indexOf(item);
    if (index > -1) {
      this.array.splice(index, 1);
      this.notifyObservers();
    }
  }

  forEach(callback) {
    this.array.forEach(callback);
  }

  // 注册一个新的监听器
  addListener(listener) {
    this.listeners.push(listener);
  }

  // 通知所有监听器数组已变化
  notifyObservers() {
    this.listeners.forEach((listener) => listener());
  }
}

export default ObservableArray;
