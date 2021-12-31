import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      I'm another page merely for demonstration purposes.
      <Link to="/">Home</Link>
    </div>
  );
};
