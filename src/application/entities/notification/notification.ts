import { EntityBase } from '../entity.base';
import { Content } from './content';

interface NotificationProps {
  recipientId: string;
  category: string;
  content: Content;
  readAt: Date | null;
  canceledAt: Date | null;
  createdAt?: Date;
}

type ConstructorProps = Replace<
  NotificationProps,
  { content: string | Content; readAt?: Date | null; canceledAt?: Date | null }
> & { id?: number };

export class Notification implements EntityBase {
  private _id: number;
  private props: NotificationProps;

  constructor(props: ConstructorProps) {
    this.load(props);
  }

  /*
   * id
   */

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  /*
   * recipientId
   */

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  /*
   * category
   */

  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  /*
   * content
   */

  public get content(): Content {
    return this.props.content;
  }

  public set content(content: string | Content) {
    if (typeof content === 'string') {
      content = new Content(content);
    }

    this.props.content = content;
  }

  /*
   * readAt
   */

  public get readAt(): Date | null {
    return this.props.readAt;
  }

  public set readAt(readAt: Date | null) {
    this.props.readAt = readAt;
  }

  /*
   * cancelAt
   */

  public get canceledAt(): Date | null {
    return this.props.canceledAt;
  }

  public set canceledAt(cancelAt: Date | null) {
    this.props.canceledAt = cancelAt;
  }

  /*
   * createdAt
   */

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  /*
   * actions
   */

  cancel() {
    this.canceledAt = new Date();
  }

  read() {
    this.readAt = new Date();
  }

  unread() {
    this.readAt = null;
  }

  /*
   * utilities
   */

  load(data: Partial<ConstructorProps>) {
    // update id
    if (data.id) {
      this._id = data.id;
      delete data.id;
    }

    // convert content [string] into [[new Content]]
    data.content && (data.content = Content.create(data.content));
    data.readAt = data.readAt ?? null;
    data.canceledAt = data.canceledAt ?? null;

    this.props = Object.assign(this.props ?? {}, data);
  }

  toJSON() {
    return {
      id: this.id,
      recipientId: this.recipientId,
      content: this.content.value,
      category: this.category,
      readAt: this.readAt,
      canceledAt: this.canceledAt,
      createdAt: this.createdAt,
    };
  }
}
