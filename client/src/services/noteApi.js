import axios from "axios";

const BASE_URL = import.meta.env.VITE_REMOTE_SERVER_URL;

export const noteApi = {
  getNotes: async (userId) => {
    // console.log(userId);
    const response = await axios.get(`${BASE_URL}/note/get_note/${userId}`);
    return response.data;
  },

  toggleFavourite: async (noteId) => {
    const response = await axios.put(
      `${BASE_URL}/note/toggle_favourite/${noteId}`
    );
    return response.data;
  },

  toggleLocked: async (noteId) => {
    const response = await axios.put(
      `${BASE_URL}/note/toggle_locked/${noteId}`
    );
    return response.data;
  },

  togglePinned: async (noteId) => {
    const response = await axios.put(
      `${BASE_URL}/note/toggle_pinned/${noteId}`
    );
    return response.data;
  },

  setVisibility: async (noteId, visibility) => {
    // visibility phải là 'public' hoặc 'private'
    const response = await axios.put(
      `${BASE_URL}/note/set_visibility/${noteId}`,
      { visibility }
    );
    return response.data;
  },
};
