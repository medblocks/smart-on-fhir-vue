<template>
  <!-- <h1>{{ msg }}</h1> -->
  <div class='container'>
    <div style="text-align:center">
    <h1>Smart on FHIR</h1>
      <p><strong>Username:</strong> fhircamila</p>
      <p><strong>Password:</strong> epicepic1</p>
      <button class="btn btn-info" v-if="code == undefined">
        <a class='text-light' style='text-decoration:none' target="_blank" :href="authorizeLink">Sign in</a>
      </button>
      <hr />
    </div>
    <div v-if="accesstoken">
      <p><strong>PatientId:</strong> {{ patient }}</p>
      <strong>Access code:</strong>
      <p class="ml-2" style='word-break:break-all'>{{ accesstoken }}</p>
      <strong>Name: </strong>{{patientdata.name[0].text}}<br>
      <strong>Birth Date: </strong>{{patientdata.birthDate}} <br> 
      <strong>Gender: </strong>{{patientdata.gender}} <br>
      <strong>Vital Status: </strong>{{patientdata.deceasedBoolean?'Dead':'Alive'}} <br>
      <strong>Marital Status: </strong>{{patientdata.maritalStatus.text}} <br>
      <strong>Telecom: </strong> <br>
      <div v-for="telecom in patientdata.telecom" :key="telecom.value">
        <div class='ml-2'>
          <strong>{{telecom.system}}</strong> -
            {{telecom.use}}
          {{telecom.value}}
       
        </div>
      </div>

      <strong>Address: </strong> <br>
      <div v-for='address in patientdata.address' :key="address.use">
        <div class='ml-2'>
          <strong>{{address.use}} -</strong> 
          {{address.line.toString()}},
          {{address.city}},
          {{address.district}},      
          {{address.state}},
          {{address.postalCode}},
          {{address.country}}
        <span v-if='address.period?.start'><strong>From</strong></span>  {{address.period?.start}}
        </div>
      </div>

      <strong>Language: </strong>{{patientdata.communication[0].language.coding[0].display}} <br>

      <strong>General Practitioner </strong>{{patientdata.generalPractitioner[0].display}}<br/>
       <strong>Managing Organization </strong>{{patientdata.managingOrganization.display}}<br/>
      <strong>Patient Demographics:</strong>
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
      patientdata: {
        "resourceType": "Patient",
  "id": "erXuFYUfucBZaryVksYEcMg3",
  "extension": [
    {
      "extension": [
        {
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "2131-1",
            "display": "Other Race"
          },
          "url": "ombCategory"
        },
        {
          "valueString": "Other Race",
          "url": "text"
        }
      ],
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-race"
    },
    {
      "extension": [
        {
          "valueCoding": {
            "system": "urn:oid:2.16.840.1.113883.6.238",
            "code": "UNK",
            "display": "Unknown"
          },
          "url": "ombCategory"
        },
        {
          "valueString": "Unknown",
          "url": "text"
        }
      ],
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity"
    },
    {
      "valueCode": "F",
      "url": "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex"
    }
  ],
  "identifier": [
    {
      "use": "usual",
      "type": {
        "text": "EPIC"
      },
      "system": "urn:oid:1.2.840.114350.1.13.0.1.7.5.737384.0",
      "value": "E4007"
    },
    {
      "use": "usual",
      "type": {
        "text": "EXTERNAL"
      },
      "system": "urn:oid:1.2.840.114350.1.13.0.1.7.2.698084",
      "value": "Z6129"
    },
    {
      "use": "usual",
      "type": {
        "text": "FHIR"
      },
      "system": "http://open.epic.com/FHIR/StructureDefinition/patient-dstu2-fhir-id",
      "value": "TnOZ.elPXC6zcBNFMcFA7A5KZbYxo2.4T-LylRk4GoW4B"
    },
    {
      "use": "usual",
      "type": {
        "text": "FHIR STU3"
      },
      "system": "http://open.epic.com/FHIR/StructureDefinition/patient-fhir-id",
      "value": "erXuFYUfucBZaryVksYEcMg3"
    },
    {
      "use": "usual",
      "type": {
        "text": "INTERNAL"
      },
      "system": "urn:oid:1.2.840.114350.1.13.0.1.7.2.698084",
      "value": "     Z6129"
    },
    {
      "use": "usual",
      "type": {
        "text": "EPI"
      },
      "system": "urn:oid:1.2.840.114350.1.13.0.1.7.5.737384.14",
      "value": "203713"
    },
    {
      "use": "usual",
      "type": {
        "text": "MYCHARTLOGIN"
      },
      "system": "urn:oid:1.2.840.114350.1.13.0.1.7.3.878082.110",
      "value": "FHIRCAMILA"
    },
    {
      "use": "usual",
      "type": {
        "text": "WPRINTERNAL"
      },
      "system": "urn:oid:1.2.840.114350.1.13.0.1.7.2.878082",
      "value": "736"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "text": "Camila Maria Lopez",
      "family": "Lopez",
      "given": [
        "Camila",
        "Maria"
      ]
    },
    {
      "use": "usual",
      "text": "Camila Maria Lopez",
      "family": "Lopez",
      "given": [
        "Camila",
        "Maria"
      ]
    }
  ],
  "telecom": [
    {
      "system": "phone",
      "value": "469-555-5555",
      "use": "home"
    },
    {
      "system": "phone",
      "value": "469-888-8888",
      "use": "work"
    },
    {
      "system": "email",
      "value": "knixontestemail@epic.com"
    }
  ],
  "gender": "female",
  "birthDate": "1987-09-12",
  "deceasedBoolean": false,
  "address": [
    {
      "use": "old",
      "line": [
        "3268 West Johnson St.",
        "Apt 117"
      ],
      "city": "GARLAND",
      "district": "DALLAS",
      "state": "TX",
      "postalCode": "75043",
      "country": "US"
    },
    {
      "use": "home",
      "line": [
        "3268 West Johnson St.",
        "Apt 117"
      ],
      "city": "GARLAND",
      "district": "DALLAS",
      "state": "TX",
      "postalCode": "75043",
      "country": "US",
      "period": {
        "start": "2019-05-24"
      }
    }
  ],
  "maritalStatus": {
    "text": "Married"
  },
  "communication": [
    {
      "language": {
        "coding": [
          {
            "system": "urn:ietf:bcp:47",
            "code": "en",
            "display": "English"
          }
        ],
        "text": "English"
      },
      "preferred": true
    }
  ],
  "generalPractitioner": [
    {
      "reference": "Practitioner/eM5CWtq15N0WJeuCet5bJlQ3",
      "display": "Family Medicine Physician, MD"
    }
  ],
  "managingOrganization": {
    "reference": "Organization/enRyWnSP963FYDpoks4NHOA3",
    "display": "EHS Service Area"
  }
      },
      
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
