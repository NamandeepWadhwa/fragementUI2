"use client";
import { useAtom } from "jotai";
import { userAtom } from "../../stateManagment/user";
import { fragmentAtom } from "../../stateManagment/user";
import { getUserFragments, postUserFragments } from "../../lib/api";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Page() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [fragments, setFragments] = useAtom(fragmentAtom);
  const [selectedFormat, setSelectedFormat] = useState("text/plain");
  const [user] = useAtom(userAtom);

  useEffect(() => {
    if (user) {
      const fetcher = async () => {
        const fragments = await getUserFragments(user);
        setFragments(fragments);
      };
      fetcher();
    }
  }, [user, setFragments]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function submitForm(e) {
    e.preventDefault();
      e.stopPropagation(); 

    // Validation: Either text or file, not both
    if (text && file) {
      alert("Please provide either text or an image, not both.");
      return;
    }
    if (!text && !file) {
      alert("Please provide either text or an image.");
      return;
    }

    const format = selectedFormat;
    let data;
    let contentType;

    if (text) {
      data = text; // Text data
      contentType = format;
      try {
        await postUserFragments(user, format, data, contentType);
        alert("Data posted successfully");
      } catch (err) {
        alert("There was an error posting the data");
        console.error(err);
      }
    } else if (file) {
      // File data - read as binary
       const reader = new FileReader();
    reader.onloadend = async () => {
      const binaryData = reader.result; // This is your binary data
      const contentType = file.type || "application/octet-stream";

      try {
        await postUserFragments(user, contentType, binaryData);
        alert("Data posted successfully");
      } catch (err) {
        alert("There was an error posting the data");
        console.error(err);
      }
    };
    reader.readAsArrayBuffer(file);
    }
    else{
      alert("Please provide either text or an image.");
      return;
    }
  }

  if (user) {
    return (
      <Container className="d-flex flex-column my-5">
        <Row className="text-center mb-4">
          <h1>Welcome</h1>
          <p>Hello, {user.username}. Please enter a simple text value or upload an image.</p>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={submitForm} className="text-center">
              
                <Form.Group className="mb-3">
                  <Form.Label>Upload Image:</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>
              
                  <Form.Group className="mb-3">
                    <Form.Label>Simple Text:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter your text here..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Format:</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                    >
                      <option value="text/plain">Plain</option>
                      <option value="text/markdown">Markdown</option>
                      <option value="text/html">HTML</option>
                      <option value="text/csv">CSV</option>
                      <option value="application/json">JSON</option>
                      <option value="application/yaml">YAML</option>
                    </Form.Control>
                  </Form.Group>
                
            
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container className="d-flex flex-column align-items-center my-5">
        <Row className="text-center">
          <h1>Welcome</h1>
          <p>Please log in.</p>
        </Row>
      </Container>
    );
  }
}
