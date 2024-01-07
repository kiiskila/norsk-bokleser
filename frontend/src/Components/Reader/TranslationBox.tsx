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

interface TranslationBoxProps {
  preTranslatedText: string;
  postTranslatedText: string;
}

const TranslationBox: React.FC<TranslationBoxProps> = ({
  preTranslatedText,
  postTranslatedText,
}) => {
  const { setIsTranslateOn } = useTranslate();
  const bgColor = useColorModeValue("lightBackground", "darkAccent.700");
  const borderColor = useColorModeValue("darkAccent.400", "teal");
  const textColor = useColorModeValue("darkText", "lightBackground");

  const handleCloseClick = () => {
    setIsTranslateOn(false);
  };

  return (
    <Box
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

const TranslationContent: React.FC<{
  preTranslatedText: string;
  postTranslatedText: string;
  textColor: string;
}> = ({ preTranslatedText, postTranslatedText, textColor }) => (
  <Box display="flex" height="100%" color={textColor}>
    <Box width="50%" pr={2} display="flex" flexDirection="column">
      <Text fontWeight="bold" mb={1}>
        Norsk
      </Text>
      <Box overflowY="auto" flexGrow={1}>
        <Text>{preTranslatedText}</Text>
      </Box>
    </Box>
    <Divider orientation="vertical" />
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
