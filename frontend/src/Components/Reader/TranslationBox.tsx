import React from "react";
import { Box, Text, Divider, IconButton } from "@chakra-ui/react";
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

  const handleCloseClick = () => {
    setIsTranslateOn(false);
  };

  return (
    <Box
      position="fixed"
      bottom="0"
      width="100%"
      height="20%"
      bg="darkAccent.300"
      p={4}
      outline="2px solid"
      roundedTop="12"
      overflow="hidden"
    >
      <CloseButton onClick={handleCloseClick} />
      <TranslationContent
        preTranslatedText={preTranslatedText}
        postTranslatedText={postTranslatedText}
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
}> = ({ preTranslatedText, postTranslatedText }) => (
  <Box display="flex" height="100%">
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
