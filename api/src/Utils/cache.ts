import EventEmitter from 'events';

const defaultOptions: Options = {
  ttl: 5000,
  checkPeriod: 2000,
};

export default class Cache extends EventEmitter {
  cacheObjects: Record<string, CacheObject>;
  interval: Timeout;
  options: Options;
  constructor(options: Options) {
    super();
    this.options = { ...defaultOptions, ...options };
    this.cacheObjects = {};
    this.interval = setInterval(() => {
      Object.entries(this.cacheObjects).forEach((entry) => {
        const [key, value, createdDate] = [entry[0], entry[1].value, entry[1].createdAt];
        if (!(Date.now() - createdDate > this.options.ttl)) {
          return;
        }
        delete this.cacheObjects[key];
        this.emit('expired', key, value);
      });
    }, this.options.checkPeriod);
  }
  has(key: string): boolean {
    return this.cacheObjects.hasOwnProperty(key);
  }
  get(key: string): string | null {
    if (!this.has(key)) {
      return null;
    }
    return this.cacheObjects[key].value;
  }
  set(key: string, value: string): void {
    this.cacheObjects[key] = {
      value,
      createdAt: Date.now(),
    };
    this.emit('set', key, value);
  }
  del(key: string): boolean {
    const res = delete this.cacheObjects[key];
    if (res) {
      this.emit('del', key, this.cacheObjects[key].value);
    }
    return res;
  }
  touch(key: string): boolean {
    if (!this.has(key)) {
      return false;
    }
    this.cacheObjects[key].createdAt = Date.now();
    return true;
  }
}

interface CacheObject {
  value: string;
  createdAt: number;
}

interface Options {
  ttl: number;
  checkPeriod: number;
}
