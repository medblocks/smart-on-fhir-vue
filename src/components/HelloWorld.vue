<template>
  <!-- <h1>{{ msg }}</h1> -->
  <div>
    <button v-if="code == undefined">
      <a target="_blank" :href="authorizeLink">Sign in</a>
    </button>
    <p>Username: fhircamila</p>
    <p>Password: epicepic1</p>
    <hr />
    <p>Patient: {{ patient }}</p>
    <p>Access code:</p>
    <pre v-if="accesstoken">{{ accesstoken }}</pre>
    <p>Patient Demographics:</p>
    <pre>{{ patientdata }}</pre>
  </div>
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
      patientdata: {},
      clientId: "42f3b173-16a8-4c50-a3ea-0269294cb869",
      redirect: import.meta.env.VITE_NETLIFY
        ? import.meta.env.VITE_URL
        : "http://localhost:3000",
    };
  },
  computed: {
    authorizeLink() {
      return `https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=${this.redirect}&client_id=${this.clientId}&state=1234&scope=patient.read, patient.search`;
    },
  },
  async mounted() {
    console.log(this.$route.query.code);
    this.code = this.$route.query.code;
    if (this.code != undefined) {
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("redirect_uri", this.redirect);
      params.append("code", this.code);
      params.append("client_id", this.clientId);
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
      await axios
        .get(
          `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient/${this.patient}`,
          { headers: { Authorization: `Bearer ${this.accesstoken}` } }
        )
        .then((response) => {
          this.patientdata = response.data;
          console.log(response);
        })
        .catch((error) => {
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
