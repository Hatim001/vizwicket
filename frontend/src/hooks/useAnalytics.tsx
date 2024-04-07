import React, { createContext, useContext, ReactNode, useState } from "react";

interface AnalyticsState {
  match: any;
  summary: any;
  selectedTeam: string;
  chartConfigurations: any;
  showAppLoader: boolean;
  showAnalyticsLoader: boolean;
}

interface AnalyticsContextType extends AnalyticsState {
  setAnalytics: (analytics: Partial<AnalyticsState>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
}) => {
  const [analytics, setAnalyticsState] = useState<AnalyticsState>({
    match: {},
    summary: {},
    selectedTeam: "",
    chartConfigurations: {
      axesTransitionDuration: 1500,
      barTransitionDuration: 1500,
    },
    showAppLoader: false,
    showAnalyticsLoader: false,
  });

  const setAnalytics = (newAnalytics: Partial<AnalyticsState>) => {
    setAnalyticsState((currentAnalytics) => ({
      ...currentAnalytics,
      ...newAnalytics,
    }));
  };

  return (
    <AnalyticsContext.Provider value={{ ...analytics, setAnalytics }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within a AnalyticsProvider");
  }
  return context;
};
