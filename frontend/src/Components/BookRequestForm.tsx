import React, { useState } from "react";
import {
  Card,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
  Center,
  Heading,
} from "@chakra-ui/react";
import SuccessMessage from "./SuccessMessage";

interface BookRequestFormProps {}

const BookRequestForm: React.FC<BookRequestFormProps> = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [details, setDetails] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/forms/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, details, contactEmail }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your request.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <SuccessMessage
        message={"Your request has been successfully submitted."}
      />
    );
  }

  return (
    <Card p={4} m={4}>
      <Center>
        <Heading mb={4}>Request a Book</Heading>
      </Center>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="author">Author</FormLabel>
            <Input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="details">Details</FormLabel>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="contactEmail">Contact Email</FormLabel>
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit Request
          </Button>
        </VStack>
      </form>
    </Card>
  );
};

export default BookRequestForm;
