// This file sets the info for our backend calls

import axios from "axios";

// Productions checklist: Update baseURL for production

export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/`
  });
};
