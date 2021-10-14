<template>
  <div >
      <v-navigation-drawer
        permanent
        expand-on-hover
        absolute 
        right
      >
        <v-list>
          <v-list-item class="px-9">
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Ferney 
              </v-list-item-title>
              <v-list-item-subtitle>ferneytoledo@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link @click="ambiente()">
            <v-list-item-icon>
              <v-icon color="green darken-2">mdi-server-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title >Registrar ambiente</v-list-item-title>
          </v-list-item>

          <v-list-item link  @click="tablaambiente()">
            <v-list-item-icon>
              <v-icon color=#1A237E>mdi-clipboard-list</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Listar ambientes</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="usuario()">
            <v-list-item-icon>
              <v-icon color="green darken-2">mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Registrar usuario</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="tablausuario()">
            <v-list-item-icon>
              <v-icon color=#1A237E>mdi-account-multiple-check</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Listar usuarios</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="servidor()">
            <v-list-item-icon>
              <v-icon color="green darken-2">mdi-server</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Registrar servidor</v-list-item-title>
          </v-list-item>

          <v-list-item link @click="tablaservidor()">
            <v-list-item-icon>
              <v-icon color=#1A237E>mdi-server</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Listar servidores</v-list-item-title>
          </v-list-item>
          <v-list-item link href="index4.html">
            <v-list-item-icon>
              <v-icon color="red darken-2">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
        <div class="d-flex align-center">
        <v-img
          alt="Atom Huron Logo"
          class="shrink mr-2"
          contain
          src="../assets/IconoAtomHuron.png"
          transition="scale-transition"
          width="190"
        /><br>
      </div>
      </v-navigation-drawer>
  </div>
  
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
    }),
    methods:{
      ambiente(){
        this.$router.push('/ambiente')
        
      },

      tablaambiente(){
        this.$router.push('/listaambiente')
        
      },

      usuario(){
        this.$router.push('/usuario')
        
      },

      tablausuario(){
        this.$router.push('/listausuario')
        
      },
      servidor(){
        this.$router.push('/servidor')
        
      },
      tablaservidor(){
        this.$router.push('/listaservidor')
        
      },
    }
  }
</script>