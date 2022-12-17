import { Content } from './content';

describe('Content', () => {
  it('should be able to create a notification content', () => {
    expect(() => {
      new Content('a'.repeat(10));
      new Content('a'.repeat(100));
    }).not.toThrow();
  });

  it("should'nt be able to create a notification content with less than 10 characters", () => {
    expect(() => new Content('a'.repeat(9))).toThrow();
  });

  it("should'nt be able to create a notification content with more than 100 characters", () => {
    expect(() => new Content('a'.repeat(101))).toThrow();
  });
});
