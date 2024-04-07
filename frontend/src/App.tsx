import { Routes } from "routes";
import { Suspense } from "react";

import { Loader } from "components";
import { CustomThemeProvider } from "theme";
import { AnalyticsProvider } from "hooks/useAnalytics";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <CustomThemeProvider>
        <AnalyticsProvider>
        <Routes />
        </AnalyticsProvider>
      </CustomThemeProvider>
    </Suspense>
  );
}

export default App;
