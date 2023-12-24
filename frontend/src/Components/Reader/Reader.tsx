import { useEffect, useState, useCallback } from "react";
import ReaderHeader from "./ReaderHeader";
import TranslationBox from "./TranslationBox";
import { book, chapter } from "../../common/types";
import {
  Card,
  CardBody,
  Select,
  VStack,
  Text,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { isStringEmpty } from "../../utils/helpers";

const highlightedStyle = {
  backgroundColor: "teal",
  color: "white",
  borderRadius: "4px",
  boxShadow: "0 0 0 4px teal",
  display: "inline",
  margin: "0 3px",
  lineHeight: "inherit",
};

const normalStyle = {
  backgroundColor: "transparent",
  color: "inherit",
  lineHeight: "inherit",
  display: "inline",
  margin: "0 3px",
};

function Reader() {
  const [book, setBook] = useState<book>();
  const [chapters, setChapters] = useState<chapter[]>([]);
  const [chosenChapter, setChosenChapter] = useState<string>();
  const [isTranslateOn, setIsTranslateOn] = useState(false);
  const [bodyArray, setBodyArray] = useState<string[]>([]);
  const [preTranslatedText, setPreTranslatedText] = useState("Hello World");
  const [postTranslatedText, setpostTranslatedText] = useState("Hei Verden");
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(
    null
  );
  const params = useParams();
  const toast = useToast();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/read/${params.bookSlug}`);
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
      const response = await fetch(`/read/${params.bookSlug}/${chosenChapter}`);
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

  const handleClick = async (word: string, index: number) => {
    if (!isTranslateOn || selectedWordIndex === index) {
      setSelectedWordIndex(null);
      return;
    }
    setSelectedWordIndex(index);
    setPreTranslatedText(word);
    setpostTranslatedText("...");
    await translateText(word);
  };

  const translateText = async (textToTranslate: string) => {
    if (isStringEmpty(textToTranslate)) {
      return;
    }

    try {
      const response = await fetch(`/translate/${textToTranslate}`);
      if (!response.ok) {
        throw new Error(`An error has occurred: ${response.status}`);
      }
      const data = await response.json();
      setpostTranslatedText(data.translatedText);
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
  };

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
        onChange={changeChapter}
        value={chosenChapter}
      >
        {chapters.map((chapter, index) => (
          <option key={index} value={chapter.number}>
            {chapter.title || `Chapter: ${chapter.number}`}
          </option>
        ))}
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
              userSelect={isTranslateOn ? "none" : "auto"}
            >
              {bodyArray.map((word, index) => (
                <span
                  onClick={() => handleClick(word, index)}
                  key={index}
                  style={getStyleForWord(
                    index,
                    isTranslateOn,
                    selectedWordIndex
                  )}
                >
                  {word}{" "}
                </span>
              ))}
            </Text>
          </CardBody>
        </Card>
      )}
      {isTranslateOn && (
        <TranslationBox
          preTranslatedText={preTranslatedText}
          postTranslatedText={postTranslatedText}
        />
      )}
    </VStack>
  );
}

const getStyleForWord = (
  index: number,
  isTranslateOn: boolean,
  selectedWordIndex: number | null
) => {
  const isWordSelected = index === selectedWordIndex;
  return isTranslateOn
    ? {
        cursor: "pointer",
        ...(isWordSelected ? highlightedStyle : normalStyle),
      }
    : normalStyle;
};

export default Reader;
