import React, { useState, useEffect, useContext, ReactNode } from 'react';

const OnlineStatusContext = React.createContext(true);

export const OnlineStatusProvider = ({ children }: { children: ReactNode }) => {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener('offline', () => {
      setOnlineStatus(false);
    });
    window.addEventListener('online', () => {
      setOnlineStatus(true);
    });

    return () => {
      window.removeEventListener('offline', () => {
        setOnlineStatus(false);
      });
      window.removeEventListener('online', () => {
        setOnlineStatus(true);
      });
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={onlineStatus}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOnlineStatus = () => {
  const store = useContext(OnlineStatusContext);
  return store;
};
