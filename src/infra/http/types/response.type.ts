export interface Response {
  message: string;
}

export interface ResponseWithModel<T> extends Response {
  model: T;
}
