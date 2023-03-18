import React, { useState } from "react";

const URL = "http://localhost:5000";

function FileUpload({ id }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append the selected file to the form data
    formData.append("file", selectedFile);

    // Append the metadata to the form data
    formData.append("teacherId", id);

    // Send the form data to the server using an AJAX request or a fetch API call
    fetch(`${URL}/content/push`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Handle the response from the server
        console.log(response);
      })
      .catch((error) => {
        // Handle errors that occur during the upload process
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Choose a file:
        <input type="file" onChange={handleFileInputChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FileUpload;
