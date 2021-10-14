<template>
<v-container> 
    <v-layout>
        <h1> Registrar usuario</h1>
    </v-layout>
    <b-alert 
        :show="dismissCountDown" 
        dismissible
        :variant="mensaje.color" 
        @dismissed="dismissCountDown=0" 
        @dismiss-count-down="countDownChanged">
        {{mensaje.texto}}
    </b-alert>
        <v-form @submit.prevent="agregarUsuario()">
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="usuario.nombresUsuario" :rules="nameRules" :counter="50" label="Nombre" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="usuario.apellidosUsuario" :rules="nameRules" :counter="100" label="Apellidos" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="usuario.correoUsuario" :rules="nameRules" :counter="100" label="Correo electrónico" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="d-flex">
                        <v-select :items="rolesUsuario" v-model="usuario.rolUsuario" :rules="nameRules" :counter="100" label="Rol" required></v-select>
                    </v-col>
                </v-row>
                <br>
                <v-btn color="success" mx-2 elevation="19" type="submit">Agregar Usuario</v-btn>
            </v-container>
        </v-form>
</v-container>
</template>

<script>
export default {

    data() {
        return {
            usuarios: [],
            mensaje: {color: 'success', texto: ''}, //parametros del objeto mensaje
            dismissSecs: 5, //tiempo de actividad de la alerta
            dismissCountDown: 0,

            usuario: {nombresUsuario:"", apellidosUsuario:"", 
                        correoUsuario:"", rolUsuario:""}, //parametros del objeto usuario
            rolesUsuario: ['Usuario de consulta', 'Admón. de ambientes', 'Full Acceso'],
        }
    },

    created() {
    },

    methods: {
        agregarUsuario() {
                this.axios.post('/usuario-nuevo', this.usuario)
                .then(res => {
                    this.usuarios.push(res.data); // Agregando data al arreglo 
                    this.usuario.nombresUsuario="";
                    this.usuario.apellidosUsuario="";
                    this.usuario.correoUsuario="";
                    this.usuario.rolUsuario="";
                    this.mensaje.color="success";
                    this.mensaje.texto="Usuario agregado";
                    this.showAlert();
                })
                .catch(e => {
                    if (e.response.data.error.errors.nombre.message) {
                        this.mensaje.texto = e.response.data.error.errors.nombre.message;
                    } else {
                        this.mensaje.texto = 'Error del sistema'
                    }
                    console.log(e.response)
                    this.mensaje.color = 'danger',
                    this.showAlert();
                })
        },

        //Metodo del Mensaje
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        }
    }
}
</script>
