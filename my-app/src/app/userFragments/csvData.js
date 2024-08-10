import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { userAtom } from "../../../stateManagment/user";
import { useAtom } from "jotai";
import { getFragmentById, getdifferentType } from "../../../lib/api";

export default function CsvData({ id }) {
  const [data, setData] = useState(null);
  const [user] = useAtom(userAtom);

  const fetchData = async (extension = "csv") => {
    try {
      let fragment;
      if (extension === "csv") {
        fragment = await getFragmentById(user, id);
        setData(fragment); // Assuming the response is CSV data
      } else {
        fragment = await getdifferentType(user, id, extension);
        setData(fragment); // Assuming the response is the converted data
      }
    } catch (err) {
      setData("Error fetching data");
      console.error(err);
    }
  };

  useEffect(() => {
    if (id && user) {
      fetchData(); // Fetch CSV data by default
    }
  }, [id, user]);

  if (data === null) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="mb-3">
        <Button variant="primary" onClick={() => fetchData("csv")}>
          CSV
        </Button>{" "}
        <Button variant="secondary" onClick={() => fetchData("txt")}>
          Text
        </Button>{" "}
        <Button variant="success" onClick={() => fetchData("json")}>
          JSON
        </Button>
      </div>
      <pre>{data}</pre>
    </>
  );
}
