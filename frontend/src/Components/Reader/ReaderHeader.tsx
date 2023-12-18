import { book } from "../../common/types";

interface Props {
  book?: book;
}

function ReaderHeader(props: Props) {
  return <h1>{props.book?.title}</h1>;
}

export default ReaderHeader;
