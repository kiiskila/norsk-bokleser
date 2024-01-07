import { useEffect, useState, useCallback } from "react";
import ReaderHeader from "./ReaderHeader";
import { book, chapter } from "../../common/types";
import {
  Card,
  CardBody,
  Select,
  VStack,
  Text,
  useToast,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

/**
 * Reader component: A component for reading books chapter by chapter.
 *
 * This component fetches and displays a book and its chapters based on the URL parameters.
 * It also allows users to type and compare their input with the text of the book.
 */
function Reader() {
  // State declarations
  const [book, setBook] = useState<book>(); // Stores the current book
  const [chapters, setChapters] = useState<chapter[]>([]); // Stores the list of chapters in the current book
  const [chosenChapter, setChosenChapter] = useState<string>(); // Stores the currently selected chapter
  const [bodyArray, setBodyArray] = useState<string[]>([]); // Stores the text of the current chapter split into words
  const [typedWords, setTypedWords] = useState<string[]>([]); // Stores the words typed by the user

  // React Router and Chakra UI hooks
  const params = useParams(); // Access route parameters
  const toast = useToast(); // Toast function for displaying alerts
  const textColor = useColorModeValue("darkAccent.500", "lightBackground"); // Color value based on the current color mode
  const cardBgColor = useColorModeValue("cardWhiteBg", "gray.700"); // Background color value based on the current color mode

  /**
   * Fetches book data based on the book slug from the URL parameters.
   * On successful fetch, updates the book and chapters state.
   * On failure, displays an error toast.
   */
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY_URL}/read/${params.bookSlug}`
      );
      if (!response.ok) {
        throw new Error(
          response.status === 404 ? "Book not found" : "Internal server error"
        );
      }
      const data = await response.json();
      setBook(data.book);
      setChapters(data.chapters);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }, [params.bookSlug, toast]);

  /**
   * Fetches the content of a specific chapter.
   * On successful fetch, updates the bodyArray state.
   * On failure, displays an error toast.
   */
  const fetchChapter = useCallback(async () => {
    const chapterNumber = Number(chosenChapter);
    if (isNaN(chapterNumber) || chapterNumber <= 0) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY_URL}/read/${params.bookSlug}/${chosenChapter}`
      );
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
      }
      const chapter = await response.json();
      setBodyArray(chapter.body.split(/ /));
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }, [chosenChapter, params.bookSlug, toast]);

  /**
   * Event handler for chapter selection changes.
   * Updates the chosenChapter state with the new value.
   */
  const changeChapter = (event: React.FormEvent<HTMLSelectElement>) => {
    setChosenChapter(event.currentTarget.value);
  };

  /**
   * Event handler for typing in the input field.
   * Splits the input text into words and updates the typedWords state.
   */
  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typedText = event.target.value;
    setTypedWords(typedText.split(/\s+/));
  };

  /**
   * Checks if a word typed by the user matches the corresponding word in the book.
   *
   * @param word The word from the book text.
   * @param index The index of the word in the text.
   * @returns True if the user's word matches the book's word; false otherwise.
   */
  const isWordCorrect = (word: string, index: number): boolean => {
    return typedWords.length > index && typedWords[index] === word;
  };

  // Fetch chapter content when the chosen chapter changes
  useEffect(() => {
    fetchChapter();
  }, [fetchChapter]);

  // Fetch book data on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset typed words when the chapter changes
  useEffect(() => {
    setTypedWords([]);
  }, [chosenChapter]);

  // Render function
  return (
    <VStack>
      <ReaderHeader book={book} />
      <Select
        placeholder="Select a chapter"
        width={["80%", "70%", "50%"]}
        onChange={changeChapter}
        value={chosenChapter}
        color={textColor}
      >
        {chapters.map((chapter, index) => (
          <option key={index} value={chapter.number}>
            {chapter.title || `Chapter: ${chapter.number}`}
          </option>
        ))}
      </Select>
      {chosenChapter && !isNaN(Number(chosenChapter)) && (
        <Card width={["90%", "80%", "75%"]} mb={6} bg={cardBgColor}>
          <CardBody>
            <Input
              placeholder="Start typing here..."
              onChange={handleTyping}
              size="lg"
              mb={4}
              value={typedWords.join(" ")}
            />
            <Text whiteSpace={"pre-line"} color={"gray.400"}>
              {bodyArray.map((word, index) => (
                <span
                  key={index}
                  style={{
                    color:
                      typedWords.length > index
                        ? isWordCorrect(word, index)
                          ? "teal"
                          : "red"
                        : "lightgrey",
                  }}
                >
                  {word}{" "}
                </span>
              ))}
            </Text>
          </CardBody>
        </Card>
      )}
    </VStack>
  );
}

export default Reader;
