import React from "react";
import { Box, Text } from "@chakra-ui/react";
import "../styles/SuccessAnimation.css";

type SuccessMessageProps = {
  message?: string;
};

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message = "Thank you for your submission",
}) => {
  return (
    <Box className="success-animation-container">
      <div className="success-icon">
        <svg viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </div>
      <Text className="success-message">{message}</Text>
    </Box>
  );
};

export default SuccessMessage;
