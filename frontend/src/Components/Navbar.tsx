// Navbar Component
// This component represents the navigation bar of the application.

import React, { useState } from "react";
import {
  Link,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { LogoWithText, LogoWithTextLight } from "./Logo";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

// Component Types
type MenuItemProps = {
  children: React.ReactNode;
  to?: string;
};

type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};

type NavBarContainerProps = {
  children: React.ReactNode;
  bg: string;
};

const Navbar: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarBg = useColorModeValue("cardWhiteBg", "gray.700");

  // Function to toggle the menu in mobile view
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props} bg={navbarBg}>
      <LogoLink />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

// LogoLink Component: Renders the logo that links to the homepage
const LogoLink = () => {
  const Logo = useColorModeValue(LogoWithText, LogoWithTextLight);
  return (
    <Link href="/">
      <Logo />
    </Link>
  );
};

// MenuToggle Component: Renders a button to toggle the menu in mobile view
const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }) => (
  <IconButton
    display={{ base: "block", md: "none" }}
    icon={isOpen ? <CloseIcon boxSize={4} /> : <HamburgerIcon boxSize={6} />}
    onClick={toggle}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    variant="ghost"
    sx={{
      transition: "all 0.5s ease",
      _hover: {
        transform: "scale(1.10)",
      },
    }}
  />
);

// MenuItem Component: Renders a navigation link
const MenuItem: React.FC<MenuItemProps> = ({ children, to = "/", ...rest }) => (
  <Link href={to}>
    <Text display="block" {...rest}>
      {children}
    </Text>
  </Link>
);

// MenuLinks Component: Renders the list of menu items
const MenuLinks: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
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
      <MenuItem to="/report-an-issue">Report an Issue</MenuItem>
      <MenuItem to="/settings">Settings</MenuItem>
      <MenuItem to="/request-a-book">
        <Button size="sm" rounded="md" colorScheme="teal">
          Request a Book
        </Button>
      </MenuItem>
    </Stack>
  </Box>
);

// NavBarContainer Component: Wrapper for the navigation bar
const NavBarContainer: React.FC<NavBarContainerProps> = ({
  children,
  bg,
  ...props
}) => (
  <Flex
    as="nav"
    align="center"
    justify="space-between"
    wrap="wrap"
    w="100%"
    mb={8}
    p={8}
    bg={bg}
    {...props}
  >
    {children}
  </Flex>
);

export default Navbar;
