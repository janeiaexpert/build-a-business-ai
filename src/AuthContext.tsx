import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  forgotPassword: (email: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, _password: string): boolean => {
    const users: Record<string, { name: string; password: string }> = JSON.parse(localStorage.getItem("auth_users") || "{}");
    const found = users[email];
    if (!found || found.password !== _password) return false;
    const u = { name: found.name, email };
    setUser(u);
    localStorage.setItem("auth_user", JSON.stringify(u));
    return true;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const users: Record<string, { name: string; password: string }> = JSON.parse(localStorage.getItem("auth_users") || "{}");
    if (users[email]) return false;
    users[email] = { name, password };
    localStorage.setItem("auth_users", JSON.stringify(users));
    const u = { name, email };
    setUser(u);
    localStorage.setItem("auth_user", JSON.stringify(u));
    return true;
  };

  const forgotPassword = (_email: string): boolean => {
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
