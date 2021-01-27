<template>
  <v-app>
    <v-app-bar color=" accent-4" dense dark>
      <v-toolbar-title>Random Food</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="showDialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn rounded @click="randomData">
        <v-icon left>
          mdi-reload
        </v-icon>
        random
      </v-btn>
      <v-menu left bottom> </v-menu>
    </v-app-bar>
    <v-container fluid fill-height>
      <v-row dense>
        <v-col cols="12" sm="6">
          <v-layout align-center justify-center>
            <v-card dark elevation="5" color="#333333" :class="classShake">
              <v-layout>
                <v-card-text class="text-xl-h4">
                  {{ randomText }}
                </v-card-text>
              </v-layout>
            </v-card>
          </v-layout>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card>
            <v-data-table
              :headers="headers"
              :items="data"
              hide-default-header
              hide-default-footer
              disable-pagination
              class="elevation-1"
              height="50vh"
            >
              <template v-slot:no-data>
                <div class="text-caption" height="50vh">
                  ไม่มีข้อมูล
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-dialog v-model="showDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add menu</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    v-model="dlNamefood"
                    label="name menu"
                    required
                    outlined
                      shaped
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn color="blue darken-1" text @click="saveData">
              Save
            </v-btn>
             <v-btn color="blue darken-1" text @click="showDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar" timeout="1000">
        ยังไม่ได้เพิ่มข้อมูล
        <template v-slot:action="{ attrs }">
          <v-btn
            color="green"
            text
            v-bind="attrs"
            @click="
              snackbar = false;
              showDialog = true;
            "
          >
            เพิ่มข้อมูล
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-app>
</template>
<script>
export default {
  methods: {
    setData() {
      this.randomText = this.data[
        Math.floor(Math.random() * this.data.length) + this.rmMin
      ].name;
      this.timeRandom += 3;
      this.timeRandom < 100
        ? this.randomData()
        : ((this.timeRandom = 10), (this.classShake = ""));
    },
    randomData() {
      if (this.data.length > 0) {
        this.classShake = "shake-crazy shake-constant shake-constant--hover";
        setTimeout(() => this.setData(), this.timeRandom);
      } else {
        this.snackbar = true;
      }
    },
    saveData() {
      this.data.push({
        name: this.dlNamefood,
      });
      this.dlNamefood = "";
      this.showDialog = false;
    },
  },
  data() {
    return {
      dlNamefood: "",
      showDialog: false,
      rmMin: 0,
      rmMax: 3,
      timeRandom: 20,
      classShake: "",
      snackbar: false,
      randomText: "กด ปุ่ม Random",
      headers: [
        {
          text: "foodname ",
          align: "start",
          value: "name",
        },
      ],
      data: [],
    };
  },
};
</script>

<style></style>
