<template>
<v-container>
    <v-layout>
        <h1>Listado de usuarios</h1>
    </v-layout>
    <b-alert :show="dismissCountDown" dismissible :variant="mensaje.color" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
        {{mensaje.texto}}
    </b-alert>

    <v-form @submit.prevent="editarAmbiente(usuarioEditado)" v-if="editar">
        <v-container>
            <h3>Editar Usuario</h3>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="usuarioEditado.nombresUsuario" :rules="nameRules" :counter="50" label="Nombre" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="usuarioEditado.apellidosUsuario" :rules="nameRules" :counter="100" label="Apellidos" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="usuarioEditado.correoUsuario" :rules="nameRules" :counter="100" label="Correo electrónico" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select :items="rolesUsuario" v-model="usuarioEditado.rolUsuario" :rules="nameRules" :counter="100" label="Rol" required></v-select>
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
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">E-mail</th>
                <th scope="col">Rol</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in usuarios" :key="index">
                <th scope="row">{{item._id}}</th>
                <td>{{item.nombresUsuario}}</td>
                <td>{{item.apellidosUsuario}}</td>
                <td>{{item.correoUsuario}}</td>
                <td>{{item.rolUsuario}}</td>
                <td>
                    <v-btn @click="activarEdicion(item._id)" color="warning" ma-2 elevation="10" >
                        <v-icon left>mdi-file-document-edit</v-icon>
                        Editar
                    </v-btn>
                    <v-btn class="ma-2" @click="eliminarUsuario(item._id)" color="error" ma-2 elevation="10" >
                        <v-icon left>mdi-delete</v-icon>
                        Eliminar
                    </v-btn>
                </td>
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
            usuarios: [],
            mensaje: {color: 'success',texto: ''},
            dismissSecs: 5,
            dismissCountDown: 0,
            usuario: {nombresUsuario:"", apellidosUsuario:"", 
                        correoUsuario:"", rolUsuario:""}, //parametros del objeto usuario
            editar: false,
            usuarioEditado: {}, //parametros del objeto ambiente
            rolesUsuario: ['Usuario de consulta', 'Admón. de ambientes', 'Full Acceso'],
            
        }
    },

    created() {
        this.listarUsuarios();
    },

    methods: {
        listarUsuarios() {
            this.axios.get('/usuario')
                .then(res => {
                    console.log(res.data)
                    this.usuarios = res.data;
                })
                .catch(e => {
                    console.log(e.response);
                })
        },

        eliminarUsuario(id) {
            console.log(id)
            this.axios.delete(`/usuario/${id}`)
                .then(res => {
                    const index = this.usuarios.findIndex(item => item._id === res.data._id);
                    this.usuarios.splice(index, 1);
                    this.mensaje.color = 'danger';
                    this.mensaje.texto = 'Usuario eliminado';
                    this.showAlert();
                })
                .catch(e => {
                    console.log(e.response)
                })
        },

        activarEdicion(id) {
            this.editar = true
            console.log(id)
            this.axios.get(`/usuario/${id}`)
                .then(res => {
                    this.usuarioEditado = res.data;
                })
                .catch(e => {

                    console.log(e.response)
                })
        },
        editarAmbiente(item) {
            this.axios.put(`/usuario/${item._id}`, item)
                .then(res => {
                    const index = this.usuarios.findIndex(n => n._id === res.data._id);
                    this.usuarios[index].nombresUsuario= res.data.nombresUsuario;
                    this.usuarios[index].apellidosUsuario = res.data.apellidosUsuario;
                    this.usuarios[index].correoUsuario = res.data.correoUsuario;
                    this.usuarios[index].rolUsuario = res.data.rolUsuario;
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
