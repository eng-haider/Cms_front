<template>
  <div>
    <v-app-bar color="#f5f5f5" dense dark absolute app   style="width: auto"
v-bind="$attrs"

      small>
      <v-btn
      fab
      small
      color="#000"
      text
      @click="
        setDrawer(!drawer)
      "
    >
      <v-icon v-if="drawer">mdi-view-quilt</v-icon>
      <v-icon v-else>mdi-dots-vertical</v-icon>
      
    </v-btn>

 
      <v-toolbar-title style="color:red">{{$t($route.name)}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab icon v-bind="attrs" v-on="on" @click="reColor()">
            <v-icon large color="amber">mdi-theme-light-dark</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("setting.darkMode") }}</span>
      </v-tooltip>


      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab icon @click="langChang()" v-bind="attrs" v-on="on">
            <v-icon large color="light-blue darken-1">mdi-translate</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("setting.lang") }}</span>
      </v-tooltip>
      <v-menu bottom left min-width="200" offset-y origin="top right" transition="scale-transition">
        <template v-slot:activator="{ attrs, on }">
          <v-btn min-width="0" icon v-bind="attrs" v-on="on">
            <v-icon large>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list dense>

          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in profile" :key="i" :to="item.to">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title   v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

      </v-menu>


    </v-app-bar>
  </div>
</template>


<script>
import Vue from 'vue'
import { mapState, mapMutations } from "vuex";
  export default {
    props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
   computed: {
    ...mapState(["drawer"]),
  },

    data() {
      return {

        selectedItem: 1,
    
        profile: [{
            text: this.$t('AppBar.profile'),
             icon: 'mdi-account',
            to: {
              name: "Profile",
            },
          },
          {
            text: this.$t('AppBar.Settings'),
              icon: 'mdi-cog-outline',
            to: {
              path: "setting",
            },
          },


          // {
          //   divider: true
          // },
          {
            text: this.$t('AppBar.sign_out'),
            icon: 'mdi-logout',
            to: {
              name: "Login",
            },
          },
        ],
      }


    },



    methods: {
        ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
      reColor() {
        localStorage.setItem("darkMode", !this.$vuetify.theme.dark);
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      },

      langChang() {

          let authenticate = Promise.resolve({ role: "admin" });
        authenticate.then(user => { Vue.prototype.$user.set(user);})
        this.$i18n.locale = this.$i18n.locale == "ar" ? "en" : "ar";
        localStorage.setItem("lang", this.$i18n.locale);
        this.$store.dispatch("UpdateLang", this.$i18n.locale);
        this.$vuetify.rtl = localStorage.getItem("lang") == "ar" ? true : false;
     
        //    moment.locale(this.$i18n.locale == "en" ? "en" : "ar-kw");
      }


    },

  }
</script>