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
  textColor: string;
};

const Navbar: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const textColor = useColorModeValue("darkAccent.500", "lightBackground");

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props} textColor={textColor}>
      <LogoLink />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const LogoLink = () => {
  const Logo = useColorModeValue(LogoWithText, LogoWithTextLight);
  return (
    <Link href="/">
      <Logo />
    </Link>
  );
};

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

const NavBarContainer: React.FC<NavBarContainerProps> = ({
  children,
  textColor,
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
    color={["lightBackground", "lightBackground", textColor, textColor]}
    {...props}
  >
    {children}
  </Flex>
);

export default Navbar;
