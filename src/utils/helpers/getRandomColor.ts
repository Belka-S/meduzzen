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

type TRange = Range<1, 101>;

export const getRandomColor = (range: TRange) => {
  const h = Math.floor(Math.random() * 360),
    s = Math.floor(Math.random() * 100) + '%',
    l = Math.floor(Math.random() * range) + '%';
  return `hsl(${h},${s},${l})`;
};
