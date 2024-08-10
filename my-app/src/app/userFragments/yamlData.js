import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { userAtom } from "../../../stateManagment/user";
import { useAtom } from "jotai";
import { getFragmentById, getdifferentType } from "../../../lib/api";

export default function YamlData({ id }) {
  const [data, setData] = useState(null);
  const [user] = useAtom(userAtom);

  const fetchData = async (extension = "yaml") => {
    console.log(extension);
    try {
      let fragment;
      if (extension === "yaml") {
        fragment = await getdifferentType(user, id,extension);
        setData(fragment); 
        console.log(fragment);
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
        <Button variant="primary" onClick={() => fetchData("yaml")}>
          Yaml
        </Button>{" "}
        <Button variant="secondary" onClick={() => fetchData("txt")}>
          Text
        </Button>{" "}
       
      </div>
      <pre>{data}</pre>
    </>
  );
}
