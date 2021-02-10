<template>
  <div>
    <vue-topprogress ref="topProgress"></vue-topprogress>
   
    <v-card class="mx-auto mt-3" max-width="344" elevation="5" outlined shaped>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-1">> DOGE</div>
          <v-list-item-title class="headline mb-2">
            BITKUB : {{ DOGE.bitkub.price }}<br />
            SATANG : {{ DOGE.satang.price }}
          </v-list-item-title>
          <hr />
          <v-list-item-subtitle>
            profit : {{ DOGE.calProfit }}</v-list-item-subtitle
          >
          <hr />

          <v-list-item-subtitle
            ><br />
            diff : {{ DOGE.diff }}</v-list-item-subtitle
          >
          <v-list-item-subtitle
            >update : {{ DOGE.timeupdate }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>

    <v-card class="mx-auto mt-3" max-width="344" elevation="5" outlined shaped>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-1">> BTC</div>
          <v-list-item-title class="headline mb-2">
            BITKUB : {{ BTC.bitkub.price }}<br />
            SATANG : {{ BTC.satang.price }}
          </v-list-item-title>
          <v-list-item-subtitle> diff : {{ BTC.diff }}</v-list-item-subtitle>
          <v-list-item-subtitle
            >update : {{ BTC.timeupdate }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import calCoin from "@/functions/calProfit";
import { vueTopprogress } from "vue-top-progress";
 
export default {
  data() {
    return {
      DOGE: {
        bitkub: {
          price: 0,
        },
        satang: {
          price: 0,
        },
        calProfit: 0,
        timeupdate: moment().format("D/M/YYYY, h:mm:ss"),
        diff: 0,
      },
      BTC: {
        bitkub: {
          price: 0,
        },
        satang: {
          price: 0,
        },
        timeupdate: moment().format("D/M/YYYY, h:mm:ss"),
        diff: 0,
      },
      allcoin: "",
    };
  },
  components: { vueTopprogress },
  mounted() {
    this.getPriceCoin();
  },
  methods: {
    getPriceCoin() {
      this.$refs.topProgress.start();
      axios
        .all([
          axios.get("https://api.bitkub.com/api/market/ticker", {
            //bitkub
            headers: {
              "Cache-Control": "no-cache",
            },
          }),
          axios.get("https://api.tdax.com/api/v3/ticker/24hr", {
            //satang
            headers: {
              "Cache-Control": "no-cache",
            },
          }),
        ])
        .then(
          axios.spread((...responses) => {
            // data from bitkub res[0]
            this.BTC.bitkub.price = responses[0].data.THB_BTC.last;
            this.DOGE.bitkub.price = responses[0].data.THB_DOGE.last;

            // data from satang res[1]
            this.BTC.satang.price =
              responses[1]["data"][
                responses[1].data.findIndex((obj) => obj.symbol == "btc_thb")
              ].lastPrice;
            this.DOGE.satang.price =
              responses[1]["data"][
                responses[1].data.findIndex((obj) => obj.symbol == "doge_thb")
              ].lastPrice;

            // diff
            this.BTC.diff = this.BTC.bitkub.price - this.BTC.satang.price;
            this.DOGE.diff = this.DOGE.bitkub.price - this.DOGE.satang.price;

            // update time
            this.BTC.timeupdate = moment().format("D/M/YYYY, h:mm:ss");
            this.DOGE.timeupdate = moment().format("D/M/YYYY, h:mm:ss");

            this.DOGE.calProfit = calCoin(
              this.DOGE.satang.price,
              this.DOGE.bitkub.price
            );
            this.$refs.topProgress.done();
            // loop call api
            document.title = `DOGE : ${responses[0].data.THB_DOGE.last} | BTC : ${responses[0].data.THB_BTC.last} `
            setTimeout(() => this.getPriceCoin(), 5000);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
