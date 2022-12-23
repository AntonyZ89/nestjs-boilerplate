import { ApiProperty } from '@nestjs/swagger';
import { EntityBase } from '../entity.base';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  category: string;
  content: Content;
  readAt: Date | null;
  canceledAt: Date | null;
  createdAt: Date;
  deletedAt: Date | null;
}

export type NotificationConstructorProps = Override<
  PartialSelect<
    NotificationProps,
    'readAt' | 'canceledAt' | 'createdAt' | 'deletedAt'
  >,
  { id?: number; content: string | Content }
>;

export class Notification implements EntityBase {
  private _id: number;
  private props: NotificationProps;

  constructor(props: NotificationConstructorProps) {
    this.load(props);
  }

  /*
   * id
   */

  @ApiProperty()
  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  /*
   * recipientId
   */

  @ApiProperty({ example: '60c3a5d0-88c3-4784-8dc9-0ca82798a961' })
  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  /*
   * category
   */

  @ApiProperty()
  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  /*
   * content
   */

  @ApiProperty({ type: 'string' })
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

  @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
  public get readAt(): Date | null {
    return this.props.readAt;
  }

  /*
   * cancelAt
   */

  @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
  public get canceledAt(): Date | null {
    return this.props.canceledAt;
  }

  /*
   * createdAt
   */

  @ApiProperty({ type: 'string', format: 'date-time' })
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  /*
   * deletedAt
   */

  @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
  public get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  /*
   * actions
   */

  cancel() {
    this.props.canceledAt = new Date();
  }

  read() {
    this.props.readAt = new Date();
  }

  unread() {
    this.props.readAt = null;
  }

  /*
   * utilities
   */

  load(data: Partial<NotificationConstructorProps>) {
    // update id
    if (data.id) {
      this._id = data.id;
      delete data.id;
    }

    // convert content [string] into [[new Content]]
    data.content && (data.content = Content.create(data.content));
    data.readAt = data.readAt ?? null;
    data.canceledAt = data.canceledAt ?? null;
    data.createdAt && (data.createdAt = data.createdAt);
    data.deletedAt = data.deletedAt ?? null;

    this.props = Object.assign(this.props ?? {}, data);
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
      content: this.content.value,
    };
  }
}
