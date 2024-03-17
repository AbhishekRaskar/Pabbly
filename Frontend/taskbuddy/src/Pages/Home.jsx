import {
  Box,
  Heading,
  Text,
  StackDivider,
  Button,
  Switch,
} from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <Box style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Heading mb={4} textAlign="center">
        Task <span style={{ color: "crimson" }}> Management</span>
      </Heading>
      <Box
        spacing={4}
        align="stretch"
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <Box mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            Welcome to Your Dashboard!
          </Text>
          <Text>
            Here, you can organize your tasks, track their progress, and stay
            productive.
          </Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Quick Tips:</Text>
          <Text>- Click the Add new Task button to add tasks.</Text>
          <Text>- Click on a task to edit its details.</Text>
          <Text>- Use the toggle to change task status.</Text>
          <Text>- Click the delete button to delete a task.</Text>
        </Box>
        <Box borderTopWidth="1px" borderColor="gray.200" pt={4} mt={4}>
          <Text fontWeight="bold">Upcoming Deadlines:</Text>
          <Text>No upcoming deadlines.</Text>
        </Box>
      </Box>
      <Box mt={6} textAlign="center">
        <Button colorScheme="teal" size="lg">
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
