export type Callback = Function;
export type Delay = number;
export type TimeOutSetter = Dispatch<
  SetStateAction<ReturnType<typeof setTimeout>>
>;
export type TimeOutRef = ReturnType<typeof setTimeout> | undefined;
