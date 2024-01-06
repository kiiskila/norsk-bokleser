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
  Heading,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import SuccessMessage from "./SuccessMessage";

interface ReportIssueFormProps {}

const ReportIssueForm: React.FC<ReportIssueFormProps> = () => {
  const [details, setDetails] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const cardBgColor = useColorModeValue("cardWhiteBg", "gray.700");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY_URL}/forms/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ details, contactEmail }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your report.",
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
        message={"Your report has been successfully submitted."}
      />
    );
  }

  return (
    <Card p={4} m={4} bg={cardBgColor}>
      <Center>
        <Heading mb={4}>Report an Issue</Heading>
      </Center>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
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
            Submit Report
          </Button>
        </VStack>
      </form>
    </Card>
  );
};

export default ReportIssueForm;
