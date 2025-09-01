import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Snackbar from './Snackbar';

interface SnackbarState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  duration?: number;
}

interface SnackbarContextType {
  showSnackbar: (message: string, type?: 'success' | 'error' | 'warning' | 'info', duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    type: 'info',
    isVisible: false,
    duration: 5000
  });

  const showSnackbar = useCallback((
    message: string, 
    type: 'success' | 'error' | 'warning' | 'info' = 'info', 
    duration: number = 5000
  ) => {
    setSnackbar({
      message,
      type,
      isVisible: true,
      duration
    });
  }, []);

  const showSuccess = useCallback((message: string, duration: number = 5000) => {
    showSnackbar(message, 'success', duration);
  }, [showSnackbar]);

  const showError = useCallback((message: string, duration: number = 5000) => {
    showSnackbar(message, 'error', duration);
  }, [showSnackbar]);

  const showWarning = useCallback((message: string, duration: number = 5000) => {
    showSnackbar(message, 'warning', duration);
  }, [showSnackbar]);

  const showInfo = useCallback((message: string, duration: number = 5000) => {
    showSnackbar(message, 'info', duration);
  }, [showSnackbar]);

  const hideSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, isVisible: false }));
  }, []);

  const contextValue: SnackbarContextType = {
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideSnackbar
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isVisible={snackbar.isVisible}
        onClose={hideSnackbar}
        duration={snackbar.duration}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export default SnackbarContext;
