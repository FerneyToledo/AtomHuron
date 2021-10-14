<template>
<v-container>
    <v-layout>
        <h1>Listado de servidores</h1>
    </v-layout>
    <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
        {{mensaje.texto}}
    </b-alert>

    <v-form @submit.prevent="editarServidor(servidorEditado)" v-if="editar">
        <v-container>
            <h3>Editar Usuario</h3>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="servidorEditado.nombreServidor" :rules="nameRules" :counter="20" label="Nombre servidor" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="servidorEditado.ipServidor" :rules="nameRules" :counter="16" label="IP Servidor" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select :items="listtipoServidor" v-model="servidorEditado.tipoServidor" :rules="nameRules" :counter="40" label="Tipo de servidor" required></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select :items="listtipoSO" v-model="servidorEditado.soServidor" :rules="nameRules" :counter="40" label="Sistema operativo" required></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="servidorEditado.ramServidor" :rules="nameRules" :counter="3" label="# Memoría Ram (GB)" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="servidorEditado.procServidor" :rules="nameRules" :counter="3" label="# de procesadores" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="servidorEditado.discServidor" :rules="nameRules" :counter="4" label="Capacidad en disco (GB)" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" class="d-flex">
                        <v-select :items="ambientedelServidor" v-model="servidorEditado.ambienteServidor" :rules="nameRules" :counter="100" label="Ambiente" required></v-select>
                    </v-col>
                </v-row>

            <v-btn class="ma-2" color="success" ma-2 elevation="19" type="submit">
                <v-icon left>mdi-pencil</v-icon>Editar
            </v-btn>
            <v-btn color="error" mx-2 elevation="19" type="submit" @click="editar=false">
                <v-icon left>mdi-cancel</v-icon>Cancelar
            </v-btn>
        </v-container>
    </v-form>
    <v-container>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Nombre servidor</th>
                <th scope="col">IP</th>
                <th scope="col">Tipo</th>
                <th scope="col">Sistema Operativo</th>
                <th scope="col">RAM (GB)</th>
                <th scope="col">Procesadores</th>
                <th scope="col">Cant en disco (GB)</th>
                <th scope="col">Ambiente</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in servidores" :key="index">
                <td>{{item.nombreServidor}}</td>
                <td>{{item.ipServidor}}</td>
                <td>{{item.tipoServidor}}</td>
                <td>{{item.soServidor}}</td>
                <td>{{item.ramServidor}}</td>
                <td>{{item.procServidor}}</td>
                <td>{{item.discServidor}}</td>
                <td>{{item.ambienteServidor}}</td>
                    <v-btn @click="activarEdicion(item._id)" color="warning" ma-2 elevation="10" x-small >
                        <v-icon left>mdi-file-document-edit</v-icon>
                        Editar
                    </v-btn>
                    <v-btn class="ma-2" @click="eliminarServidor(item._id)" color="error" ma-2 elevation="10" x-small >
                        <v-icon left>mdi-delete</v-icon>
                        Eliminar
                    </v-btn>
            </tr>
        </tbody>
    </table>
    </v-container>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            servidores: [],
            mensaje: {color: 'success',texto: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
            servidor: {nombreServidor:"", ipServidor:"", 
                        tipoServidor:"", soServidor:"", 
                        ramServidor:"", procServidor:"", 
                        discServidor:"", ambienteServidor:""}, //parametros del objeto servidor
            ambientedelServidor: ['QA'],
            listtipoServidor:['Aplicación', 'Base de Datos', 'Servidor de archivos', 'Servidor de correo'],
            listtipoSO:['Windows Server', 'Ubuntu', 'Debian', 'CentOS', 'RedHat Enterp Linux (RHEL)','Gentoo','Fedora'],
            editar: false,
            servidorEditado: {}, //parametros del objeto ambiente
        }
    },

    created() {
        this.listarServidores();
    },

    methods: {
        listarServidores() {
            this.axios.get('/servidor')
                .then(res => {
                    console.log(res.data)
                    this.servidores = res.data;
                })
                .catch(e => {
                    console.log(e.response);
                })
        },

        eliminarServidor(id) {
            console.log(id)
            this.axios.delete(`/servidor/${id}`)
                .then(res => {
                    const index = this.servidores.findIndex(item => item._id === res.data._id);
                    this.servidores.splice(index, 1);
                    this.mensaje.color = 'danger';
                    this.mensaje.texto = 'Servidor eliminado';
                    this.showAlert();
                })
                .catch(e => {
                    console.log(e.response)
                })
        },

        activarEdicion(id) {
            this.editar = true
            console.log(id)
            this.axios.get(`/servidor/${id}`)
                .then(res => {
                    this.servidorEditado = res.data;
                })
                .catch(e => {

                    console.log(e.response)
                })
        },
        editarServidor(item) {
            this.axios.put(`/servidor/${item._id}`, item)
                .then(res => {
                    const index = this.servidores.findIndex(n => n._id === res.data._id);
                    this.servidores[index].nombreServidor= res.data.nombreServidor;
                    this.servidores[index].ipServidor= res.data.ipServidor;
                    this.servidores[index].tipoServidor = res.data.tipoServidor;
                    this.servidores[index].soServidor = res.data.soServidor;
                    this.servidores[index].ramServidor = res.data.ramServidor;
                    this.servidores[index].procServidor= res.data.procServidor;
                    this.servidores[index].discServidor = res.data.discServidor;
                    this.servidores[index].ambienteServidor = res.data.ambienteServidor;
                    this.mensaje.color = 'success',
                    this.mensaje.texto = 'Servidor editado'
                    this.showAlert();
                    this.editar = false;
                })
                .catch(e => {
                    console.log(e.response);

                })
        },

        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        }

    }

}
</script>
