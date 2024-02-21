import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#343541",
          backgroundImage: "none",
        },
      },
    },
    //     MuiAccordion: {
    //         styleOverrides: {
    //             theme: {
    //                 paper: {
    //                     backgroundColor: "#343541",
    //                     backgroundImage: "none"
    //                 }
    //             }
    //         }
    //     }
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#c5c5d1",
    },
    secondary: {
      main: "#0FA47F",
    },
    background: {
      paper: "#25262C",
      default: "#25262C",
    },
  },
});

// --grey-01: #343541;
// --grey-02: #444654;
// --grey-03: #9a9b9f;
//
// --grey-04: #c5c5d1;
//
// --grey-input: #4f505a;
// --grey-input-focused: #585863;
// --error-05: #dd524c;
// --error-05-trans: rgba(221, 82, 76, 0.1);
