import { Falsy, UnknownObj, Wrapper } from 'typings/types';

/* eslint-disable max-len */
export function compose<P1 extends UnknownObj>(w1: Wrapper<P1>): Wrapper<P1>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>): Wrapper<P1 & P2>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>): Wrapper<P1 & P2 & P3>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>): Wrapper<P1 & P2 & P3 & P4>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>): Wrapper<P1 & P2 & P3 & P4 & P5>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>, w6: Wrapper<P6>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj, P7 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>, w6: Wrapper<P6>, w7: Wrapper<P7>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj, P7 extends UnknownObj, P8 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>, w6: Wrapper<P6>, w7: Wrapper<P7>, w8: Wrapper<P8>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj, P7 extends UnknownObj, P8 extends UnknownObj, P9 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>, w6: Wrapper<P6>, w7: Wrapper<P7>, w8: Wrapper<P8>, w9: Wrapper<P9>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj, P7 extends UnknownObj, P8 extends UnknownObj, P9 extends UnknownObj, P10 extends UnknownObj>(w1: Wrapper<P1>, w2: Wrapper<P2>, w3: Wrapper<P3>, w4: Wrapper<P4>, w5: Wrapper<P5>, w6: Wrapper<P6>, w7: Wrapper<P7>, w8: Wrapper<P8>, w9: Wrapper<P9>, w10: Wrapper<P10>): Wrapper<P1 & P2 & P3 & P4 & P5 & P6 & P7 & P8 & P9 & P10>
export function compose<P1 extends UnknownObj, P2 extends UnknownObj, P3 extends UnknownObj, P4 extends UnknownObj, P5 extends UnknownObj, P6 extends UnknownObj, P7 extends UnknownObj, P8 extends UnknownObj, P9 extends UnknownObj, P10 extends UnknownObj>(w1: Wrapper<P1>, w2?: Wrapper<P2> | Falsy, w3?: Wrapper<P3> | Falsy, w4?: Wrapper<P4> | Falsy, w5?: Wrapper<P5> | Falsy, w6?: Wrapper<P6> | Falsy, w7?: Wrapper<P7> | Falsy, w8?: Wrapper<P8> | Falsy, w9?: Wrapper<P9> | Falsy, w10?: Wrapper<P10> | Falsy) {
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
