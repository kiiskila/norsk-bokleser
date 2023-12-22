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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function Reader() {
  const [book, setBook] = useState<book>();
  const [chapters, setChapters] = useState<chapter[]>([]);
  const [activeChapter, setActiveChapter] = useState<chapter>();
  const [chosenChapter, setChosenChapter] = useState<string>();
  const params = useParams();
  const toast = useToast();

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

    setActiveChapter(chapter);
  }, [chosenChapter, params.bookSlug]);

  useEffect(() => {
    fetchChapter();
  }, [fetchChapter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <VStack backgroundColor={"#f8fbf9"}>
      <ReaderHeader book={book} />
      <Select
        placeholder="Select a chapter"
        width={"50%"}
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
      {chosenChapter && !isNaN(Number(chosenChapter)) && (
        <Card width={"60%"} mb={6}>
          <CardBody>
            <Text whiteSpace={"pre-line"} color={"#313849"}>
              {activeChapter?.body}
            </Text>
          </CardBody>
        </Card>
      )}
    </VStack>
  );
}

export default Reader;
