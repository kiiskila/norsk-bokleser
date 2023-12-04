import { useEffect } from "react";

function Home() {
  const fetchBookList = () => {
    fetch("books")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    fetchBookList();
  }, []);

  return (
    <div>
      <p>Home...</p>
    </div>
  );
}

export default Home;
