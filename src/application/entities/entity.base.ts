export abstract class EntityBase {
  /**
   * Load data
   */
  abstract load(data: any): void;
  /**
   * Return entity object
   */
  abstract toJSON(): Record<string, any>;
}
