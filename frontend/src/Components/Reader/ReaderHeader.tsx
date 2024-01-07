import { Heading, useColorModeValue } from "@chakra-ui/react";
import { book } from "../../common/types";

/**
 * Props for the ReaderHeader component.
 */
interface Props {
  book?: book; // Optional book object
}

/**
 * ReaderHeader displays the title of the book.
 * It uses a Heading component from Chakra UI for the title and adjusts its color
 * based on the current color mode (dark or light).
 *
 * @param {Props} props The properties for the ReaderHeader component.
 * @returns {JSX.Element} A Heading component with the book's title.
 */
function ReaderHeader(props: Props) {
  // Determine the color of the text based on the current color mode
  const textColor = useColorModeValue("darkAccent.500", "lightBackground");

  return (
    <Heading textAlign="center" color={textColor}>
      {props.book?.title} {/* Displays the book title */}
    </Heading>
  );
}

export default ReaderHeader;
