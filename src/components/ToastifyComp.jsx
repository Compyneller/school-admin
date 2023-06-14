import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
const ToastifyComp = (text) => {
  console.log(text);
  Toastify({
    text: text,
    position: "center",

    duration: 3000,
  }).showToast();
};

export default ToastifyComp;
