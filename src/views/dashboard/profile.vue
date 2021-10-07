<template>
  <v-container fluid>

    <v-layout column>
      <v-row align="center" justify="center">
        <v-col cols="12" lg="6" md="6" sm="12" xs="12">
          <v-card class="text-center">
            <v-card-text>
              <v-flex class="mb-4">
                <v-avatar size="120" class="mr-4">
                  <!-- <img :src="this.$store.state.userPhotoUrl !== null ? imgUrl+this.$store.state.userPhotoUrl : require(`../../assets/profile.svg`)" alt="Avatar" /> -->
                  <img src="../../assets/profile.svg" alt="Avatar" />
                 
                </v-avatar>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="headline">{{ name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $store.state.AdminInfo.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-flex>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="red" style="color:#fff"   @click.native="dialog = true">
               {{$t('profile.change_Password')}}
                <v-icon left dark>mdi-lock-question</v-icon>
              </v-btn>
            </v-card-actions>


            <v-row align="center" justify="center" style="    margin: 10px;">
              <v-col cols="11">



                <v-text-field :label="$t('profile.name')" outlined :disabled="editeName"
                  v-model="UserInfo.username"></v-text-field>


              </v-col>


              <v-col cols="1">



                <v-btn icon @click="editeName = false;edite=true">
                  <v-icon>mdi-pen</v-icon>
                </v-btn>


              </v-col>



   <!-- <v-col cols="11">

                <v-text-field  :label="$t('profile.name')"  outlined :disabled="editephoneNumber"
                  v-model="UserInfo.phoneNumber"></v-text-field>
              </v-col> -->
              <!-- <v-col cols="1">



                <v-btn icon @click="editephoneNumber = false;edite=true">
                  <v-icon>mdi-pen</v-icon>
                </v-btn>


              </v-col> -->



              <v-col cols="11" style="padding:0px">

                <v-text-field :label="$t('profile.email')" outlined :disabled="editeEmail"
                  v-model="UserInfo.email"></v-text-field>
              </v-col>
              <v-col cols="1">



                <v-btn icon @click="editeEmail = false;edite=true">
                  <v-icon>mdi-pen</v-icon>
                </v-btn>


              </v-col>





              <!-- <v-col cols="11" style="padding:0px">

                <v-text-field :label="$t('profile.city')" outlined :disabled="cityNameEaddress"
                  v-model="UserInfo.cityName"></v-text-field>
              </v-col>

              <v-col cols="1">



                <v-btn icon @click="cityNameEaddress = false;edite=true">
                  <v-icon>mdi-pen</v-icon>
                </v-btn>


              </v-col> -->


              <!-- <v-col cols="11" style="padding:0px">

                <v-text-field :label="$t('profile.address')" outlined :disabled="editeEaddress"
                  v-model="UserInfo.address"></v-text-field>
              </v-col>

              <v-col cols="1">



                <v-btn icon @click="editeEaddress = false;edite=true">
                  <v-icon>mdi-pen</v-icon>
                </v-btn>


              </v-col> -->






              <!-- <v-col class="py-0" cols="11" style="padding:0px" sm="11" md="11">
                  <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            outlined
                            v-model="UserInfo.dateOfBirth"
                           
                            :label="$t('profile.date')"
                            prepend-icon="mdi-calendar"
                            readonly
                            :disabled="editeDate"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="UserInfo.dateOfBirth"
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
              </v-col> -->

               <v-col cols="1">



                <v-btn icon @click="editeDate = false;edite=true">
                  <v-icon>mdi-pen</v-icon>
                </v-btn>


              </v-col>





                <v-col class="py-0" cols="12" sm="8" md="10">
                      <v-file-input
                        v-model="profileImg"
                        @change="changePhoto()"
                        accept="image/png, image/jpeg, image/bmp, image/jpg"
                        placeholder="$t('profile.personal_picture')"
                        prepend-icon="mdi-camera"
                       
                         :label="$t('profile.personal_picture')"
                        outlined
                      ></v-file-input>
                    </v-col>
                    <v-col
                      class="py-0"
                      cols="12"
                      sm="4"
                      md="2"
                    
                    >
                      <v-avatar>
                        <v-img
                          :src="
                            UserInfo.userPhotoUrl
                              ? `${imgUrl}/${UserInfo.userPhotoUrl}`
                              : $store.state.defaultPhoto
                          "
                        />
                      </v-avatar>
                    </v-col>


            </v-row>

            <v-card-actions v-if="edite == true">
              <v-spacer></v-spacer>
              <!-- <v-btn color="red darken-1" text @click="close">الغاء</v-btn> -->
              <v-btn :loading="loadSave" color="green" style="color:#fff" @click="save()">حفظ
              </v-btn>
            </v-card-actions>


          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-toolbar dark color="primary lighten-1 mb-5">
            <v-toolbar-title>
              <h3>{{$t('profile.change_Password')}}</h3>
            </v-toolbar-title>
            <v-spacer />
            <v-btn @click="dialog = !dialog" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-container>
              <v-row> 

                
                <v-col class="py-0" cols="12" sm="12" md="12">
                  <v-text-field v-model="password" :label="$t('users.New_Password')" outlined
                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

 
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialog = false">{{$t('close')}}</v-btn>
            <v-btn :loading="loadSave" color="blue darken-1" text @click="savePassword">{{$t('save')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>

  ///import Avataaars from "vuejs-avataaars";
  import Axios from "axios";
  import Swal from "sweetalert2";
  export default {
    pageTitle: "My Profile",
    // components: {
    //   Avataaars
    // },
    data() {
      return {
            imgUrl: process.env.VUE_APP_IMG,
        show1: false,
        editeName: true,
        editeEmail: true,
        editeEaddress: true,
        cityNameEaddress: true,
        editephoneNumber:true,
        profileImg:null,
        editeDate:true,
        edite: false,
        rules: {
          required: value => !!value || "مطلوب",
          min: v => v.length >= 6 || "كلمة المرور يجب ان تتكون من 6 عناصر او اكثر"
        },
        password: "",
        dialog: false,
        name: "",
        per: "",
        UserInfo: [],
        loading: false,
        menu: false,
        loadSave: false
      };
    },
    methods: {
      changePhoto()
      {
          this.edite=true;
      
      },
      UserInfos() {
        
        Axios.get(
            "User/GetProfile", {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + this.$store.state.idToken
              }
            }
          )
          .then((res) => {
            this.UserInfo = res.data.result;
            this.UserInfo.dateOfBirth=this.UserInfo.dateOfBirth.substr(0, 10);
               if (this.profileImg != null) {
       //   data.append("file", this.profileImg);
        }

          })
          .catch(() => {

          });

      },


        save() {
      this.loadSave = true;
   
        const editData = {
          id: this.UserInfo.id,
           userTypeId: this.UserInfo.userTypeId,
           userGroupId: this.UserInfo.userGroupId,
           organizationGuid: this.UserInfo.organizationGuid,
          username: this.UserInfo.username,
         password: this.UserInfo.password,
          phoneNumber: this.UserInfo.phoneNumber.replace(/ /g, ""),
          email: this.UserInfo.email,
         roleId: this.UserInfo.roleId,
         isActive: this.UserInfo.isActive,
          cityName: this.UserInfo.cityName,
          address: this.UserInfo.address,
          dateOfBirth: this.UserInfo.dateOfBirth,
        };
        let data = new FormData();
        if (this.profileImg != null) {
          data.append("file", this.profileImg);
        }
        // data.append("name", "my-file");

        for (var key in editData) {
          if (editData[key]) data.append(key, editData[key]);
        }
        this.axios
          .put("user/" + this.UserInfo.id, data)
          .then((res) => {
            this.loadSave = false;
              this.$store.dispatch("UpdateInfo", res.data.result);
            this.UserInfos();
           // this.close();
            this.$swal.fire({
              title: "تم التعديل ",
              text: "",
              icon: "success",
              confirmButtonText: "اغلاق",
            });
          })
          .catch((res) => {
            this.loadSave = false;
              this.$store.dispatch("UpdateInfo", res.data.result);
          this.$swal.fire({
              title: "تم التعديل ",
              text: "",
              icon: "success",
              confirmButtonText: "اغلاق",
            });
          });
     
        },
      savePassword() {
        if (this.password) {
          Axios.get(
              "User/ChangePasswordByUser?password=" + this.password, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: "Bearer " + this.$store.state.idToken
                }
              }
            )
            .then((res) => {
                res
              this.loadSave = false;
             
              Swal.fire({
                title: "تم تعديل كلمة المرور",
                text: "",
                icon: "success",
                confirmButtonText: "اغلاق"
              });
            })
            .catch(() => {
              this.loadSave = false;
              

              Swal.fire({
                title: "تاكد من ادخال كلمة مرور صالحه",
                text: "",
                icon: "error",
                confirmButtonText: "اغلاق"
              });
            });
        } else {
          this.loadSave = false;

          Swal.fire({
            title: "تاكد من ملى المعلومات",
            text: "",
            icon: "error",
            confirmButtonText: "اغلاق"
          });
        }
      }
    },

  
    created() {
      this.UserInfos();
      this.name = this.$store.state.fullname;

    }
  };

</script>
