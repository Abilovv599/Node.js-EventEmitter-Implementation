type Callback = (...args: any[]) => any;
type Subscription = {
  unsubscribe: () => void;
};

class EventEmitter {
  private events = new Map();

  subscribe(eventName: string, callback: Callback): Subscription {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(callback);
    return {
      unsubscribe: () => {
        this.events.set(
          eventName,
          this.events.get(eventName).filter((cb: Callback) => cb !== callback)
        );
      },
    };
  }

  emit(eventName: string, args: any[] = []): any[] {
    return (this.events.get(eventName) ?? []).map((cb: Callback) =>
      cb(...args)
    );
  }
}
