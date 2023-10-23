import { createContext, useState, ReactNode } from "react";
import { Dispatch, SetStateAction } from 'react';

export type UserContextType = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};


export const UserContext = createContext<UserContextType>({ token: null, setToken: () => {} });

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
