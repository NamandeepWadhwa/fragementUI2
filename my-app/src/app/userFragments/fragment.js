import { getFragmentInfo } from "../../../lib/api";
import { Col,Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { userAtom } from "../../../stateManagment/user";
import { useAtom } from "jotai";
import JsonData from "./jsonData";
import {Button} from "react-bootstrap";
import {deleteFragment} from "../../../lib/api";
import { useRouter } from "next/navigation";
import HtmlData from "./htmlData";
import MarkdownData from "./markdown";
import CsvData from "./csvData";
import YamlData from "./yamlData";
import ImagePage from "./imageData";
import TextData from "./textData";

export default function Fragment({ id , reload}) {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/userFragments/${id}`);

  };
  const handleDelete = async () => {
    try {
      await deleteFragment(user, id);
      alert("Fragment deleted successfully");
      reload();
    } catch (error) {
      
      console.error("Error deleting fragment:", error);
      alert("Error deleting fragment");
    }
  };
  const [user] = useAtom(userAtom);
  
  const [dataType, setDataType] = useState("");
  const [fragment, setFragment] = useState(null);

  useEffect(() => {
    if (id && user) {
      const fetcher = async () => {
        // Corrected function name
        
        const fragmentInfo = await getFragmentInfo(user,id);
        
        setDataType(fragmentInfo.fragment.type);
      
        setFragment(fragmentInfo);
      };
      fetcher();
    }
  }, [id]);
  if (!fragment) {
    return <>Loading...</>;
  }

  return (
    
      <div className="m-5 w-96">
        <p>Fragment ID: {fragment.fragment.id}</p>
        <p>Fragment Type: {fragment.fragment.type}</p>
        <p>Fragment Size: {fragment.fragment.size}</p>
        {dataType === "application/json" && <JsonData id={id} />}
        {dataType === "text/html" && <HtmlData id={id} />}
        {dataType === "text/markdown" && <MarkdownData id={id} />}
        {dataType === "text/csv" && <CsvData id={id} />}
        {dataType === "application/yaml" && <YamlData id={id} />}
        {dataType.includes("image") && <ImagePage id={id} />}
        {dataType === "text/plain" && <TextData id={id} />}
        <p>Fragment Created at: {fragment.fragment.created}</p>
        <p>Fragment updated at: {fragment.fragment.updated}</p>
        <Button variant="danger" className="mx-2" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Edit
        </Button>
      </div>
    
  );
}
