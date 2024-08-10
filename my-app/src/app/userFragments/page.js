"use client";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { userAtom } from "../../../stateManagment/user";
import { getUserFragments, geFragmentById } from "../../../lib/api";
import { Row, Col, Container } from "react-bootstrap";
import  Fragment  from "./fragment";
export default function Page() {
  async function reloadFragments() {
    try {
      const data = await getUserFragments(user);
      setFragments(data);
    } catch (error) {
      console.error("Error fetching fragments:", error);
    }
  }
  const [user, setUser] = useAtom(userAtom);
  const [fragments, setFragments] = useState(null);

  useEffect(() => {
    const fetchFragments = async () => {
      if (user) {
        try {
          const data = await getUserFragments(user);
          setFragments(data);
          if(!data){
            setFragments([]);
            alert("No fragments found");
          }
        } catch (error) {
          console.error("Error fetching fragments:", error);
        }
      }
    };

    fetchFragments();
  }, [user]);

  if (!user || !fragments) {
    return <>Loading...</>;
  }

  if (fragments.fragments.length === 0) {
    return (
     <><h1>You do not have any fragment created</h1></>
    );
  }
  if(fragments.length===0){
    return (
      <><h1>You do not have any fragment created</h1></>
     );
  }

return (
  <Container className="mx-5 my-3">
    <h1>{user.username} Fragments</h1>
   <Row>
    {fragments.fragments.map((fragment, index) => (
      <Fragment key={index} id={fragment} reload={reloadFragments}/>
    ))}
  </Row>
  </Container>
);
}
