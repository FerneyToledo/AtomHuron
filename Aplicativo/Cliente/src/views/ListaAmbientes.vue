<template>
<v-container>
    <v-layout>
        <h1>Listado de Ambientes</h1>
    </v-layout>
    <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
        {{mensaje.texto}}
    </b-alert>

    <v-form @submit.prevent="editarAmbiente(ambienteEditado)" v-if="editar">
        <v-container>
            <h3>Editar Ambiente</h3>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="ambienteEditado.nombreAmbiente" :rules="nameRules" :counter="50" label="Ambiente" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="ambienteEditado.descripcionAmbiente" :rules="nameRules" :counter="100" label="Descripción ambiente" required></v-text-field>
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

    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in ambientes" :key="index">
                <th scope="row">{{item._id}}</th>
                <td>{{item.nombreAmbiente}}</td>
                <td>{{item.descripcionAmbiente}}</td>
                <td>
                    <v-btn @click="activarEdicion(item._id)" color="warning" ma-2 elevation="10" >
                        <v-icon left>mdi-file-document-edit</v-icon>
                        Editar
                    </v-btn>
                    <v-btn class="ma-2" @click="eliminarAmbiente(item._id)" color="error" ma-2 elevation="10" >
                        <v-icon left>mdi-delete</v-icon>
                        Eliminar
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </table>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            ambientes: [],
            mensaje: {color: 'success',texto: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
            ambiente: {nombreAmbiente:"", descripcionAmbiente:""}, 
            editar: false,
            ambienteEditado: {}, //parametros del objeto ambiente
            
        }
    },

    created() {
        this.listarAmbientes();
    },

    methods: {
        listarAmbientes() {
            this.axios.get('/ambiente')
                .then(res => {
                    console.log(res.data)
                    this.ambientes = res.data;
                })
                .catch(e => {
                    console.log(e.response);
                })
        },

        eliminarAmbiente(id) {
            console.log(id)
            this.axios.delete(`/ambiente/${id}`)
                .then(res => {
                    const index = this.ambientes.findIndex(item => item._id === res.data._id);
                    this.ambientes.splice(index, 1);
                    this.mensaje.color = 'danger';
                    this.mensaje.texto = 'Ambiente eliminado';
                    this.showAlert();
                })
                .catch(e => {
                    console.log(e.response)
                })
        },

        activarEdicion(id) {
            this.editar = true
            console.log(id)
            this.axios.get(`/ambiente/${id}`)
                .then(res => {
                    this.ambienteEditado = res.data;
                })
                .catch(e => {

                    console.log(e.response)
                })
        },
        editarAmbiente(item) {
            this.axios.put(`/ambiente/${item._id}`, item)
                .then(res => {
                    const index = this.ambientes.findIndex(n => n._id === res.data._id);
                    this.ambientes[index].nombreAmbiente = res.data.nombreAmbiente;
                    this.ambientes[index].descripcionAmbiente = res.data.descripcionAmbiente;
                    this.mensaje.color = 'success',
                    this.mensaje.texto = 'Ambiente editado'
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
