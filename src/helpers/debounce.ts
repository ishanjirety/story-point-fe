import { Dispatch, SetStateAction } from "react";
import { Callback, Delay, TimeOutRef, TimeOutSetter } from "./types";

/**
 * @param {Callback} callback
 * @param {Delay} delay
 * @param {TimeOutSetter} timeOutSetter
 * @param {TimeOutRef} timeOutRef
 * @returns {Function} function
 */
export function debounce(
  callback: Callback,
  delay: Delay,
  timeOutSetter: TimeOutSetter,
  timeOutRef: TimeOutRef
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
): Function {
  return function (...args: any) {
    if (timeOutRef) {
      clearTimeout(timeOutRef);
      timeOutSetter(setTimeout(() => callback.apply(null, args), delay));
    } else {
      timeOutSetter(setTimeout(() => callback.apply(null, args), delay));
    }
  };
}
