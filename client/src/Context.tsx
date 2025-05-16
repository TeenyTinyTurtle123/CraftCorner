import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// export const UserContext = createContext<User | undefined>(undefined);

type User = {
  id: number;
  username: string;
  password: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

//This is just regular TypeScript standard for children, no need to think deeper on it
type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  //user and setUser state is available globally
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    // value={{ user, setUser }}> gives everyone access to user and setUser
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// this is a hook that lets you call const { user, setUser } = useUser(); from anywhere in the app
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
