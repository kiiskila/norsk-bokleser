import { useEffect, useState } from "react";
import ReaderHeader from "./ReaderHeader";
import { book, chapter } from "../../common/types";
import { Select } from "@chakra-ui/react";

function Reader() {
  const [book, setBook] = useState<book>();
  const [chapters, setChapters] = useState<chapter[]>([]);

  const fetchData = () => {
    fetch("")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setBook(data.book);
        setChapters(data.chapters);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ReaderHeader book={book} />
      <p>Body Text{book?.title}</p>
      <Select width={"50%"}>
        {chapters.map(function (chapter, index) {
          return (
            <option key={index} value={chapter.number}>
              {chapter.title || "Chapter: " + chapter.number}
            </option>
          );
        })}
      </Select>
    </>
  );
}

export default Reader;
