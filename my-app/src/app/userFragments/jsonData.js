import { getFragmentById, getdifferentType } from "../../../lib/api";
import { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import { userAtom } from "../../../stateManagment/user";
import { useAtom } from "jotai";

export default function JsonData({ id }) {
  const [data, setData] = useState(null);
  const [user] = useAtom(userAtom);
  const [dataType, setDataType] = useState("application/json");

  const fetchData = async (type = "json") => {
    try {
      let fragment;
      if (type === "json") {
        fragment = await getFragmentById(user, id);
        setData(JSON.stringify(fragment, null, 2));
      } else {
     
        fragment = await getdifferentType(user, id, type);
        setData(fragment); // assuming the response is text-based for yaml, yml, and text
      }
    } catch (err) {
      setData("Error fetching data");
      console.error(err);
    }
  };

  useEffect(() => {
    if (id && user) {
      fetchData("json");
    }
  }, [id]);

  if (data === null) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="mb-3">
        <Button variant="primary" onClick={() => fetchData("json")}>
          JSON
        </Button>{" "}
        <Button variant="secondary" onClick={() => fetchData("yaml")}>
          YAML
        </Button>{" "}
        <Button variant="secondary" onClick={() => fetchData("yml")}>
          YML
        </Button>{" "}
        <Button variant="secondary" onClick={() => fetchData("txt")}>
          Text
        </Button>
      </div>
      <pre>{data}</pre>
    </>
  );
}
