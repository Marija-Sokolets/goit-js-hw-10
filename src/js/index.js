import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select'

// new SlimSelect({
//   select: '#selectElement'
// })
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_t1mW2wa0XY9KIPTcSL1wssfIiXpZYy71WPMPSiXAQZC4ztX2kccyRmhGDUPsGF9C";


fetch("https://api.thecatapi.com/v1/images/search")
    .then((res) => {
        console.log(res);
        if (!res.ok) {
            throw new Error("Помилка");
        }
        return res.json();
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err, "1"));
