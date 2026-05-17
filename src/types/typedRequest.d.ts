export interface TypedRequest<T> extends express.Request {
  body: T;
}