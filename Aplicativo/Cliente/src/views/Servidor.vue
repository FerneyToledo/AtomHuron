<template>
<v-container> 
    <v-layout>
        <h1> Registrar servidor</h1>
    </v-layout>
    <b-alert 
        :show="dismissCountDown" 
        dismissible
        :variant="mensaje.color" 
        @dismissed="dismissCountDown=0" 
        @dismiss-count-down="countDownChanged">
        {{mensaje.texto}}
    </b-alert>
        <v-form @submit.prevent="agregarServidor()">
            <v-container>
                <v-row>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="servidor.nombreServidor" :rules="nameRules" :counter="20" label="Nombre servidor" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="servidor.ipServidor" :rules="nameRules" :counter="16" label="IP Servidor" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select :items="listtipoServidor" v-model="servidor.tipoServidor" :rules="nameRules" :counter="40" label="Tipo de servidor" required></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select :items="listtipoSO" v-model="servidor.soServidor" :rules="nameRules" :counter="40" label="Sistema operativo" required></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="servidor.ramServidor" :rules="nameRules" :counter="3" label="# Memoría Ram (GB)" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="servidor.procServidor" :rules="nameRules" :counter="3" label="# de procesadores" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="servidor.discServidor" :rules="nameRules" :counter="4" label="Capacidad en disco (GB)" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3" class="d-flex">
                        <v-select :items="ambientedelServidor" v-model="servidor.ambienteServidor" :rules="nameRules" :counter="100" label="Ambiente" required></v-select>
                    </v-col>
                </v-row>
                <v-btn class="text-right" color="success" mx-2 elevation="19" type="submit" >Agregar Servidor</v-btn>
            </v-container>
        </v-form>
</v-container>
</template>

<script>
export default {

    data() {
        return {
            servidores: [],
            mensaje: {color: 'success', texto: ''}, //parametros del objeto mensaje
            dismissSecs: 5, //tiempo de actividad de la alerta
            dismissCountDown: 0,

            servidor: {nombreServidor:"", ipServidor:"", 
                        tipoServidor:"", soServidor:"", 
                        ramServidor:"", procServidor:"", 
                        discServidor:"", ambienteServidor:""}, //parametros del objeto servidor
            ambientedelServidor: ['QA'],
            listtipoServidor:['Aplicación', 'Base de Datos', 'Servidor de archivos', 'Servidor de correo'],
            listtipoSO:['Windows Server', 'Ubuntu', 'Debian', 'CentOS', 'RedHat Enterp Linux (RHEL)','Gentoo','Fedora'],
            ambientes: [],
            //ambiente:{nombreAmbiente:"QA"},
        }
    },

    created() {
        listarAmbientes();
    },

    methods: {
        agregarServidor() {
                this.axios.post('/servidor-nuevo', this.servidor)
                .then(res => {
                    this.servidores.push(res.data); // Agregando data al arreglo 
                    this.servidor.nombreServidor="";
                    this.servidor.ipServidor="";
                    this.servidor.tipoServidor="";
                    this.servidor.soServidor="";
                    this.servidor.ramServidor="";
                    this.servidor.procServidor="";
                    this.servidor.discServidor="";
                    this.servidor.ambienteServidor="";
                    this.mensaje.color="success";
                    this.mensaje.texto="Servidor agregado";
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

        listarAmbientes() {
            this.axios.get('/ambiente/')
                .then(res => {
                    //this.ambientes.push(res.data);
                    console.log(res.data)
                    this.ambientes = res.data;
                })
                .catch(e => {
                    console.log(e.response);
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
