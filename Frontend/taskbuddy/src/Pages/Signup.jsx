import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  VStack,
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://pabbly-be.onrender.com/users/signup",
        formData
      );
      console.log("Server response:", response);

      // Check if the registration was successful
      console.log(response.status);
      if (response.status === 200) {
        setIsOpen(false);
        toast({
          title: "Signup Successful",
          description: "You have successfully signed up!",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        window.location.href = "/login"; // Navigate to the login page
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  console.log(formData);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading fontSize={"4xl"} textAlign={"left"} color={"#DC143C"}>
            Join Us
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box w={"100%"} margin={"auto"} p={"20px"} borderRadius={"10px"}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="age" isRequired>
                  <FormLabel>Age</FormLabel>
                  <Input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <Stack spacing={4} direction="row" justify="center">
                  <Button
                    type="submit"
                    size={"lg"}
                    w={"50%"}
                    bg={"#DC143C"}
                    color={"white"}
                    _hover={{
                      bg: "#DC143C",
                    }}
                  >
                    Sign Up
                  </Button>
                </Stack>
              </VStack>
              <br />
              <Text textAlign="center">
                Already have an account?
                <br />
                <Link
                  style={{
                    textDecoration: "underline",
                    textDecorationColor: "#DC143C",
                    color: "#DC143C",
                  }}
                  to="/login"
                >
                  Login
                </Link>
              </Text>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Signup;
