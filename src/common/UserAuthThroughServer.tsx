import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../App";
import { BASE_API } from "../configs";
import { storeInSession } from "./session";

export default function UserAuthThroughServer(serverRoute: string, formData: { [k: string]: FormDataEntryValue }) {
          const { setUserAuth } = useContext(UserContext);

          axios.post(`${BASE_API}${serverRoute}`, formData)
                    .then(({ data }) => {
                              storeInSession("user", JSON.stringify(data?.data));
                              setUserAuth(data?.data);
                    })
                    .catch(err => {
                              toast.error(err.response.data.message);
                    })
}