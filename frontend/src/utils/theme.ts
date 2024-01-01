import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  primary: {
    100: "#E5FCF1",
    200: "#27EF96",
    300: "#10DE82",
    400: "#0EBE6F",
    500: "#0CA25F",
    600: "#0A864F",
    700: "#086F42",
    800: "#075C37",
    900: "#064C2E",
  },
  accent: "#27ae97",
  lightBackground: "#f8fbf9",
  darkText: "#313849",
  darkAccent: {
    100: "#DEF6F5",
    200: "#BFEDEE",
    300: "#91C7CE",
    400: "#63939D",
    500: "#2F515C",
    600: "#22404F",
    700: "#173142",
    800: "#0E2335",
    900: "#09192C",
  },
};

const customTheme = extendTheme({
  colors,
  styles: {
    global: (props: any) => ({
      "html, body": {
        color: "darkText",
        background: mode("#f8fbf9", "#2F515C")(props),
      },
    }),
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default customTheme;

/*
  color: {
    100: "",
    200: "",
    300: "",
    400: "",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
  },
  */
