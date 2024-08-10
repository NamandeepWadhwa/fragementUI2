import { getFragmentById, getdifferentType } from "../../../lib/api";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { userAtom } from "../../../stateManagment/user";
import { useAtom } from "jotai";

export default function TextData({ id }) {
  const [data, setData] = useState(null);
  const [user] = useAtom(userAtom);


  const fetchData = async () => {
    try {
      
     
       const fragment = await getFragmentById(user, id);
        setData(fragment); // Assuming the response is text-based for HTML
      
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
      
       
      <pre>{data}</pre>
    </>
  );
}
