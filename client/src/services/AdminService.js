import Api from "@/services/Api";

export default {
  admin() {
    return Api().get("admin");
  },
  isAdmin() {
    return Api().get("isAdmin");
  },
  active(user) {
    return Api().post("active", user);
  }
};
