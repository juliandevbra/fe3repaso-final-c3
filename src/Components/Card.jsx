import React from "react";
import { Link } from "react-router-dom";
import { useCharStates } from "../Context/Context";
import { toast } from "react-toastify";

const Card = ({ char }) => {
  const {
    dispatch,
    state: { favs },
  } = useCharStates();

  const findFav = favs.find((fav) => fav.id === char.id);
  // console.log(findFav);

  const toggleFav = () => {
    dispatch({ type: findFav ? "DELETE_FAV" : "ADD_FAV", payload: char });
    if (findFav) {
      toast.error("Quitado de favoritos");
    } else {
      toast.success("Agregado a favoritos");
    }
  };

  return (
    <div>
      <Link to={`/detail/${char.id}`}>
        <img src={char.image} alt="" />
      </Link>
      <h3>{char.name}</h3>
      <button onClick={toggleFav}>{findFav ? "🌟" : "⭐"}</button>
    </div>
  );
};

export default Card;
