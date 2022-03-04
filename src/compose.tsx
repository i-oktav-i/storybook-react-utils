import { Falsy, UnknownObj, Wrapper } from 'typings/types';

/* eslint-disable max-len */

type Combine<
  T1 extends string | void = void,
  T2 extends string | void = void,
  T1Copy = T1,
  T2Copy = T2,
> = T1Copy extends void
  ? (T2Copy extends void ? void : T2)
  : (T2Copy extends void ? T1 : T1 | T2)

type ExcludeVoids<
  T1 extends string | void = void,
  T2 extends string | void = void,
  T3 extends string | void = void,
  T4 extends string | void = void,
  T5 extends string | void = void,
  T6 extends string | void = void,
  T7 extends string | void = void,
  T8 extends string | void = void,
  T9 extends string | void = void,
  T10 extends string | void = void,
> = Combine<T1, Combine<T2, Combine<T3, Combine<T4, Combine<T5, Combine<T6, Combine<T7, Combine<T8, Combine<T9, T10>>>>>>>>>

export function compose<P1 extends UnknownObj, O1 extends string | void>(w1: Wrapper<P1, O1>): Wrapper<P1, ExcludeVoids<O1>>
export function compose<P1 extends UnknownObj, O1 extends string | void, P2 extends UnknownObj, O2 extends string | void>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>): Wrapper<P1 & P2, ExcludeVoids<O1, O2>>
export function compose<P1 extends UnknownObj, O1 extends string | void, P2 extends UnknownObj, O2 extends string | void, P3 extends UnknownObj, O3 extends string | void>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>): Wrapper<P1 & P2 & P3, ExcludeVoids<O1, O2, O3>>
export function compose<P1 extends UnknownObj, O1 extends string | void, P2 extends UnknownObj, O2 extends string | void, P3 extends UnknownObj, O3 extends string | void, P4 extends UnknownObj, O4 extends string | void>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>): Wrapper<P1 & P2 & P3 & P4, ExcludeVoids<O1, O2, O3, O4>>
export function compose<P1 extends UnknownObj, O1 extends string | void, P2 extends UnknownObj, O2 extends string | void, P3 extends UnknownObj, O3 extends string | void, P4 extends UnknownObj, O4 extends string | void, P5 extends UnknownObj, O5 extends string | void>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>): Wrapper<P1 & P2 & P3 & P4 & P5, ExcludeVoids<O1, O2, O3, O4, O5>>
export function compose<P1 extends UnknownObj, O1 extends string | void, P2 extends UnknownObj, O2 extends string | void, P3 extends UnknownObj, O3 extends string | void, P4 extends UnknownObj, O4 extends string | void, P5 extends UnknownObj, O5 extends string | void, P6 extends UnknownObj, O6 extends string | void>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>, w6: Wrapper<P6, O6>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6, ExcludeVoids<O1, O2, O3, O4, O5, O6>>
export function compose<P1 extends UnknownObj, O1 extends string | void, P2 extends UnknownObj, O2 extends string | void, P3 extends UnknownObj, O3 extends string | void, P4 extends UnknownObj, O4 extends string | void, P5 extends UnknownObj, O5 extends string | void, P6 extends UnknownObj, O6 extends string | void, P7 extends UnknownObj, O7 extends string | void>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>, w6: Wrapper<P6, O6>, w7: Wrapper<P7, O7>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7, ExcludeVoids<O1, O2, O3, O4, O5, O6>>
export function compose<P1 extends UnknownObj, O1 extends string | void, P2 extends UnknownObj, O2 extends string | void, P3 extends UnknownObj, O3 extends string | void, P4 extends UnknownObj, O4 extends string | void, P5 extends UnknownObj, O5 extends string | void, P6 extends UnknownObj, O6 extends string | void, P7 extends UnknownObj, O7 extends string | void, P8 extends UnknownObj, O8 extends string | void>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>, w6: Wrapper<P6, O6>, w7: Wrapper<P7, O7>, w8: Wrapper<P8, O8>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8, ExcludeVoids<O1, O2, O3, O4, O5, O6, O7, O8>>
export function compose<P1 extends UnknownObj, O1 extends string | void, P2 extends UnknownObj, O2 extends string | void, P3 extends UnknownObj, O3 extends string | void, P4 extends UnknownObj, O4 extends string | void, P5 extends UnknownObj, O5 extends string | void, P6 extends UnknownObj, O6 extends string | void, P7 extends UnknownObj, O7 extends string | void, P8 extends UnknownObj, O8 extends string | void, P9 extends UnknownObj, O9 extends string | void>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>, w6: Wrapper<P6, O6>, w7: Wrapper<P7, O7>, w8: Wrapper<P8, O8>, w9: Wrapper<P9, O9>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9, ExcludeVoids<O1, O2, O3, O4, O5, O6, O7, O8, O9>>
export function compose<P1 extends UnknownObj, O1 extends string | void, P2 extends UnknownObj, O2 extends string | void, P3 extends UnknownObj, O3 extends string | void, P4 extends UnknownObj, O4 extends string | void, P5 extends UnknownObj, O5 extends string | void, P6 extends UnknownObj, O6 extends string | void, P7 extends UnknownObj, O7 extends string | void, P8 extends UnknownObj, O8 extends string | void, P9 extends UnknownObj, O9 extends string | void, P10 extends UnknownObj, O10 extends string | void>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>, w6: Wrapper<P6, O6>, w7: Wrapper<P7, O7>, w8: Wrapper<P8, O8>, w9: Wrapper<P9, O9>, w10: Wrapper<P10, O10>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10, ExcludeVoids<O1, O2, O3, O4, O5, O6, O7, O8, O9, O10>>
export function compose<P1 extends UnknownObj, O1 extends string | void, P2 extends UnknownObj, O2 extends string | void, P3 extends UnknownObj, O3 extends string | void, P4 extends UnknownObj, O4 extends string | void, P5 extends UnknownObj, O5 extends string | void, P6 extends UnknownObj, O6 extends string | void, P7 extends UnknownObj, O7 extends string | void, P8 extends UnknownObj, O8 extends string | void, P9 extends UnknownObj, O9 extends string | void, P10 extends UnknownObj, O10 extends string | void>(w1: Wrapper<P1, O1>, w2?: Wrapper<P2, O2> | Falsy, w3?: Wrapper<P3, O3> | Falsy, w4?: Wrapper<P4, O4> | Falsy, w5?: Wrapper<P5, O5> | Falsy, w6?: Wrapper<P6, O6> | Falsy, w7?: Wrapper<P7, O7> | Falsy, w8?: Wrapper<P8, O8> | Falsy, w9?: Wrapper<P9, O9> | Falsy, w10?: Wrapper<P10, O10> | Falsy) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (E: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let res: any = w1(E);

    if (w2) res = w2(res);
    if (w3) res = w3(res);
    if (w4) res = w4(res);
    if (w5) res = w5(res);
    if (w6) res = w6(res);
    if (w7) res = w7(res);
    if (w8) res = w8(res);
    if (w9) res = w9(res);
    if (w10) res = w10(res);

    return res;
  };
}
/* eslint-enable max-len */
