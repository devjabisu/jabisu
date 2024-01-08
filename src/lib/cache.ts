class Cache {
  private data: { [key: string]: any } = {};

  set(key: string, value: any) {
    this.data[key] = value;
  }

  get(key: string) {
    return this.data[key];
  }
}

export default new Cache();
