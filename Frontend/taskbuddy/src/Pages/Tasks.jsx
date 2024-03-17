import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Button,
  Text,
  Container,
  Flex,
  useToast,
  Input,
  Spinner,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";

const Tasks = () => {
  const toast = useToast();
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({
    _id: "",
    title: "",
    description: "",
    dueDate: "",
  });
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const token = userData ? userData.token : null;

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true); // Set isLoggedIn to true if token exists
      fetchData(page);
    }
  }, [token, page]);

  const fetchData = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pabbly-be.onrender.com/tasks?page=${pageNumber}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://pabbly-be.onrender.com/tasks/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchData(page);
      toast({
        title: "Success",
        description: "Task Deleted Successfully",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleEdit = (task) => {
    setEditedTask(task);
    setIsEditMode(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `https://pabbly-be.onrender.com/tasks/update/${editedTask._id}`,
        editedTask,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      fetchData();
      setIsEditMode(false);
      toast({
        title: "Success",
        description: "Task Updated Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error saving edit:", error);
      toast({
        title: "Error",
        description: "Failed to update task",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleAddTask = async () => {
    try {
      await axios.post("https://pabbly-be.onrender.com/tasks/add", newTask, {
        headers: {
          Authorization: token,
        },
      });
      fetchData();
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
      });
      toast({
        title: "Success",
        description: "Task Added Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast({
        title: "Error",
        description: "Failed to add task",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleStatusToggle = async (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    try {
      await axios.patch(
        `https://pabbly-be.onrender.com/tasks/update/${task._id}`,
        { ...task, status: newStatus },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const updatedTasks = tasks.map((t) =>
        t._id === task._id ? { ...t, status: newStatus } : t
      );
      setTasks(updatedTasks);
      toast({
        title: "Success",
        description: `Task status updated to ${newStatus}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      toast({
        title: "Error",
        description: "Failed to update task status",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box>
      {isLoggedIn ? (
        // If user is logged in, show tasks
        <>
          <Heading color={"crimson"}>Your Tasks</Heading>
          <br />
          <Button
            onClick={() => setShowAddTaskForm(!showAddTaskForm)}
            colorScheme="teal"
            size="sm"
          >
            {showAddTaskForm ? "Hide Add Task Form" : "Add New Task"}
          </Button>
          {loading && (
            <Flex justify="center" mt={4}>
              <Spinner size="xl" color="crimson" />
            </Flex>
          )}
          {showAddTaskForm && (
            <Box
              width={{ base: "100%", md: "30%" }}
              boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
              bg="white"
              rounded="lg"
              margin={"auto"}
            >
              <Stack p={6}>
                <Input
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Title"
                  mb={2}
                />
                <Input
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Description"
                  mb={2}
                />
                <Input
                  type="datetime-local"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  placeholder="Due Date"
                  mb={2}
                />
                <Flex justify="center">
                  <Button onClick={handleAddTask} colorScheme="teal" size="sm">
                    Add Task
                  </Button>
                </Flex>
              </Stack>
            </Box>
          )}
          {!token ? (
            <Heading>Please Login To see your Tasks</Heading>
          ) : (
            <Container maxW="7xl" py={16} px={[4, 8, 12]}>
              <SimpleGrid
                columns={[1, 1, 3]} // Set the number of columns based on screen size
                spacing={[4, 4, 8]} // Adjust spacing based on screen size
              >
                {tasks.map((task) => (
                  <Box
                    key={task._id}
                    boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
                    bg="white"
                    rounded="lg"
                    mb={8}
                  >
                    {isEditMode && editedTask._id === task._id ? (
                      <Stack p={6}>
                        <Input
                          value={editedTask.title}
                          onChange={(e) =>
                            setEditedTask({
                              ...editedTask,
                              title: e.target.value,
                            })
                          }
                          placeholder="Title"
                          mb={2}
                        />
                        <Input
                          value={editedTask.description}
                          onChange={(e) =>
                            setEditedTask({
                              ...editedTask,
                              description: e.target.value,
                            })
                          }
                          placeholder="Description"
                          mb={2}
                        />
                        <Input
                          type="datetime-local"
                          value={editedTask.dueDate}
                          onChange={(e) =>
                            setEditedTask({
                              ...editedTask,
                              dueDate: e.target.value,
                            })
                          }
                          placeholder="Due Date"
                          mb={2}
                        />
                        <Flex justify="center">
                          <Button
                            onClick={handleSaveEdit}
                            colorScheme="teal"
                            size="sm"
                          >
                            Save Changes
                          </Button>
                        </Flex>
                      </Stack>
                    ) : (
                      <Stack p={6}>
                        <Heading fontSize="xl" mb={4}>
                          {task.title}
                        </Heading>
                        <Text color="gray.700">{task.description}</Text>
                        <Text color="gray.700">
                          Status:{" "}
                          <Button
                            variant="link"
                            onClick={() => handleStatusToggle(task)}
                            color={task.status === "pending" ? "red" : "green"}
                          >
                            {task.status}
                          </Button>
                        </Text>
                        <Text color="gray.700">
                          Due Date:{" "}
                          {new Date(task.dueDate).toLocaleDateString()}
                        </Text>
                        <Flex justify="center">
                          <Button
                            onClick={() => handleEdit(task)}
                            colorScheme="blue"
                            size="sm"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(task._id)}
                            colorScheme="red"
                            size="sm"
                            ml={2}
                          >
                            Delete
                          </Button>
                        </Flex>
                      </Stack>
                    )}
                  </Box>
                ))}
              </SimpleGrid>
            </Container>
          )}
          <Flex justify="center" mt={4}>
            <Button
              onClick={handlePreviousPage}
              isDisabled={page === 1}
              colorScheme="teal"
              size="md"
              mr={2}
            >
              Prev
            </Button>
            <Button
              onClick={handleNextPage}
              isDisabled={page === totalPages}
              colorScheme="teal"
              size="md"
            >
              Next
            </Button>
          </Flex>
        </>
      ) : (
        // If user is not logged in, show login message
        <Heading>Please Login To see your Tasks</Heading>
      )}
    </Box>
  );
};

export default Tasks;
