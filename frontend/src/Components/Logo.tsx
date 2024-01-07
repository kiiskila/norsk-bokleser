// Logo Components
// This file contains various logo components used throughout the application.
// Each component renders a logo image with specified dimensions and alt text.

import { Box, Image } from "@chakra-ui/react";

// LogoDark Component
// Displays the dark version of the logo.
// Typically used in light mode of the application.
export function LogoDark() {
  return (
    <Box>
      <Image src={"/logo.svg"} alt="bokhjelp logo" w={50} h={50} />
    </Box>
  );
}

// LogoLight Component
// Displays the light version of the logo.
// Ideally used in dark mode of the application to ensure visibility.
export function LogoLight() {
  return (
    <Box>
      <Image src={"/logo-light.svg"} alt="bokhjelp logo" w={50} h={50} />
    </Box>
  );
}

// LogoWithText Component
// Renders the logo accompanied by text.
// This version is more descriptive and can be used in places where brand identity needs emphasis.
export function LogoWithText() {
  return (
    <Box>
      <Image src={"/bokhjelp.svg"} alt="bokhjelp logo" w={175} h={50} />
    </Box>
  );
}

// LogoWithTextLight Component
// A light variant of the LogoWithText.
// This version stands out in dark mode environments.
export function LogoWithTextLight() {
  return (
    <Box>
      <Image src={"/bokhjelp-light.svg"} alt="bokhjelp logo" w={175} h={50} />
    </Box>
  );
}
