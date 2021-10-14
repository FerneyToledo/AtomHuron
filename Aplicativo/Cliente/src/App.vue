<template>
  <v-app>
    <!-- se llama al componente Nav -->
    <Nav />
    <v-app-bar
      app
      color="#3949AB"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Atom Huron"
          class="shrink mr-2"
          contain
          src="./assets/IconoAtomHuron.png"
          transition="scale-transition"
          width="140"
        />
        <h3>Atom Huron</h3>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href=".\index4.html"
        target=""
        text
      >
        <span class="mr-2">¿Quiénes somos?</span>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
//aqui se importa el componenete Nav
import Nav from './components/Nav.vue'


export default {
  components:{
    Nav
  },
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
