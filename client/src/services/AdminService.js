import Api from "@/services/Api";

export default {
  admin() {
    return Api().get("admin");
  }
};
