import Api from "@/services/Api";

export default {
  sendPasswordCode(credentials) {
    return Api().post("sendPasswordCode", credentials);
  },
  updatePassword(credentials) {
    return Api().post("updatePassword", credentials);
  },
  changePassword(credentials) {
    return Api().post("changePassword", credentials);
  }
};
