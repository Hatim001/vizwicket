import { Routes } from "routes";
import { Suspense } from "react";

import { Loader } from "components";
import { CustomThemeProvider } from "theme";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <CustomThemeProvider>
        <Routes />
      </CustomThemeProvider>
    </Suspense>
  );
}

export default App;
