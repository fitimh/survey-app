import {useRouter} from "vue-router";
import store from "../../store";

export default {
   name: "register",
   setup() {
      const router = useRouter();
      const user = {
         full_name: "",
         email: "",
         password: "",
         password_confirmation: "",
      };
      function register(ev) {
         ev.preventDefault();
         store.dispatch("register", user).then((res) => {
            router.push({
               name: "Dashboard",
            });
         });
      }
      return {
         register,
         user,
      };
   },
};
