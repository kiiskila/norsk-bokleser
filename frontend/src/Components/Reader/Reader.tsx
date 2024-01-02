import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
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
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { isStringEmpty } from "../../utils/helpers";
import { ArrowUpIcon } from "@chakra-ui/icons";

const highlightedStyle = {
  backgroundColor: "teal",
  color: "white",
  borderRadius: "0",
  boxShadow: "0 0 0 0 transparent",
  display: "inline",
  margin: "0",
  lineHeight: "inherit",
  border: "1px solid teal",
};

const normalStyle = {
  backgroundColor: "transparent",
  color: "inherit",
  lineHeight: "inherit",
  display: "inline",
  margin: "0",
  borderRadius: "0",
  border: "1px solid transparent",
};

const TranslateContext = createContext<{
  isTranslateOn: boolean;
  setIsTranslateOn: Dispatch<SetStateAction<boolean>>;
}>({
  isTranslateOn: false,
  setIsTranslateOn: () => {},
});

export const useTranslate = () => useContext(TranslateContext);

function Reader() {
  const [book, setBook] = useState<book>();
  const [chapters, setChapters] = useState<chapter[]>([]);
  const [chosenChapter, setChosenChapter] = useState<string>();
  const [isTranslateOn, setIsTranslateOn] = useState(false);
  const [bodyArray, setBodyArray] = useState<string[]>([]);
  const [preTranslatedText, setPreTranslatedText] = useState("...");
  const [postTranslatedText, setpostTranslatedText] = useState("...");
  const params = useParams();
  const toast = useToast();
  const [selectedWordIndexes, setSelectedWordIndexes] = useState<{
    first: number | null;
    last: number | null;
  }>({ first: null, last: null });
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
      let bodyContent = chapter.body;
      bodyContent = chapter.body
        .split(/( |\n)/)
        .filter((element: string) => element !== " " && element !== "");
      setBodyArray(bodyContent);
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
    if (!isTranslateOn) {
      return;
    }

    const { first, last } = selectedWordIndexes;

    if (first === null) {
      setSelectedWordIndexes({ first: index, last: null });
      setPreTranslatedText(word);
      setpostTranslatedText("...");
      await translateText(word);
    } else if (last === null) {
      if (index !== first) {
        setSelectedWordIndexes({ first, last: index });
        const wordsToTranslate = bodyArray
          .slice(Math.min(first, index), Math.max(first, index) + 1)
          .join(" ");
        setPreTranslatedText(wordsToTranslate);
        setpostTranslatedText("...");
        await translateText(wordsToTranslate);
      } else {
        setSelectedWordIndexes({ first: null, last: null });
        setPreTranslatedText("...");
        setpostTranslatedText("...");
      }
    } else {
      setSelectedWordIndexes({ first: index, last: null });
      setPreTranslatedText(word);
      setpostTranslatedText("...");
      await translateText(word);
    }
  };

  const translateText = async (textToTranslate: string) => {
    if (isStringEmpty(textToTranslate)) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROXY_URL}/translate/${textToTranslate}`
      );
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

  useEffect(() => {
    setSelectedWordIndexes({ first: null, last: null });
    setPreTranslatedText("...");
    setpostTranslatedText("...");
  }, [chosenChapter]);

  return (
    <TranslateContext.Provider value={{ isTranslateOn, setIsTranslateOn }}>
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
          <Card width={["90%", "80%", "75%"]} mb={isTranslateOn ? 160 : 6}>
            <CardBody>
              <Text
                whiteSpace={"pre-line"}
                color={textColor}
                userSelect={isTranslateOn ? "none" : "auto"}
              >
                {bodyArray.map((word, index) => (
                  <span
                    onClick={() => handleClick(word, index)}
                    key={index}
                    style={getStyleForWord(
                      word,
                      index,
                      isTranslateOn,
                      selectedWordIndexes
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
        {!isTranslateOn && (
          <IconButton
            aria-label="Activate Translate Mode"
            icon={<ArrowUpIcon />}
            position="fixed"
            bottom={0}
            left="50%"
            transform="translateX(-50%)"
            zIndex="10"
            backgroundColor="rgba(255, 255, 255, 0.8)"
            roundedBottom={0}
            onClick={() => setIsTranslateOn(true)}
            size={"sm"}
          />
        )}
      </VStack>
    </TranslateContext.Provider>
  );
}

const getStyleForWord = (
  word: string,
  index: number,
  isTranslateOn: boolean,
  selectedWordIndexes: { first: number | null; last: number | null }
) => {
  if (!isTranslateOn) {
    return { ...normalStyle, cursor: "auto" };
  }

  if (word === "\n") {
    return {};
  }

  const { first, last } = selectedWordIndexes;
  const isSingleSelection = first === last || last === null || first === null;
  const isWithinRange =
    first !== null &&
    last !== null &&
    index >= Math.min(first, last) &&
    index <= Math.max(first, last);

  if (isSingleSelection && index === first) {
    return { ...highlightedStyle, borderRadius: "8px", cursor: "pointer" };
  } else if (!isSingleSelection && isWithinRange) {
    let borderRadius = "";
    if (index === first) {
      borderRadius = first < last ? "8px 0 0 8px" : "0 8px 8px 0";
    } else if (index === last) {
      borderRadius = first < last ? "0 8px 8px 0" : "8px 0 0 8px";
    }
    return { ...highlightedStyle, borderRadius, cursor: "pointer" };
  }

  return { ...normalStyle, cursor: "pointer" };
};

export default Reader;
