import {useRouter} from "vue-router";
import store from "../../store";
import {ref} from "vue";
export default {
   name: "login",
   setup() {
      const router = useRouter();
      // const email = ref("");
      // const password = ref("");
      // const remember = ref[false];
      const user = {
         email: "",
         password: "",
         remember: false,
      };
      let errorMsg = ref("");
      function login() {
         store
            .dispatch("login", user)
            .then((response) => {
               console.log(response);
               router.push({
                  name: "dashboard",
               });
            })
            .catch((err) => {
               errorMsg.value = err.response.data.error;
               console.log(errorMsg.value);
            });
      }
      return {
         errorMsg,
         user,
         login,
      };
   },
};
