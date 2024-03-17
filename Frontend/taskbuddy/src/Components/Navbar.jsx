import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
    window.location.href = "/";
    showToast(); 
  };

  const showToast = () => {
    toast({
      title: "Logged out successfully",
      status: "warning",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      bg="#ECEFF1"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
      p={4}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <NavLink to={"/"} style={{ textDecoration: "none" }}>
          <Heading color="crimson" margin="0">
            TaskBuddy
          </Heading>{" "}
          {/* Adjusted margin to 0 */}
        </NavLink>
        <Flex alignItems="center">
          <NavLink
            to={"/tasks"}
            style={({ isActive }) => ({
              color: isActive ? "crimson" : "black",
              fontSize: "18px",
              marginRight: "20px",
              textDecoration: "none",
            })}
            activeStyle={{ color: "crimson" }}
          >
            Tasks
          </NavLink>
          <NavLink
            to={"/contact"}
            style={({ isActive }) => ({
              color: isActive ? "crimson" : "black",
              fontSize: "18px",
              marginRight: "20px",
              textDecoration: "none",
            })}
            activeStyle={{ color: "crimson" }}
          >
            Contact
          </NavLink>
          <NavLink
            to={"/about"}
            style={({ isActive }) => ({
              color: isActive ? "crimson" : "black",
              fontSize: "18px",
              marginRight: "20px",
              textDecoration: "none",
            })}
            activeStyle={{ color: "crimson" }}
          >
            About
          </NavLink>
          <Flex flexDirection="column">
            {userData ? (
              <>
                <Text fontSize="14px" color="black">
                  Hello{" "}
                  <span style={{ color: "#1E88E5", fontWeight: "bold" }}>
                    {userData.user.userName}
                  </span>
                </Text>
                <Button
                  onClick={handleLogout}
                  fontSize="12px"
                  color="crimson"
                  variant="link"
                >
                  Logout
                </Button>
              </>
            ) : (
              <NavLink
                to={"/login"}
                style={{
                  color: "black",
                  fontSize: "18px",
                  textDecoration: "none",
                }}
                activeStyle={{ color: "crimson" }}
              >
                Login
              </NavLink>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
