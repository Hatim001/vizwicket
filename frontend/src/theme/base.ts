import { ThemeOptions } from "@mui/material";

const BASE_THEME: ThemeOptions = {
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 12
  },
  components: {
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small"
      }
    },
    MuiButton: {
      defaultProps: {
        size: "small",
        variant: "contained",
        color: "primary",
      },
    },
  },
};

export { BASE_THEME };
