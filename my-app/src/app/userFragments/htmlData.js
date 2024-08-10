import { getFragmentById, getdifferentType } from "../../../lib/api";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { userAtom } from "../../../stateManagment/user";
import { useAtom } from "jotai";

export default function HtmlData({ id }) {
  const [data, setData] = useState(null);
  const [user] = useAtom(userAtom);

  const fetchData = async (type = "html") => {
    try {
      let fragment;
      if (type === "html") {
        fragment = await getFragmentById(user, id);
        setData(fragment); // Assuming the response is text-based for HTML
      } else if (type === "txt") {
        fragment = await getdifferentType(user, id, "txt");
        setData(fragment); // Assuming the response is text-based for plain text
      }
    } catch (err) {
      setData("Error fetching data");
      console.error(err);
    }
  };

  useEffect(() => {
    if (id && user) {
      fetchData("html"); // Fetch HTML data by default
    }
  }, [id]);

  if (data === null) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="mb-3">
        <Button variant="primary" onClick={() => fetchData("html")}>
          HTML
        </Button>{" "}
        <Button variant="secondary" onClick={() => fetchData("txt")}>
          TXT
        </Button>
      </div>
      <pre>{data}</pre>
    </>
  );
}
