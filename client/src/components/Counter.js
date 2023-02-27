import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "../styles/counter.css";

function Counter(props) {
  const [count, setCount] = useState(props.value);
  const [dateUpdated, setDateUpdated] = useState(props.dateUpdated);
  const token = localStorage.getItem("token");

  const handleIncrement = () => {
    setCount(count + 1);
    // Send a post request to the server to increment the counter
    // Include the token in the request headers
    // Include the counter id in the request body
    axios
      .post(
        "http://localhost:5000/counter/increment",
        { counterId: props.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
    setDateUpdated(new Date().toLocaleString());
  };

  const handleDecrement = () => {
    setCount(count - 1);
    axios
      .post(
        "http://localhost:5000/counter/decrement",
        { counterId: props.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
    setDateUpdated(new Date().toLocaleString());
  };

  const handleDelete = () => {
    // Send a delete request to the server to delete the counter
    // Include the token in the request headers
    // Include the counter id in the request body
    axios
      .post(
        "http://localhost:5000/counter/delete",
        { counterId: props.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });

    // Refresh the page
    window.location.reload();
  };

  const handleReset = () => {
    setCount(0);
    // Send a post request to the server to reset the counter
    // Include the token in the request headers
    // Include the counter id in the request body
    axios
      .post(
        "http://localhost:5000/counter/reset",
        { counterId: props.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then()
      .catch((error) => {
        console.error(error);
      });
    setDateUpdated(new Date().toLocaleString());
  };

  return (
    <div className="counter">
      <h3>{props.name}</h3>
      <p>Count: {count}</p>
      <p className="date">Created: {props.dateCreated}</p>
      <p className="date">Last Modified: {dateUpdated}</p>
      <div className="counter-buttons">
        <Button onClick={handleIncrement}>+</Button>
        <Button onClick={handleDecrement}>-</Button>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}

export default Counter;
