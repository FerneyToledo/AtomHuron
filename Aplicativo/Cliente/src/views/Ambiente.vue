<template>
<v-container> 
    <v-layout>
        <h1> Registrar ambiente</h1>
    </v-layout>
    <b-alert 
        :show="dismissCountDown" 
        dismissible
        :variant="mensaje.color" 
        @dismissed="dismissCountDown=0" 
        @dismiss-count-down="countDownChanged">
        {{mensaje.texto}}
    </b-alert>
        <v-form @submit.prevent="agregarAmbiente()" v-if="!editar" v-model="valid">
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="ambiente.nombreAmbiente" :rules="nameRules" :counter="50" label="Nombre ambiente" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="ambiente.descripcionAmbiente" :rules="nameRules" :counter="100" label="Descripción del ambiente" required></v-text-field>
                    </v-col>
                </v-row>
                <br>
                <v-btn color="success" mx-2 elevation="19" type="submit">Agregar Ambiente</v-btn>
            </v-container>
        </v-form>
</v-container>
</template>

<script>
export default {

    data() {
        return {
            ambientes: [],
            mensaje: {color: 'success', texto: ''}, //parametros del objeto mensaje
            dismissSecs: 5, //tiempo de actividad de la alerta
            dismissCountDown: 0,

            ambiente: {nombreAmbiente:"", descripcionAmbiente:""}, //parametros del objeto ambiente
            editar: false,
            ambientesEditar: {}
        }
    },

    created() {
    },

    methods: {
        agregarAmbiente() {
                this.axios.post('/ambiente-nuevo', this.ambiente)
                .then(res => {
                    this.ambientes.push(res.data); // Agregando data al arreglo 
                    this.ambiente.nombreAmbiente="";
                    this.ambiente.descripcionAmbiente="";
                    this.mensaje.color="success";
                    this.mensaje.texto="Ambiente agregado";
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
