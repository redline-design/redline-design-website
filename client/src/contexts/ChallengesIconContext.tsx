import { createContext, useContext, useState, ReactNode } from 'react';

interface ChallengesIconContextType {
  hasMergedIcons: boolean;
  setHasMergedIcons: (value: boolean) => void;
  isHovering: boolean;
  setIsHovering: (value: boolean) => void;
  resetAnimation: () => void;
}

const ChallengesIconContext = createContext<ChallengesIconContextType | undefined>(undefined);

export function ChallengesIconProvider({ children }: { children: ReactNode }) {
  const [hasMergedIcons, setHasMergedIcons] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const resetAnimation = () => {
    setHasMergedIcons(false);
    setIsHovering(false);
  };

  return (
    <ChallengesIconContext.Provider
      value={{
        hasMergedIcons,
        setHasMergedIcons,
        isHovering,
        setIsHovering,
        resetAnimation,
      }}
    >
      {children}
    </ChallengesIconContext.Provider>
  );
}

export function useChallengesIconContext() {
  const context = useContext(ChallengesIconContext);
  if (!context) {
    throw new Error('useChallengesIconContext must be used within ChallengesIconProvider');
  }
  return context;
}
