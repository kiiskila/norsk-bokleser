import React from "react";
import { Box, Text, Divider, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useTranslate } from "./Reader";

type TranslationBoxProps = {
  preTranslatedText: string;
  postTranslatedText: string;
  isTranslateOn: boolean;
};

const TranslationBox: React.FC<TranslationBoxProps> = ({
  preTranslatedText,
  postTranslatedText,
}) => {
  const { setIsTranslateOn } = useTranslate();

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
      <IconButton
        aria-label="Close translation box"
        icon={<CloseIcon />}
        size="xs"
        position="absolute"
        top={2}
        right={2}
        onClick={() => setIsTranslateOn(false)}
      />
      <Text>{preTranslatedText}</Text>
      <Divider orientation="horizontal" />
      <Text>{postTranslatedText}</Text>
    </Box>
  );
};

export default TranslationBox;
