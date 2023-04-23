import axios from "axios";


export const storePassword = (payload) => {

    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8080/storePassword",payload)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(`Failed to invoke API`);
          }
        })
        .catch((err) => reject(err));
    });
  };


export const getPasswords = () => {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8080/getPasswords")
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(`Failed to invoke API`);
          }
        })
        .catch((err) => reject(err));
    });
  };