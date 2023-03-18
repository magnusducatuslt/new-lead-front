import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000";

export default function Consumer({ consumerId }) {
  const [contents, setContents] = useState([]);
  const [state, setState] = useState();
  const [path, setPath] = useState();
  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.post(`${URL}/content`, { consumerId });
      console.log(response);
      setContents([...response.data]);
    };
    fetchResults().then();
  }, [state]);

  if (path) {
    window.location.href = `${URL}/render/${path}`;
  }
  return (
    <div>
      <h2>Consumer</h2>
      <ul>
        {contents.map((content) => (
          <li
            key={content.id}
            onClick={() => {
              //если пользователь сдавал, то идет нахуй
              if (!content.results.length) {
                setPath(`${content.filename}`);
              }
            }}
          >
            <label>{content.originalname}</label>
            {content.results.length ? (
              <label> сдал {`${content.results[0].isPass}`}</label>
            ) : (
              <label></label>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
