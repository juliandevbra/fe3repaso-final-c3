import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChar } from "../Service/apiCalls";
import withErrorBoundary from "../withErrorBoundary";

const Detail = () => {
  const [char, setChar] = useState({});
  const params = useParams();
  // console.log(params);

  const fetchData = async () => {
    const data = await getChar(params.id);
    setChar(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>{char.name}</h2>
      <img src={char.image} alt="" />
      <h4>Status: {char.status}</h4>
      <h4>Especie: {char.species}</h4>
    </div>
  );
};

export default withErrorBoundary(Detail);
