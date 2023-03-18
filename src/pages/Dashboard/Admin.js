import React, { useState, useEffect } from "react";
import axios from "axios";

import Uploader from "../../components/upload/upload";

const URL = "http://localhost:5000";

export default function Admin({ teacherId }) {
  const [results, setResults] = useState([]);
  const [state, setState] = useState();
  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.get(`${URL}/result/${teacherId}`);
      console.log(response);
      setResults([...response.data]);
    };
    fetchResults().then();
  }, [state]);
  return (
    <div>
      <h2>Admin</h2>
      <br />
      <Uploader id={teacherId} />
      <br />
      <ul>
        {results.map((result) => (
          <div key={result.id}>
            <h3>{result.originalname}</h3>
            <ul>
              {result.results.map((user, key) => (
                <li key={`${user.id}-${result.id}`}>
                  {user.user.id} {user.user.login} questions{" "}
                  {Object.keys(user.questions).length}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}
