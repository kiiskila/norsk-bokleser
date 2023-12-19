import { useEffect, useState } from "react";
import ReaderHeader from "./ReaderHeader";
import { book, chapter } from "../../common/types";
import { Card, CardBody, Select, VStack, Text } from "@chakra-ui/react";

function Reader() {
  const [book, setBook] = useState<book>();
  const [chapters, setChapters] = useState<chapter[]>([]);
  const [activeChapter, setActiveChapter] = useState<chapter>();
  const [chosenChapter, setChosenChapter] = useState<string>();

  const fetchData = async () => {
    const response = await fetch("");

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();

    setBook(data.book);
    setChapters(data.chapters);
  };

  useEffect(() => {
    fetchData();
    fetchChapter();
  }, [chosenChapter]);

  function changeChapter(event: React.FormEvent<HTMLSelectElement>) {
    const chapterId: string = event.currentTarget.value;

    setChosenChapter(chapterId);
  }

  async function fetchChapter() {
    if (isNaN(+chosenChapter!)) {
      return;
    }
    const response = await fetch(`${chosenChapter}`);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const chapter = await response.json();

    setActiveChapter(chapter);
  }

  return (
    <VStack>
      <ReaderHeader book={book} />
      <p>Body: {book?.title}</p>
      <Select width={"50%"} onChange={(e) => changeChapter(e)}>
        {chapters.map(function (chapter, index) {
          return (
            <option key={index} value={chapter.number}>
              {chapter.title || "Chapter: " + chapter.number}
            </option>
          );
        })}
      </Select>
      {activeChapter && (
        <Card>
          <CardBody>
            <Text whiteSpace={"pre-line"}>{activeChapter?.body}</Text>
          </CardBody>
        </Card>
      )}
    </VStack>
  );
}

export default Reader;
