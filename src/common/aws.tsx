import axios from "axios";
import { BASE_API } from "../configs";

export const uploadImage = async (img: File) => {
          let imgURL = null;

          await axios.get(`${BASE_API}/users/get-upload-url`)
                    .then(async ({ data: { data: uploadURL } }) => {
                              await axios({
                                        method: "PUT",
                                        url: uploadURL,
                                        data: img,
                                        headers: { "Content-Type": "multipart/form-data" }
                              }).then(() => {
                                        imgURL = uploadURL.split("?")[0];
                              }).catch((err) => {
                                        console.log(err);
                              });
                    }).catch((err) => {
                              console.log(err);
                    });

          return imgURL;
}