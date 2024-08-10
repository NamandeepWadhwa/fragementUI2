"use client";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../../../stateManagment/user";
import { getFragmentById, getFragmentInfo } from "../../../../lib/api";
import { Form, Button,Container} from "react-bootstrap";
import {updateFragment} from "../../../../lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page({ params }) {
  const [imageUrl, setImageUrl]= useState("");
  const [fileData, setFileData] = useState(null);
  const router = useRouter();
  const handleSubmit = async (e) => {
 
    e.preventDefault();
    console.log(fileData);
    try {
      if(dataType.includes('image')){
        console.log(dataType);
        await updateFragment(user,dataType,params.id,fileData);
        router.push("/userFragments");
        
      }
      else{
      await updateFragment(user,dataType, id, data);
     
      router.push("/userFragments");
      }
    } catch (error) {
      console.error("Error updating fragment:", error);
      alert("Error updating fragment  ");
    
  };
  };
  const [user] = useAtom(userAtom);
  const id = params.id; // Access dynamic route parameter
  const [data, setData] = useState("");
  const [dataType, setDataType] = useState("");

  useEffect(() => {
    if (user && id) {
      const fetcher = async () => {
        try {
          const fragment = await getFragmentInfo(user, id);
          let data = await getFragmentById(user, id);
          if (fragment.fragment.type === "application/json") {
            data = JSON.stringify(data, null, 2);
            
          }
          if(fragment.fragment.type.includes('image')){
            setImageUrl(URL.createObjectURL(data));
            setFileData(data);

          }
          else{
            setData(data);
          }
        
          
          setDataType(fragment.fragment.type);
        } catch (err) {
          setData("Error fetching data");
          console.error(err);
        }
      };
      fetcher();
    }
  }, [id, user]);

  const handleChange = (e) => {
    setData(e.target.value); // Update the state with the new input value
  };
  const handleFileChange = (e) => {
    setFileData(e.target.files[0]); // Update the state with the new input value
    setDataType(e.target.files[0].type);
    
  };

  if (data === "" && dataType === "") {
    return <>Loading...</>;
  }

  return (
    <>
    <Container>
      <h1>Editing Fragment  </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter the new fragment data</Form.Label>
          { (dataType.includes('text') || dataType.includes('application/'))&&<Form.Control
            type="text"
            placeholder="Enter data"
            value={data}
            onChange={handleChange} // Handle the change event
          />}
          {dataType.includes('image') && <><br></br><Image width={200} height={200} src={imageUrl} alt="image" />
          <Form.Control
            type="file"
            placeholder="Enter data"
            onChange={handleFileChange}/> 
          </>}
        </Form.Group>
        <Button variant="primary" type="submit" >
          Submit
        </Button>
      </Form>
      </Container>
    </>
  );
}
