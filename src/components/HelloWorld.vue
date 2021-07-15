<template>
  <!-- <h1>{{ msg }}</h1> -->
  <div class="container">
    <div style="text-align: center">
      <h1>Smart on FHIR - Patient Info</h1>
      <p><strong>Username:</strong> fhircamila</p>
      <p><strong>Password:</strong> epicepic1</p>
      <a
        class="btn btn-info"
        v-if="code == undefined"
        style="text-decoration: none"
        target="_blank"
        :href="authorizeLink"
      >
        Sign in
      </a>
      <hr />
    </div>
    <div v-if="accesstoken">
      <p><strong>Patient Id:</strong> {{ patient }}</p>

      <strong>Name: </strong>{{ patientdata.name[0].text }}<br />
      <strong>Birth Date: </strong>{{ patientdata.birthDate }} <br />
      <strong>Gender: </strong>{{ patientdata.gender }} <br />
      <strong>Vital Status: </strong
      >{{ patientdata.deceasedBoolean ? "Dead" : "Alive" }} <br />
      <strong>Marital Status: </strong>{{ patientdata.maritalStatus.text }}
      <br />
      <strong>Telecom: </strong> <br />
      <div v-for="telecom in patientdata.telecom" :key="telecom.value">
        <div class="ml-2">
          <strong>{{ telecom.system }}</strong> -
          {{ telecom.use }}
          {{ telecom.value }}
        </div>
      </div>

      <strong>Address: </strong> <br />
      <div v-for="address in patientdata.address" :key="address.use">
        <div class="ml-2">
          <strong>{{ address.use }} -</strong>
          {{ address.line.toString() }}, {{ address.city }},
          {{ address.district }}, {{ address.state }}, {{ address.postalCode }},
          {{ address.country }}
          <span v-if="address.period?.start"><strong>From</strong></span>
          {{ address.period?.start }}
        </div>
      </div>

      <strong>Language: </strong
      >{{ patientdata.communication[0].language.coding[0].display }} <br />

      <strong>General Practitioner </strong
      >{{ patientdata.generalPractitioner[0].display }}<br />
      <strong>Managing Organization </strong
      >{{ patientdata.managingOrganization.display }}<br />
      <hr />
      <strong>Access code:</strong>
      <p class="ml-2" style="word-break: break-all">{{ accesstoken }}</p>
      <strong>Patient Resource:</strong>
      <pre>{{ patientdata }}</pre>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      code: "",
      accesstoken: "",
      patient: "",
      patientdata: {},
      clientId: "42f3b173-16a8-4c50-a3ea-0269294cb869",
      redirect: import.meta.env.PROD
        ? "https://lucid-wozniak-940eae.netlify.app"
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
