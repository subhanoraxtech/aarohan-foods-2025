import React, { createContext, useContext, useState, ReactNode } from 'react';
import { YStack, Spinner, Text } from 'tamagui';

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  setLoading: (loading: boolean, message?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  const setLoading = (loading: boolean, message: string = 'Loading...') => {
    setIsLoading(loading);
    setLoadingMessage(message);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, loadingMessage, setLoading }}>
      {children}
      
      {/* Global Loading Overlay */}
      {isLoading && (
        <YStack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="rgba(0, 0, 0, 0.5)"
          zIndex={9999}
          alignItems="center"
          justifyContent="center"
        >
          <YStack
            backgroundColor="white"
            padding="$6"
            borderRadius="$4"
            alignItems="center"
            justifyContent="center"
            gap="$3"
            minWidth={200}
          >
            <Spinner size="large" color="$orange" />
            <Text
              fontSize="$4"
              fontWeight="500"
              color="$gray10"
              textAlign="center"
            >
              {loadingMessage}
            </Text>
          </YStack>
        </YStack>
      )}
    </LoadingContext.Provider>
  );
};
