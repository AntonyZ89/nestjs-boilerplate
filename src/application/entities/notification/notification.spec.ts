import { Notification } from './notification';

describe('Create notification', () => {
  it('should be able to create a notification', () => {
    expect(() => {
      new Notification({
        recipientId: 'recipient-id-test',
        category: 'test',
        content: 'test notification',
      });
    }).not.toThrow();
  });
});
