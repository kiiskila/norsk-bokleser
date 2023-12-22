import { Box, Image } from "@chakra-ui/react";

export function LogoDark() {
  return (
    <Box>
      <Image src={"/logo.svg"} alt="bokhjelp logo" w={50} h={50} />
    </Box>
  );
}

export function LogoLight() {
  return (
    <Box>
      <Image src={"/logo-light.svg"} alt="bokhjelp logo" w={50} h={50} />
    </Box>
  );
}

export function LogoWithText() {
  return (
    <Box>
      <Image src={"/bokhjelp.svg"} alt="bokhjelp logo" w={175} h={50} />
    </Box>
  );
}
