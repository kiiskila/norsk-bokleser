import React from "react";
import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";

import { LogoWithText } from "./Logo";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

const Navbar = (props: any) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Link href="/">
        <LogoWithText />
      </Link>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const MenuToggle = ({ toggle, isOpen }: any) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? (
        <CloseIcon boxSize={4} cursor={"pointer"} />
      ) : (
        <HamburgerIcon boxSize={6} cursor={"pointer"} />
      )}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }: any) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }: any) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/">How It works </MenuItem>
        <MenuItem to="/">Features </MenuItem>
        <MenuItem to="/">About Us </MenuItem>
        <MenuItem to="/" isLast>
          <Button
            size="sm"
            rounded="md"
            color={[
              "darkAccent.500",
              "darkAccent.500",
              "lightBackground",
              "lightBackground",
            ]}
            bg={[
              "lightBackground",
              "lightBackground",
              "darkAccent.500",
              "darkAccent.500",
            ]}
            _hover={{
              bg: [
                "lightBackground",
                "lightBackground",
                "darkAccent.700",
                "darkAccent.700",
              ],
            }}
          >
            Create Account
          </Button>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }: any) => {
  return (
    <Box backgroundColor={"lightBackground"} minH={"24vh"}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={8}
        bg={["darkAccent.300", "darkAccent.300", "transparent", "transparent"]}
        color={[
          "lightBackground",
          "lightBackground",
          "darkAccent.500",
          "darkAccent.500",
        ]}
        {...props}
      >
        {children}
      </Flex>
    </Box>
  );
};

export default Navbar;
