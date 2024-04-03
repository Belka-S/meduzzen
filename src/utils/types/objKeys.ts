type Obj = {
  firstName: string;
  lastName: string;
  age: number;
  numberOfCats: number;
};

type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never;
}[keyof T];

export type StringKeysOfObj = KeysOfValue<Obj, string>;

export type NumericKeysOfObj = KeysOfValue<Obj, number>;
