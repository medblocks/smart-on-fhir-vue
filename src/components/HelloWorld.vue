<template>
  <!-- <h1>{{ msg }}</h1> -->
  <div>
    <button v-if="code == undefined">
      <a
        target="_blank"
        href="https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=http://localhost:3000&client_id=2c2944bf-0add-4ed0-9e4d-eba58cc91040&state=1234&scope=openid fhirUser"
        >Sign in</a
      >
    </button>
    <p>Username: fhircamila</p>
    <p>Password: epicepic1</p>
    <hr>
    <p>Patient: {{patient}}</p>
    <p>Access code:</p>
    <pre v-if="accesstoken">{{ accesstoken }}</pre>
  </div>
  <!-- <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="state.count++">
    count is: {{ state.count }}
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p> -->
</template>

<script>
// import { computed, defineProps, reactive } from 'vue'
import axios from "axios";

export default {
  data() {
    return {
      code: "",
      accesstoken: "",
      patient: "",
    };
  },
  async mounted() {
    console.log(this.$route.query.code);
    this.code = this.$route.query.code;
    if (this.code != undefined) {
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("redirect_uri", "http://localhost:3000");
      params.append("code", this.code);
      params.append("client_id", "2c2944bf-0add-4ed0-9e4d-eba58cc91040");
      params.append("state", "1234");
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      await axios
        .post(
          "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token",
          params,
          config
        )
        .then((response) => {
          console.log(response.data);
          this.accesstoken = response.data.access_token;
          this.patient = response.data.patient;
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if (this.accesstoken != "") {
      axios
        .get(
          `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?subject=Patient/${this.patient}`
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
};
// const state = reactive({ count: 0 })
</script>

<style scoped>
/* a {
  color: #42b983;
} */
</style>
