import { Falsy, UnknownObj, Wrapper } from 'typings/types';

/* eslint-disable max-len */
export function compose<P1 extends UnknownObj, O1 extends string>(w1: Wrapper<P1, O1>): Wrapper<P1, O1>
export function compose<P1 extends UnknownObj, O1 extends string, P2 extends UnknownObj, O2 extends string>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>): Wrapper<P1 & P2, O1 | O2>
export function compose<P1 extends UnknownObj, O1 extends string, P2 extends UnknownObj, O2 extends string, P3 extends UnknownObj, O3 extends string>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>): Wrapper<P1 & P2 & P3, O1 | O2 | O3>
export function compose<P1 extends UnknownObj, O1 extends string, P2 extends UnknownObj, O2 extends string, P3 extends UnknownObj, O3 extends string, P4 extends UnknownObj, O4 extends string>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>): Wrapper<P1 & P2 & P3 & P4, O1 | O2 | O3 | O4>
export function compose<P1 extends UnknownObj, O1 extends string, P2 extends UnknownObj, O2 extends string, P3 extends UnknownObj, O3 extends string, P4 extends UnknownObj, O4 extends string, P5 extends UnknownObj, O5 extends string>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>): Wrapper<P1 & P2 & P3 & P4 & P5, O1 | O2 | O3 | O4 | O5>
export function compose<P1 extends UnknownObj, O1 extends string, P2 extends UnknownObj, O2 extends string, P3 extends UnknownObj, O3 extends string, P4 extends UnknownObj, O4 extends string, P5 extends UnknownObj, O5 extends string, P6 extends UnknownObj, O6 extends string>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>, w6: Wrapper<P6, O6>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6, O1 | O2 | O3 | O4 | O5 | O6>
export function compose<P1 extends UnknownObj, O1 extends string, P2 extends UnknownObj, O2 extends string, P3 extends UnknownObj, O3 extends string, P4 extends UnknownObj, O4 extends string, P5 extends UnknownObj, O5 extends string, P6 extends UnknownObj, O6 extends string, P7 extends UnknownObj, O7 extends string>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>, w6: Wrapper<P6, O6>, w7: Wrapper<P7, O7>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7, O1 | O2 | O3 | O4 | O5 | O6>
export function compose<P1 extends UnknownObj, O1 extends string, P2 extends UnknownObj, O2 extends string, P3 extends UnknownObj, O3 extends string, P4 extends UnknownObj, O4 extends string, P5 extends UnknownObj, O5 extends string, P6 extends UnknownObj, O6 extends string, P7 extends UnknownObj, O7 extends string, P8 extends UnknownObj, O8 extends string>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>, w6: Wrapper<P6, O6>, w7: Wrapper<P7, O7>, w8: Wrapper<P8, O8>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8>
export function compose<P1 extends UnknownObj, O1 extends string, P2 extends UnknownObj, O2 extends string, P3 extends UnknownObj, O3 extends string, P4 extends UnknownObj, O4 extends string, P5 extends UnknownObj, O5 extends string, P6 extends UnknownObj, O6 extends string, P7 extends UnknownObj, O7 extends string, P8 extends UnknownObj, O8 extends string, P9 extends UnknownObj, O9 extends string>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>, w6: Wrapper<P6, O6>, w7: Wrapper<P7, O7>, w8: Wrapper<P8, O8>, w9: Wrapper<P9, O9>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8 | O9>
export function compose<P1 extends UnknownObj, O1 extends string, P2 extends UnknownObj, O2 extends string, P3 extends UnknownObj, O3 extends string, P4 extends UnknownObj, O4 extends string, P5 extends UnknownObj, O5 extends string, P6 extends UnknownObj, O6 extends string, P7 extends UnknownObj, O7 extends string, P8 extends UnknownObj, O8 extends string, P9 extends UnknownObj, O9 extends string, P10 extends UnknownObj, O10 extends string>(w1: Wrapper<P1, O1>, w2: Wrapper<P2, O2>, w3: Wrapper<P3, O3>, w4: Wrapper<P4, O4>, w5: Wrapper<P5, O5>, w6: Wrapper<P6, O6>, w7: Wrapper<P7, O7>, w8: Wrapper<P8, O8>, w9: Wrapper<P9, O9>, w10: Wrapper<P10, O10>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10, O1 | O2 | O3 | O4 | O5 | O6 | O7 | O8 | O9 | O10>
export function compose<P1 extends UnknownObj, O1 extends string, P2 extends UnknownObj, O2 extends string, P3 extends UnknownObj, O3 extends string, P4 extends UnknownObj, O4 extends string, P5 extends UnknownObj, O5 extends string, P6 extends UnknownObj, O6 extends string, P7 extends UnknownObj, O7 extends string, P8 extends UnknownObj, O8 extends string, P9 extends UnknownObj, O9 extends string, P10 extends UnknownObj, O10 extends string>(w1: Wrapper<P1, O1>, w2?: Wrapper<P2, O2> | Falsy, w3?: Wrapper<P3, O3> | Falsy, w4?: Wrapper<P4, O4> | Falsy, w5?: Wrapper<P5, O5> | Falsy, w6?: Wrapper<P6, O6> | Falsy, w7?: Wrapper<P7, O7> | Falsy, w8?: Wrapper<P8, O8> | Falsy, w9?: Wrapper<P9, O9> | Falsy, w10?: Wrapper<P10, O10> | Falsy) {
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
