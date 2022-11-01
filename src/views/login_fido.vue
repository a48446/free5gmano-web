<template>
  <div class="container-fluid container-custom">
    <div class="dropdown position-fixed cursor-pointer top-0 end-0 mt-3 me-4">
      <a class="dropdown-toggle text-decoration-none text-black user-select-none" data-bs-toggle="dropdown"
        aria-expanded="false">TW</a>
      <ul class="dropdown-menu dropdown-menu-end dropdown-custom" aria-labelledby="dropdownMenu">
        <li><a class="dropdown-item" href="#">TW</a></li>
        <li>
          <hr class="dropdown-divider my-0" />
        </li>
        <li><a class="dropdown-item" href="#">EN</a></li>
      </ul>
    </div>
    <div class="d-flex flex-column">
      <div class="text-center mb-4">
        <img class="login_icon" src="@/assets/free5gmano_icon.png" alt="free5gmano_icon" />
        <h2 class="login_title">
          Free5g Mano， Lorem ipsum dolor sit consectetur.
        </h2>
      </div>
      <div class="form-custom bg-white shadow rounded text-center mt-4 mx-auto p-3">
        <input v-model="username" class="form-control form-control-lg mb-3" type="text" placeholder="帳號" />

        <div v-if="login_validate" class="col-12 d-flex align-items-center mb-2" :class="{ 'd-none': !login_validate }">
          <i class="bi bi-exclamation-circle-fill text-danger"></i>
          <small class="text-danger ms-2">{{ msg }}</small>
          <!-- <small class="text-danger ms-2">您的帳號尚未授權</small> -->
        </div>

        <!-- <h3>註冊登記</h3>
        <p>狀態: <span id="statusRegister"></span></p>
        <h4>output:</h4>
        <textarea id="dbgRegister" spellcheck="false"></textarea>

        <div class="hr_custom"></div>

        <section>
          <h3>驗證</h3>
          <p>狀態: <span id="statusAuthenticate"></span></p>
          <h4>output:</h4>
          <textarea id="dbgAuthenticate" spellcheck="false"></textarea>
        </section>
        <div class="debug-container"></div> -->

        <button class="w-100 btn btn-primary btn-lg text-white mb-3" id="btnRegister" @click="authenticate111">
          登入驗證
        </button>
        <button class="w-100 btn btn-primary btn-lg text-white mb-3" id="btnRegister" @click="register">
          註冊
        </button>
        <div class="hr_custom"></div>

        <button class="w-100 btn btn-secondary btn-lg text-white mb-3" id="btnRegister" @click="backLogin">
          返回帳密登入
        </button>
      </div>
    </div>
  </div>
  <ModalRegister></ModalRegister>
  <button @click="b">123</button>
</template>
<script setup>
import { ref, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { authenticate } from "../static/script";
const ModalRegister = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: "ModalRegister" */ "@/components/global/modal-register.vue"
  )
);
const router = useRouter();
const username = ref("");
// const pwd = ref("");
// const login_validate = ref(false);
const msg = ref();
const b = () => {
  console.log(process.env.VUE_APP_BASE_URL_proxyGovd == "/govd");
  router.push({
    path: "/dashboard",
  });
};

const register = () => {
  router.push("/register");
};

const authenticate111 = async () => {
  if (username.value == "") {
    alert("請輸入帳號");
    return;
  } else {
    await authenticate();
    router.push('/dashboard')
  }
};

const backLogin = () => {
  router.push("/login");
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
</style>
