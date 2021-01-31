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
              <template v-slot:item="{ item }">
                <tr>
                  <td width="70%">{{ item.name }}</td>

                  <td>
                    <v-icon class="mr-2" @click="editShowDialog(item)">
                      mdi-comment-edit
                    </v-icon>
                    <span class="ma-1"></span>
                    <v-icon @click="delData(item)"
                      >mdi-delete-alert-outline</v-icon
                    >
                  </td>
                </tr>
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
              บันทึก
            </v-btn>
            <v-btn color="blue darken-1" text @click="showDialog = false">
              ปิด
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit menu</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    v-model="tempData.name"
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

            <v-btn color="blue darken-1" text @click="editData">
              บันทึก
            </v-btn>
            <v-btn color="blue darken-1" text @click="editDialog = false">
              ปิด
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
      <v-snackbar v-model="sbError" timeout="1000" color="red">
        {{ msgError }}
      </v-snackbar>
    </v-row>
  </v-app>
</template>
<script>
import { httpClient } from "@/services/httpClient";
export default {
  components: {},
  methods: {
    loadData() {
      httpClient
        .get(`http://${process.env.VUE_APP_API_PATH}/api/foods/`)
        .then((response) => {
          this.data = response.data.data;
        });
    },
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
    editData() {
      httpClient
        .put(
          `http://${process.env.VUE_APP_API_PATH}/api/foods/${this.tempData.id}`,
          {
            id: this.tempData.id,
            name: this.tempData.name,
            detail: "",
            shop_name: "",
          }
        )
        .then(() => {
          this.editDialog = false;
          this.loadData();
        })
        .catch((err) => {
          this.sbError = true;
          this.msgError = err.response.data.error.message;
        });
    },
    saveData() {
      httpClient
        .post(`http://${process.env.VUE_APP_API_PATH}/api/foods/`, {
          name: this.dlNamefood,
          detail: "",
          shop_name: "",
        })
        .then(() => {
          this.loadData();
        })
        .catch((err) => {
          this.sbError = true;
          this.msgError = err.response.data.error.message;
        });

      this.dlNamefood = "";
      this.showDialog = false;
    },
    editShowDialog(item) {
      this.editDialog = true;
      this.tempData = item;
      console.log(item);
    },
    delData(item) {
      httpClient
        .delete(`http://${process.env.VUE_APP_API_PATH}/api/foods/${item.id}`)
        .then(() => {
          this.loadData();
        })
        .catch((err) => {
          this.sbError = true;
          this.msgError = err.response.data.error.message;
        });
    },
  },
  data() {
    return {
      msgError: "",
      sbError: false,
      dlNamefood: "",
      showDialog: false,
      editDialog: false,
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
      tempData: [],
    };
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style></style>
