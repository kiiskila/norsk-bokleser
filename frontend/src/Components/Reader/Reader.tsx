import { useEffect, useState } from "react";
import ReaderHeader from "./ReaderHeader";
import { useParams } from "react-router-dom";
import { book } from "../../common/types";

function Reader() {
  const [book, setBook] = useState<book>();
  const params = useParams();

  const fetchBook = () => {
    fetch("")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setBook(data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <>
      <ReaderHeader book={book} />
      <p>Body Text{book?.title}</p>
    </>
  );
}

export default Reader;
