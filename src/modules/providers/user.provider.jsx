import { useState, createContext, useEffect, useContext } from 'react';
import axios from 'axios';

import { GET_USER, getApiUrl } from '../common/consts';
import { showSystemError } from '../common/utils/messages.utils';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      let response = await axios.get(getApiUrl(GET_USER), {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(response.data.data.user);
    } catch (e) {
      setUser(null);
      showSystemError();

      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const reload = () => {
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, logout, reload }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
