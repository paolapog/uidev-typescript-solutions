/* eslint-disable @typescript-eslint/no-unused-vars */
// Change these functions into generic functions by altering the
// type signatures. There should be no `unknown` types when you are done
function randomFromList<T>(list: T[]): T {
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}
function duplicateList<T>(list: T[], count: number = 1) {
  let output: T[] = [];
  for (let i = 0; i < count; i++) {
    output = output.concat(list);
  }
  return output;
}
function createTuple<T, X>(item1: T, item2: X) {
  return [item1, item2] as const;
}

// Use the following interface to constrain the generic in the next function
interface Length {
  length: number;
}
function getLength<L extends Length>(item: L): number {
  return item.length;
}
