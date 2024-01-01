import { Heading, useColorModeValue } from "@chakra-ui/react";
import { book } from "../../common/types";

interface Props {
  book?: book;
}

function ReaderHeader(props: Props) {
  const textColor = useColorModeValue("darkAccent.500", "lightBackground");

  return (
    <Heading textAlign="center" color={textColor}>
      {props.book?.title}
    </Heading>
  );
}

export default ReaderHeader;
