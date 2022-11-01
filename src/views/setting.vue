<template>
  <div class="container-fluid container-custom">
    <template v-if="pageStatus">
      <div class="row justify-content-between align-items-center mb-4">
        <label
          for="inputLanguage"
          class="col-auto col-form-label col-form-label-lg p-0"
          >語 系</label
        >
        <div class="col-auto p-0">
          <select class="form-select" aria-label="select">
            <option value="tw" selected>TW</option>
            <option value="en">EN</option>
          </select>
        </div>
      </div>

      <div class="row justify-content-between align-items-center mb-4">
        <label
          for="inputLanguage"
          class="col-auto col-form-label col-form-label-lg p-0"
          >將此帳號設定為無密碼零信任登入</label
        >
        <div class="col-auto p-0">
          <div class="row justify-content-end">
            <button
              class="col-auto btn btn-primary text-white"
              @click="setfinger"
            >
              新增指紋
            </button>
          </div>
        </div>
      </div>

      <div class="row justify-content-end">
        <button class="col-auto btn btn-danger" @click="logout">登 出</button>
      </div>
    </template>
    <template v-else>
      <div class="row justify-content-between placeholder-glow mb-5">
        <div class="placeholder placeholder-lg rounded-pill col-4"></div>
        <div class="placeholder placeholder-lg rounded-pill col-2"></div>
      </div>
      <div class="row justify-content-between placeholder-glow mb-5">
        <div class="placeholder placeholder-lg rounded-pill col-2"></div>
        <div class="placeholder placeholder-lg rounded-pill col-3"></div>
      </div>
      <div class="row justify-content-between placeholder-glow mb-5">
        <div class="placeholder placeholder-lg rounded-pill col-3"></div>
        <div class="placeholder placeholder-lg rounded-pill col-2"></div>
      </div>
      <div class="row justify-content-between placeholder-glow mb-5">
        <div class="placeholder placeholder-lg rounded-pill col-2"></div>
        <div class="placeholder placeholder-lg rounded-pill col-3"></div>
      </div>
      <div class="row justify-content-between placeholder-glow mb-5">
        <div class="placeholder placeholder-lg rounded-pill col-4"></div>
        <div class="placeholder placeholder-lg rounded-pill col-3"></div>
      </div>
      <div class="row justify-content-between placeholder-glow mb-5">
        <div class="placeholder placeholder-lg rounded-pill col-2"></div>
        <div class="placeholder placeholder-lg rounded-pill col-2"></div>
      </div>
      <div class="row justify-content-end placeholder-glow mb-5">
        <a
          href="#"
          tabindex="-1"
          class="btn btn-danger disabled placeholder col-2"
        ></a>
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { delay } from "@/assets/js/delay";
import { api } from "../apis/api";
import { useRouter } from "vue-router";
import registerFido from "../static/script";
const pageStatus = ref(false);
const router = useRouter();
onMounted(async () => {
  await delay(700);
  pageStatus.value = true;
});

const setfinger = () => {
  console.log("家這裡");
  registerFido();
};

const logout = () => {
  api
    .loadAuth()
    .logout()
    .then((res) => {
      router.push("/login");
      console.log(res);
    });
};
</script>
<style scoped>
.container-custom {
  display: flex;
  flex-direction: column;
  padding: 50px 60px;
}
</style>
