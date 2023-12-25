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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { isStringEmpty } from "../../utils/helpers";
import { ArrowUpIcon } from "@chakra-ui/icons";

const highlightedStyle = {
  backgroundColor: "teal",
  color: "white",
  borderRadius: "0",
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
  borderRadius: "0",
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
  const [preTranslatedText, setPreTranslatedText] = useState("Hello World");
  const [postTranslatedText, setpostTranslatedText] = useState("Hei Verden");
  const params = useParams();
  const toast = useToast();
  const [selectedWordIndexes, setSelectedWordIndexes] = useState<{
    first: number | null;
    last: number | null;
  }>({ first: null, last: null });

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
    } else if (!isStringEmpty(textToTranslate)) {
      // FOR TESTING ONLY
      setpostTranslatedText(textToTranslate.split("").reverse().join(""));
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
    <TranslateContext.Provider value={{ isTranslateOn, setIsTranslateOn }}>
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
  index: number,
  isTranslateOn: boolean,
  selectedWordIndexes: { first: number | null; last: number | null }
) => {
  const { first, last } = selectedWordIndexes;

  if (!isTranslateOn) {
    return normalStyle;
  }

  let style = { ...normalStyle };

  // Check if the current word is within the selected range
  const isWordSelected =
    (first !== null && last === null && index === first) ||
    (first === null && last !== null && index === last) ||
    (first !== null &&
      last !== null &&
      index >= Math.min(first, last) &&
      index <= Math.max(first, last));

  if (isWordSelected) {
    style = { ...highlightedStyle };

    // Check if it's a single word selection
    if (
      first === last ||
      (first !== null && last === null) ||
      (first === null && last !== null)
    ) {
      style.borderRadius = "8px";
    } else if (first !== null && last !== null) {
      // Apply border radius for the first and last word in a range
      if (first < last) {
        if (index === first) {
          style.borderRadius = "8px 0 0 8px";
        } else if (index === last) {
          style.borderRadius = "0 8px 8px 0";
        }
      } else {
        if (index === last) {
          style.borderRadius = "8px 0 0 8px";
        } else if (index === first) {
          style.borderRadius = "0 8px 8px 0";
        }
      }
    }
  }

  return { cursor: "pointer", ...style };
};

export default Reader;
