import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import PopoverData from "../Component/PopoverData";
import BookDetailsTemplate from "../Component/BookDetailsTemplate";
import ProductCart from "../Component/ProductCart";
import "../Component/ProductCart.css";
import Cart from "../Component/Cart";
import ShippingDetails from "../Component/ShippingDetails";

export default function CartAndCheckout() {
  return (
    <Box h="100vh" pt='90px'>
      <Box mx={{ base: "30px", lg: "60px", xl: "90px" }} mt="40px">
        <Cart />
        <ShippingDetails />
      </Box>
    </Box>
  );
}
