import { Heading } from "@chakra-ui/react";
import { book } from "../../common/types";

interface Props {
  book?: book;
}

function ReaderHeader(props: Props) {
  return <Heading textAlign="center">{props.book?.title}</Heading>;
}

export default ReaderHeader;
