type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

type TRange = Range<1, 21>;

export const getRandomNumber = (range: TRange) =>
  (Math.random() * Math.pow(10, range)).toFixed();
