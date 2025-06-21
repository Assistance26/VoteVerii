import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [currentElection, setCurrentElection] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  return (
    <AppContext.Provider value={{
      currentElection,
      setCurrentElection,
      userProfile,
      setUserProfile
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}