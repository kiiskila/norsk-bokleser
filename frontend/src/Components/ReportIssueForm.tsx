// ReportIssueForm Component
// This component provides a form for users to report issues they encounter.

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
  useColorModeValue,
} from "@chakra-ui/react";
import SuccessMessage from "./SuccessMessage";

interface ReportIssueFormProps {}

const ReportIssueForm: React.FC<ReportIssueFormProps> = () => {
  // State variables for form fields and submission status.
  const [details, setDetails] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast for notifications.
  const toast = useToast();

  // Dynamic background color for the card component based on the theme.
  const cardBgColor = useColorModeValue("cardWhiteBg", "gray.700");

  // Function to handle the submission of the issue report.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send a POST request with issue details and contact email.
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
      // Display error message if submission fails.
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

  // Display success message upon successful submission.
  if (isSubmitted) {
    return (
      <SuccessMessage
        message={"Your report has been successfully submitted."}
      />
    );
  }

  // Rendering of the issue report form.
  return (
    <Card p={4} m={4} bg={cardBgColor}>
      <Center>
        <Heading mb={4}>Report an Issue</Heading>
      </Center>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          {/* Form fields for issue details and contact email */}
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
          {/* Submit button */}
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
