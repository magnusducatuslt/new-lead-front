import React, { useState, useRef } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const URL = "http://localhost:7890";

function FileUpload({ id, update }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const ref = useRef(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    handleSubmit(event.target.files[0])
  };

  const handleSubmit = (file) => {
    // Create a new FormData object
    const formData = new FormData();

    // Append the selected file to the form data
    formData.append("file", file);

    // Append the metadata to the form data
    formData.append("teacherId", id);

    // Send the form data to the server using an AJAX request or a fetch API call
    fetch(`${URL}/content/push`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()).then(data => {
        update(data);
      })
      .catch((error) => {
        // Handle errors that occur during the upload process
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="file-input">
        <Fab
          color="success"
          aria-label="add"
          onClick={() => {
            ref.current.click();
          }}
        >
          <AddIcon />
        </Fab>
      </label>
      <input ref={ref} name="file-input" id="file-input" style={{ display: "none" }} type="file" onChange={handleFileInputChange} />
      <br />
    </form>
  );
}

export default FileUpload;
