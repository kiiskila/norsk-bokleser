import React, { useState } from "react";
import {
  Link,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { LogoWithText } from "./Logo";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

type MenuItemProps = {
  children: React.ReactNode;
  to?: string;
  isLast?: boolean;
};

type MenuToggleProps = {
  toggle: () => void;
  isOpen: boolean;
};

type NavBarContainerProps = {
  children: React.ReactNode;
};

const Navbar: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <LogoLink />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const LogoLink = () => (
  <Link href="/">
    <LogoWithText />
  </Link>
);

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }) => (
  <IconButton
    display={{ base: "block", md: "none" }}
    icon={isOpen ? <CloseIcon boxSize={4} /> : <HamburgerIcon boxSize={6} />}
    onClick={toggle}
    aria-label={isOpen ? "Close menu" : "Open menu"}
    variant="ghost"
  />
);

const MenuItem: React.FC<MenuItemProps> = ({ children, to = "/", ...rest }) => (
  <Link href={to}>
    <Text display="block" {...rest}>
      {children}
    </Text>
  </Link>
);

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
      <MenuItem to="/">Report an Issue</MenuItem>
      <MenuItem to="/">Settings</MenuItem>
      <MenuItem to="/" isLast>
        <Button size="sm" rounded="md" colorScheme="teal">
          Request a Book
        </Button>
      </MenuItem>
    </Stack>
  </Box>
);

const NavBarContainer: React.FC<NavBarContainerProps> = ({
  children,
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
);

export default Navbar;
