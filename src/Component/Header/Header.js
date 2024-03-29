import React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  Tooltip,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  AccordionText
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, Icon } from "@chakra-ui/icons";
import { HiOutlineShoppingCart, HiOutlineHeart } from "react-icons/hi";

import SearchBar from "../Body/Search/SearchBar";
import MainContainer from "../GeneralComponent/MainContainer";
import SecondHeader from "./SecondHeader/SecondHeader";
import { dropdownData, genres } from "../../dev-data";
import './SecondHeader/style.css';

export default function Header({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        w="100%"
        h="70px"
        bg="header"
        position="fixed"
        top="0"
        zIndex="banner"
        boxShadow="md"
      >
        <MainContainer>
          <Flex
            w="100%"
            h="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* Hamburger Drawer for Mobile display */}
            <Tooltip label="Menu" bg="teal">
              <Icon
                as={HamburgerIcon}
                boxSize="25px"
                onClick={onOpen}
                display={{ base: "flex", lg: "none" }}
                cursor="pointer"
              />
            </Tooltip>
            <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
              <DrawerOverlay />
              {HamburgerContent()}
            </Drawer>
            {/* Hamburger Menu end */}

            {/* Company Logo */}
            <Box>
              {CompanyLogo()}
            </Box>
            {/* Logo ends here */}

            {/* Search Bar starts here */}
            <Box display={{ base: "none", md: "block", lg: "block" }}>
              <SearchBar 
                size="sm" 
              />
            </Box>
            {/* Search Bar ends */}

            <Flex alignItems="center" h="inherit">
              {/* Navigation Links */}
              <Stack
                h="inherit"
                alignItems="center"
                direction="row"
                display={{ base: "none", lg: "flex" }}
                gap="7"
              >
                {NavbarText("Home", "/")}
                {NavbarText("My Orders", "/order")}
                {NavbarText("Sign In", "/auth")}
              </Stack>
              {/* Navigation Links ends */}

              {/* My WishList */}
              <Tooltip label="My WishList" bg="teal">
                <Link to="/wishlist">
                  <Icon
                    display={{ base: "none", lg: "initial" }}
                    mx="35px"
                    mt="5px"
                    boxSize="35px"
                    _hover={{ color: "link" }}
                    as={HiOutlineHeart}
                  />
                </Link>
              </Tooltip>
              {/* My WishList ends here */}

              {/* Cart Icon */}
              <Tooltip label="My Cart" bg="teal">
                <Link to="/CheckOut">
                  <Icon
                    mt="5px"
                    boxSize="35px"
                    _hover={{ color: "link" }}
                    as={HiOutlineShoppingCart}
                  />
                </Link>
              </Tooltip>
              {/* Cart Icon ends here */}
            </Flex>
          </Flex>
        </MainContainer>
        {/* Sub Header for showing book informations */}
        <SecondHeader/>
        <Box display={{ base: "block", md: "none", lg: "none" }}>
          {/* {
            isVisible && ( */}
              <SearchBar
                size="sm"
              />
            {/* )
          } */}
        </Box>
      </Box>
      {children}
    </>
  );
}

function NavbarText(text, link) {
  return (
    <Link to={link}>
      <Text
        h="23px"
        color="text"
        _hover={{ color: "teal", borderBottom: "2px solid teal" }}
        textTransform="uppercase"
        letterSpacing="tight"
      >
        {text}
      </Text>
    </Link>
  );
}

function AccordionSection(text) {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2 >
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              {text}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {
            dropdownData.map((data) => (
              <Text
                cursor='pointer' 
                color="#363636" 
                className="dropdown__elem"
                pb="2"
              >
                {data.title}
              </Text>
            ))
          }
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

// Company Logo function
export function CompanyLogo() {
  return (
    <Link to="/">
      {/* <Image
      maxW={{ base: "170px", sm: "130px", xl: "150px" }}
      mt="0.5"
      ml={{ base: "30px", sm: "0" }}
      src="../../Logo.png"
    /> */}
      <Text fontSize="2xl" fontWeight="bold" color="teal">
        Pathok Point
      </Text>
    </Link>
  );
}

function HamburgerContent() {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>
        {""}
      </DrawerHeader>
      <DrawerBody>
        <Stack direction="column" fontWeight="bold" gap="3">
          {NavbarText("Home", "/")}
          {NavbarText("My Orders", "/")}
          {NavbarText("Sign In", "/")}
          {NavbarText("My WishList", "/")}
          {
            genres.map((genre) => (
              AccordionSection(genre.title)
            ))
          }
        </Stack>
      </DrawerBody>
    </DrawerContent>
  );
}
