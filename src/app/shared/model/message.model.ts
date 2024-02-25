export interface Message<T, P = unknown> {
  type: T;
  payload?: P;
}
