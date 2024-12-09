import { createContext, useEffect, useContext, useReducer } from "react";
import axios from "axios";
import { reducer } from "../reducers/reducer";
import Swal from "sweetalert2";
import { Flip, toast } from "react-toastify";
const CharStates = createContext();
const lsFavs = JSON.parse(localStorage.getItem("favs")) || [];

const initialState = {
  favs: lsFavs,
  chars: [],
  theme: "",
};

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const url = "https://rickandmortyapi.com/api/character";

  useEffect(() => {
    axios(url)
      .then((res) => {
        console.log(res);
        dispatch({ type: "GET_CHARS", payload: res.data.results });
        toast("Lista obtenida", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Flip,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al obtener los personajes!",
          footer: err,
        });
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(state.favs));
  }, [state.favs]);

  return (
    <CharStates.Provider value={{ state, dispatch }}>
      {children}
    </CharStates.Provider>
  );
};

export default Context;

export const useCharStates = () => useContext(CharStates);
