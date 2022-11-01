<template>
  <div class="container-fluid container-custom">
    <div class="dropdown position-fixed cursor-pointer top-0 end-0 mt-3 me-4">
      <a
        class="dropdown-toggle text-decoration-none text-black user-select-none"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        >TW</a
      >
      <ul
        class="dropdown-menu dropdown-menu-end dropdown-custom"
        aria-labelledby="dropdownMenu"
      >
        <li><a class="dropdown-item" href="#">TW</a></li>
        <li><hr class="dropdown-divider my-0" /></li>
        <li><a class="dropdown-item" href="#">EN</a></li>
      </ul>
    </div>
    <div class="d-flex flex-column">
      <div class="text-center mb-4">
        <img
          class="login_icon"
          src="@/assets/free5gmano_icon.png"
          alt="free5gmano_icon"
        />
        <h2 class="login_title">
          Free5g Mano， Lorem ipsum dolor sit consectetur.
        </h2>
      </div>
      <div
        class="form-custom bg-white shadow rounded text-center mt-4 mx-auto p-3"
      >
        <input
          v-model="name"
          class="form-control form-control-lg mb-3"
          type="text"
          placeholder="帳號"
        />
        <div class="hr_custom"></div>

        <div
          v-if="login_validate"
          class="col-12 d-flex align-items-center mb-2"
          :class="{ 'd-none': !login_validate }"
        >
          <i class="bi bi-exclamation-circle-fill text-danger"></i>
          <small class="text-danger ms-2">{{ msg }}</small>
          <!-- <small class="text-danger ms-2">您的帳號尚未授權</small> -->
        </div>
        <button
          class="w-100 btn btn-primary btn-lg text-white mb-3"
          @click="loginButton"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          註冊
        </button>
        <button
          id="auth"
          class="w-100 btn btn-primary btn-lg text-white mb-3"
          @click="auth"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          data-bs-dismiss="false"
        >
          登入
        </button>
      </div>
      <div
        class="modal"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content border position-relative">
            <img id="mypic" :src="imgregister" alt="" />
            <div class="position-absolute activephone">
              <button class="activebutton" @click="gologin2"></button>
            </div>
            <div class="position-absolute activeusb">
              <button class="activebutton" @click="gologin2"></button>
            </div>
            <div class="position-absolute activemodal">
              <button class="activebutton" @click="gologin2"></button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content border position-relative">
            <img src="../assets/auth.png" alt="" />
            <div class="position-absolute activemodal"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalRegister></ModalRegister>
  <button @click="b">123</button>
</template>
<script setup>
import { ref, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { api } from "../apis/api";

const ModalRegister = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: "ModalRegister" */ "@/components/global/modal-register.vue"
  )
);
const router = useRouter();
const name = ref("");
const pwd = ref("");
const login_validate = ref(false);
const msg = ref();
const img = require("../assets/register.png");
console.log(img);
let imgregister = ref(img);
console.log(imgregister.value);

const b = () => {
  console.log(process.env.VUE_APP_BASE_URL_proxyGovd == "/govd");
  router.push({
    path: "/dashboard",
  });
};
const loginButton = () => {
  const form = {
    name: name.value,
    password: pwd.value,
  };
  api
    .loadAuth()
    .login(form)
    .then((res) => {
      console.log(res.data);
      if (res.data.status === 0) {
        router.push({
          path: "/dashboard",
        });
      } else {
        login_validate.value = true;
        msg.value = res.data.message;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const gologin2 = async () => {
  imgregister.value = require("../assets/auth.png");
};

const auth = () => {
  const dis = document.getElementById("auth");
  console.log(dis);
  setTimeout(function () {
    router.push("/dashboard");
    // console.log(a);
  }, 2000);
};

// onBeforeRouteLeave((to) => {
//    const info = sessionStorage.getItem('token');
//    if(!info) {
//      if(to.meta.requireAuth) {
//         router.push({
//         name: 'login'
//       })
//      }
//    }
// });
</script>
<style scoped>
.container-custom {
  display: flex;
  height: 100vh;
  min-width: 360px;
  min-height: 600px;
  justify-content: center;
  align-items: center;
}
.login_icon {
  width: 100px;
  margin: 0 auto 15px auto;
  user-select: none;
}
.login_title {
  width: 330px;
  font-size: 25px;
  font-weight: 500;
}
.form-custom {
  width: 330px;
}
.hr_custom {
  display: flex;
  margin: 16px 0px 22px 0px;
  border-bottom: 1px solid #dadde1;
}
.dropdown-custom {
  min-width: 4rem;
  text-align: center;
}

.activemodal {
  left: 17px;
  top: 353px;
  width: 464px;
  height: 50px;
}

.activephone {
  left: 17px;
  top: 252px;
  width: 464px;
  height: 50px;
}

.activeusb {
  left: 17px;
  top: 302px;
  width: 464px;
  height: 50px;
}

.activephone:hover {
  background-color: gray;
  opacity: 0.2;
}
.activeusb:hover {
  background-color: gray;
  opacity: 0.2;
}

.activemodal:hover {
  background-color: gray;
  opacity: 0.2;
}

.activebutton {
  left: 17px;
  top: 353px;
  width: 464px;
  height: 50px;
  opacity: 0;
}
</style>
