// SuccessMessage Component
// This component is used to display a success message along with a visual indicator (checkmark icon).
// It is commonly used to indicate the successful completion of an action, like form submission.

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import "../styles/SuccessAnimation.css";

// Props type definition for the component.
type SuccessMessageProps = {
  message?: string; // Optional message string. Default: "Thank you for your submission"
};

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message = "Thank you for your submission",
}) => {
  return (
    <Box className="success-animation-container">
      {/* Success icon (checkmark) */}
      <div className="success-icon">
        <svg viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </div>
      {/* Display the success message */}
      <Text className="success-message">{message}</Text>
    </Box>
  );
};

export default SuccessMessage;
