import { getFragmentById, getdifferentType } from "../../../lib/api";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { userAtom } from "../../../stateManagment/user";
import { useAtom } from "jotai";

export default function MarkdownData({ id }) {
  const [data, setData] = useState(null);
  const [user] = useAtom(userAtom);

  const fetchData = async (type = "markdown") => {
    try {
      let fragment;
      if (type === "markdown") {
        fragment = await getFragmentById(user, id);
        setData(fragment); // Assuming the response is text-based for Markdown
      } else {
        fragment = await getdifferentType(user, id, type);
        setData(fragment); // Assuming the response is text-based for HTML or plain text
      }
    } catch (err) {
      setData("Error fetching data");
      console.error(err);
    }
  };

  useEffect(() => {
    if (id && user) {
      fetchData("markdown"); // Fetch Markdown data by default
    }
  }, [id]);

  if (data === null) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="mb-3">
        <Button variant="primary" onClick={() => fetchData("markdown")}>
          Markdown
        </Button>{" "}
        <Button variant="secondary" onClick={() => fetchData("html")}>
          HTML
        </Button>{" "}
        <Button variant="success" onClick={() => fetchData("txt")}>
          TXT
        </Button>
      </div>
      <pre>{data}</pre>
    </>
  );
}
