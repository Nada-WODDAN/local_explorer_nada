import React, { createContext, useMemo, useState } from "react";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";

export const ThemeContext = createContext({
  switchColorMode: () => {},
});

export function ThemeContextProvider({ children }) {
  const [mode, setMode] = useState("light");

  const switchColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeContext.Provider value={{ switchColorMode }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StyledEngineProvider>
  );
}
