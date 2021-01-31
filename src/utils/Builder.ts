export default class Builder<T, R extends {} = {}> {
  constructor(private current: R = null) {}

  // P: Only those properties from T that do not exist in R
  prop<P extends Exclude<keyof T, keyof R>, V extends T[P]>(key: P, value: V) {
    const extra: Pick<T, P> = ({ [key]: value } as unknown) as Pick<T, P>;

    // `instance` is an intersection between our accumulator type (R) and
    // the `extra` object created above
    const instance = {
      ...(this.current as object),
      ...extra,
    } as R & Pick<T, P>;

    return new Builder<T, R & Pick<T, P>>(instance);
  }

  build(): T {
    return (this.current as unknown) as T;
  }
}
