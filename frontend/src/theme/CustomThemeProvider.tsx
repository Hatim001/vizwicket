import { PropsWithChildren, useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { BASE_THEME } from "./base";

const CustomThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useMemo(() => createTheme(BASE_THEME), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
