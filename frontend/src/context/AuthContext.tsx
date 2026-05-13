import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
  user: {
    username: string;
    token: string;
    role: string;
  },
  token: string
};

type AuthContextType = {
  user: User | null;
  isAdmin: boolean | false;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [logged, setLogged] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setLogged(JSON.parse(stored));
  }, []);

  const login = (userData: User) => {
    setLogged(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Back to HOME
    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  };

  const logout = () => {
    setLogged(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user: logged,
        isAdmin: (logged?.user?.role == 'admin') ? true : false,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}