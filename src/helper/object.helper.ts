const ObjectHelper = {
  // find key in object recursively
  hasKey(key: string, obj: Record<string, any>): boolean {
    if (key in obj) return true;

    for (const k of Object.keys(obj)) {
      const current = obj[k];

      if (Array.isArray(current)) {
        const r = current.some((item) => key in item || this.hasKey(key, item));

        if (r) return true;
      } else if (typeof current === 'object' && this.hasKey(key, current)) {
        return true;
      }
    }

    return false;
  },
};

export { ObjectHelper };
