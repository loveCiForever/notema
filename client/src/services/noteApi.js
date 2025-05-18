import axios from "axios";

const BASE_URL = import.meta.env.VITE_REMOTE_SERVER_URL;

export const noteApi = {
  getNotes: async (userId) => {
    // console.log(userId);
    const response = await axios.get(`${BASE_URL}/note/get_note/${userId}`);
    console.log(response.data);
    return response.data;
  },
};
