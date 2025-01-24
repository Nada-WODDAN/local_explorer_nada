import React, { useContext, useMemo } from "react";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { ThemeContext } from "./Theme";

function MenuDarkLight() {
  const theme = useTheme();
  const { switchColorMode } = useContext(ThemeContext);

  const activateName = useMemo(
    () => (theme.palette.mode === "dark" ? "Light" : "Dark"),
    [theme]
  );

  return (
    <Box>
      <Tooltip title={`Activate ${activateName} Mode`}>
        <IconButton
          onClick={switchColorMode}
          sx={{
            p: 1,
            border: `1px ${theme.palette.text.disabled} solid`,
          }}
          size="large"
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined color="action" />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default MenuDarkLight;
