export class Content {
  private content: string;

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error('Content length error.');
    }

    this.content = content;
  }

  static create(content: string | Content): Content {
    return typeof content === 'string' ? new Content(content) : content;
  }

  get value() {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 10 && content.length <= 100;
  }
}
