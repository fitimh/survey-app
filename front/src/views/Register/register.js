import {useRouter} from "vue-router";
import store from "../../store";

// import {useStore} from "vuex";

export default {
   name: "register",
   setup() {
      // const store = useStore();
      const router = useRouter();
      const user = {
         name: "",
         email: "",
         password: "",
         password_confirmation: "",
      };
      function register(ev) {
         ev.preventDefault();
         console.log("test");
         store.dispatch("register", user).then((res) => {
            // router.push({
            //    name: "Dashboard",
            // });
            console.log(res);
            // return res;
         });
      }
      return {
         register,
         user,
      };
   },
};
