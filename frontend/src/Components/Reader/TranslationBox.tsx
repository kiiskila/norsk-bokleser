import React from "react";
import {
  Box,
  Text,
  Divider,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useTranslate } from "./Reader";

/**
 * Props for the TranslationBox component
 */
interface TranslationBoxProps {
  preTranslatedText: string; // Text in the original language
  postTranslatedText: string; // Text in the translated language
}

/**
 * A component that displays a translation box with original and translated text.
 *
 * @param {TranslationBoxProps} props The properties for the component
 */
const TranslationBox: React.FC<TranslationBoxProps> = ({
  preTranslatedText,
  postTranslatedText,
}) => {
  // Context hook to control the translation display state
  const { setIsTranslateOn } = useTranslate();

  // Color mode values for theming
  const bgColor = useColorModeValue("lightBackground", "darkAccent.700");
  const borderColor = useColorModeValue("darkAccent.400", "teal");
  const textColor = useColorModeValue("darkText", "lightBackground");

  // Function to handle the close action
  const handleCloseClick = () => {
    setIsTranslateOn(false);
  };

  return (
    <Box
      // Styling for the translation box
      position="fixed"
      bottom="0"
      width="100%"
      height="20%"
      bg={bgColor}
      p={4}
      borderTop="2px solid"
      borderColor={borderColor}
      roundedTop="12"
      overflow="hidden"
    >
      <CloseButton onClick={handleCloseClick} />
      <TranslationContent
        preTranslatedText={preTranslatedText}
        postTranslatedText={postTranslatedText}
        textColor={textColor}
      />
    </Box>
  );
};

/**
 * A button component for closing the translation box.
 *
 * @param {{ onClick: () => void }} { onClick } Function to execute on click
 */
const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton
    aria-label="Close translation box"
    icon={<CloseIcon />}
    size="xs"
    position="absolute"
    top={2}
    right={2}
    onClick={onClick}
  />
);

/**
 * Component for displaying the content of the translation box.
 *
 * @param {{ preTranslatedText: string, postTranslatedText: string, textColor: string }}
 * Component props including pre and post translated text and text color.
 */
const TranslationContent: React.FC<{
  preTranslatedText: string;
  postTranslatedText: string;
  textColor: string;
}> = ({ preTranslatedText, postTranslatedText, textColor }) => (
  <Box display="flex" height="100%" color={textColor}>
    {/* Box for original text */}
    <Box width="50%" pr={2} display="flex" flexDirection="column">
      <Text fontWeight="bold" mb={1}>
        Norsk
      </Text>
      <Box overflowY="auto" flexGrow={1}>
        <Text>{preTranslatedText}</Text>
      </Box>
    </Box>
    <Divider orientation="vertical" />
    {/* Box for translated text */}
    <Box width="50%" pl={2} display="flex" flexDirection="column">
      <Text fontWeight="bold" mb={1}>
        Engelsk
      </Text>
      <Box overflowY="auto" flexGrow={1}>
        <Text>{postTranslatedText}</Text>
      </Box>
    </Box>
  </Box>
);

export default TranslationBox;
