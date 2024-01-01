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

function Reader() {
  const [book, setBook] = useState<book>();
  const [chapters, setChapters] = useState<chapter[]>([]);
  const [chosenChapter, setChosenChapter] = useState<string>();
  const [bodyArray, setBodyArray] = useState<string[]>([]);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const params = useParams();
  const toast = useToast();
  const textColor = useColorModeValue("darkAccent.500", "lightBackground");

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

  const changeChapter = (event: React.FormEvent<HTMLSelectElement>) => {
    setChosenChapter(event.currentTarget.value);
  };

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typedText = event.target.value;
    setTypedWords(typedText.split(/\s+/));
  };

  const isWordCorrect = (word: string, index: number): boolean => {
    return typedWords.length > index && typedWords[index] === word;
  };

  useEffect(() => {
    fetchChapter();
  }, [fetchChapter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setTypedWords([]);
  }, [chosenChapter]);

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
        <Card width={["90%", "80%", "75%"]} mb={6}>
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
                          ? "black"
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
