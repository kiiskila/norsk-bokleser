import { extendTheme } from "@chakra-ui/react";

/**
 * Custom color palette for the application's theme.
 */
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
  cardWhiteBg: "#FFFAFA",
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

/**
 * Custom theme configuration for the application.
 *
 * Utilizes the Chakra UI's `extendTheme` function to customize the default theme.
 * Defines a custom color scheme and configuration settings for the theme.
 */
const customTheme = extendTheme({
  colors,
  config: {
    initialColorMode: "dark", // Sets the initial color mode to dark.
    useSystemColorMode: false, // Disables the use of the system color mode.
  },
});

export default customTheme;

/**
 * This theme file centralizes the styling configuration for the application,
 * allowing for consistent design and easier manageability of the visual aspects.
 * The color palette is defined under `colors`, with `primary` and `darkAccent`
 * featuring multiple shades for versatile use across components.
 */
