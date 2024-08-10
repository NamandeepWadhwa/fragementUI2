import { useState, useEffect } from "react";
import { getFragmentById,getdifferentType } from "../../../lib/api"; // Function to fetch image data
import { userAtom } from "../../../stateManagment/user";
import { useAtom } from "jotai";
import { Button } from "react-bootstrap";


export default function ImagePage({id}) {


  const [imageUrl, setImageUrl] = useState("");
  const [user] = useAtom(userAtom);
  const fetchData = async (extension = "png") => {
    try{
      setImageUrl("");
      const image= await getdifferentType(user,id,extension);

      
      setImageUrl(URL.createObjectURL(image));
      alert("Image fetched successfully");
    }
    catch (err) {
      console.error(err);
      alert("Error fetching image");

  };
}

  useEffect(() => {
    if (id && user) {
      const fetchImage = async () => {
        try {
          const image = await getFragmentById(user,id); 
          // Fetch image data from API
         
          const url = URL.createObjectURL(image);

          // Set the URL for the image
          setImageUrl(url);
          
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      };
      fetchImage();
    }
  }, [id]);

  if (!imageUrl) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Button variant="primary" onClick={() => fetchData("jpeg")}>
        Jpeg
      </Button>{" "}
      <Button variant="primary" onClick={() => fetchData("png")}>
        Png
      </Button>{" "}
      <Button variant="primary" onClick={() => fetchData("gif")}>
        Gif
      </Button>{" "}
      <Button variant="primary" onClick={() => fetchData("webp")}>
      Webp
      </Button>{" "}
      <h1>Image Viewer</h1>
      <img
        src={imageUrl}
        alt="Uploaded"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}
