
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Community = 'IT' | 'Cybersecurity' | 'Design' | 'Marketing' | 'Finance' | 'Healthcare' | 'Education';

interface User {
  name: string;
  linkedinUrl: string;
  communities: Community[];
  isRegistered: boolean;
  hasSelectedCommunities: boolean;
}

interface UserContextType {
  user: User;
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;
}

const initialUserState: User = {
  name: '',
  linkedinUrl: '',
  communities: [],
  isRegistered: false,
  hasSelectedCommunities: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(initialUserState);

  const updateUser = (data: Partial<User>) => {
    setUser(prevUser => ({ ...prevUser, ...data }));
  };

  const clearUser = () => {
    setUser(initialUserState);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;