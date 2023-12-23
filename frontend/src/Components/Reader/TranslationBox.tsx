// TranslationBox.tsx
import React from "react";
import { Box, Text, Divider } from "@chakra-ui/react";

type TranslationBoxProps = {
  preTranslatedText: string;
  postTranslatedText: string;
};

const TranslationBox: React.FC<TranslationBoxProps> = ({
  preTranslatedText,
  postTranslatedText,
}) => {
  return (
    <Box
      position="fixed"
      bottom="0"
      width="100%"
      height="20%"
      bg="darkAccent.300"
      p={4}
      outline={"2px solid"}
      roundedTop={12}
    >
      <Text>{preTranslatedText}</Text>
      <Divider orientation="horizontal" />
      <Text>{postTranslatedText}</Text>
    </Box>
  );
};

export default TranslationBox;
