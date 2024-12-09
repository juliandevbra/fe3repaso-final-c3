import axios from "axios";
import Swal from "sweetalert2";
import { Zoom, toast } from "react-toastify";
const url = "https://rickandmortyapi.com/api/character/";

const getChars = () => {};

export const getChar = async (id) => {
  try {
    const { data } = await axios(url + id);
    if (!data) {
      return;
    }
    toast("Se obtuvo el personaje", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Zoom,
    });
    return data;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al obtener detalle",
    });
  }
};
