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
  Button,
  Box,
  Divider,
  Tag,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function Reader() {
  const [book, setBook] = useState<book>();
  const [chapters, setChapters] = useState<chapter[]>([]);
  const [activeChapter, setActiveChapter] = useState<chapter>();
  const [chosenChapter, setChosenChapter] = useState<string>();
  const [isTranslateOn, setIsTranslateOn] = useState(false);
  const [bodyArray, setBodyArray] = useState([]);
  const [preTranslatedText, setPreTranslatedText] = useState("Hello World");
  const [postTranslatedText, setpostTranslatedText] = useState("Hei Verden");
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(
    null
  );
  const params = useParams();
  const toast = useToast();

  const highlightedStyle = {
    backgroundColor: "teal", // Or any other contrasting color
    color: "white",
    cursor: "pointer",
    borderRadius: "4px", // Adds rounded corners
    boxShadow: "0 0 0 4px teal", // Simulates padding with the same color as the background
    display: "inline", // Keeps the word inline
    margin: "0 3px", // Adds a slight margin to avoid the boxShadow being cut off
    lineHeight: "inherit", // Ensures consistent line height
  };

  const normalStyle = {
    backgroundColor: "transparent",
    color: "inherit",
    cursor: "pointer",
    lineHeight: "inherit",
    display: "inline",
    margin: "0 3px", // Keep the margin consistent
  };

  const fetchData = useCallback(async () => {
    const response = await fetch(`/read/${params.bookSlug}`);
    const resMessage =
      response.status === 404 ? "Book not found" : "Internal server error";

    if (!response.ok) {
      toast({
        title: "Error",
        description: resMessage,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      const data = await response.json();
      setBook(data.book);
      setChapters(data.chapters);
    }
  }, [params.bookSlug, toast]);

  function changeChapter(event: React.FormEvent<HTMLSelectElement>) {
    const chapterId: string = event.currentTarget.value;

    setChosenChapter(chapterId);

    if (chapterId === "") {
      setActiveChapter(undefined);
    }
  }

  const fetchChapter = useCallback(async () => {
    if (isNaN(+chosenChapter!)) {
      return;
    }
    const response = await fetch(`/read/${params.bookSlug}/${chosenChapter}`);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const chapter = await response.json();
    const extractWords = chapter.body.split(/ /);

    setActiveChapter(chapter);
    setBodyArray(extractWords);
  }, [chosenChapter, params.bookSlug]);

  const handleClick = (word: string, index: number) => {
    if (selectedWordIndex === index) {
      setSelectedWordIndex(null);
      setPreTranslatedText("");
    } else {
      setSelectedWordIndex(index);
      setPreTranslatedText(word);
    }
    translateText(word);
  };

  function translateText(textToTranslate: string) {
    setpostTranslatedText(textToTranslate.split("").reverse().join(""));
  }

  useEffect(() => {
    fetchChapter();
  }, [fetchChapter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <VStack>
      <ReaderHeader book={book} />
      <Select
        placeholder="Select a chapter"
        width={["80%", "70%", "50%"]}
        onChange={(e) => changeChapter(e)}
        value={chosenChapter}
      >
        {chapters.map(function (chapter, index) {
          return (
            <option key={index} value={chapter.number}>
              {chapter.title || "Chapter: " + chapter.number}
            </option>
          );
        })}
      </Select>
      <Button onClick={() => setIsTranslateOn(!isTranslateOn)}>
        Translate Mode
      </Button>
      {chosenChapter && !isNaN(Number(chosenChapter)) && (
        <Card width={["90%", "80%", "75%"]} mb={isTranslateOn ? 160 : 6}>
          <CardBody>
            <Text
              whiteSpace={"pre-line"}
              color={"darkText"}
              userSelect={"none"}
            >
              {bodyArray.map((word: string, index: number) => {
                const isWordSelected = index === selectedWordIndex;
                const wordStyle = isWordSelected
                  ? highlightedStyle
                  : normalStyle;

                return (
                  <span
                    onClick={() => handleClick(word, index)}
                    key={index}
                    id={`${index}`}
                    style={wordStyle}
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </Text>
          </CardBody>
        </Card>
      )}
      {isTranslateOn && (
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
          <Text> {postTranslatedText}</Text>
        </Box>
      )}
    </VStack>
  );
}

export default Reader;
