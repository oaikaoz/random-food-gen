<template>
  <div>
    <v-card class="mx-auto mt-3" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-1">> DOGE</div>
          <v-list-item-title class="headline mb-2">
            BITKUB : {{ DOGE.bitkub.price }}<br>
            SATANG : ...
            </v-list-item-title
          >
          <v-list-item-subtitle> Diff : +10</v-list-item-subtitle>
          <v-list-item-subtitle>update : {{  DOGE.bitkub.timeupdate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>

       <v-card class="mx-auto mt-3" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-1">> BTC</div>
          <v-list-item-title class="headline mb-2">
            BITKUB : {{ BTC.bitkub.price }}<br>
            SATANG : ...
            </v-list-item-title
          >
          <v-list-item-subtitle> Diff : +10</v-list-item-subtitle>
          <v-list-item-subtitle>update : {{  BTC.bitkub.timeupdate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
   
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import axios from 'axios'
export default {
  data() {
    return {
    
      DOGE: {
        bitkub : {
          price : 0,
          timeupdate : moment().format("D/M/YYYY, h:mm:ss")
        }
      },
      BTC: {
        bitkub : {
          price : 0 ,
          timeupdate : moment().format("D/M/YYYY, h:mm:ss")
        }
      },
    };
  },
  mounted(){
    this.getPriceCoin();
  },
  methods: {

    getPriceCoin() {
      axios
        .get("https://api.bitkub.com/api/market/ticker",{
          headers: {
            "Cache-Control": "no-cache",
          },
        })
        .then((res) => {
           this.BTC.bitkub.price = res.data.THB_BTC.last
           this.BTC.bitkub.timeupdate = moment().format("D/M/YYYY, h:mm:ss")

           this.DOGE.bitkub.price = res.data.THB_DOGE.last
           this.DOGE.bitkub.timeupdate = moment().format("D/M/YYYY, h:mm:ss")
          console.log(res);
           setTimeout(() => this.getPriceCoin(), 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>