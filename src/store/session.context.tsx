import * as React from "react";

const SessionContextProvider = React.createContext<{
  session: TSession | undefined;
  setSession: React.Dispatch<React.SetStateAction<TSession | undefined>>;
}>({
  session: undefined,
  setSession: () => {},
});

export function SessionContext({ children }: { children: JSX.Element }) {
  const [session, setSession] = React.useState<TSession>();
  return (
    <SessionContextProvider.Provider value={{ setSession, session }}>
      {children}
    </SessionContextProvider.Provider>
  );
}

export function useSessionContext() {
  const context = React.useContext(SessionContextProvider);
  return context;
}
