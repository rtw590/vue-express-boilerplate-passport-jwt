import Api from "@/services/Api";

export default {
  sendPasswordCode(credentials) {
    return Api().post("sendPasswordCode", credentials);
  }
};
