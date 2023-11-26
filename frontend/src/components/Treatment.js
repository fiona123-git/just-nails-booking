import React from "react";
import { useNavigate } from "react-router-dom";

function Treatment ({treatment  }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-2 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${treatment._id}`)}
    >
      <h1 className="card-title">
       {treatment.name}
      </h1>
      <hr />
      
      
      
      <p>
        <b>Timings : </b>
        {treatment.timings[0]} - {treatment.timings[1]}
      </p>
    </div>
  );
}

export default Treatment ;
