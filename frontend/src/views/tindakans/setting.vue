<script>
// import axios from 'axios'
import api from '../../api';
import "../../assets/form.css";

export default {
    data() {
        return {
            tindakan: {},
            validation: [],
            showFormError: false,
            setting: {
                nama_RS: '',
                nama_aplikasi: '',
                port_sevrer_hl7: '',
                target_ip_hl7: '',
                target_port_hl7: '',
            },

            overlayMenuItems: ([
                {
                    label: "Logout",
                    icon: "pi pi-sign-out",
                    command: () => {
                        this.logout(); // Panggil metode logout saat item Logout diklik
                    },
                },

                {
                    label: 'Aplication Setting',
                    icon: 'pi pi-cog',
                    command: () => {
                        window.location.href = '/setting';
                    }
                },
                {
                    separator: true
                },
                {
                    label: 'Home',
                    icon: 'pi pi-home'
                }
            ]),
        }
    },

    methods: {
        validateForm() {
            // Bersihkan pesan kesalahan sebelumnya
            this.validation = {};

            // Validasi untuk setiap kolom form
            if (!this.tindakan.no_mr) {
                this.validation.no_mr = ['Nama Rumah Sakit wajib diisi'];
            }
            if (!this.tindakan.nama_lengkap) {
                this.validation.nama_lengkap = ['Nama Aplikasi wajib diisi'];
            }
            if (!this.tindakan.tgl_lahir) {
                this.validation.tgl_lahir = ['Port Server wajib diisi'];
            }
            if (!this.tindakan.jenis_kelamin) {
                this.validation.jenis_kelamin = [' Target IP wajib diisi'];
            }
            if (!this.tindakan.title) {
                this.validation.title = ['Target Port wajib diisi'];
            }


            // Kembalikan false jika ada kolom yang belum diisi
            return Object.keys(this.validation).length === 0;
        },

        tindakanStore() {
            //cek error isian form dan beri notif
            if (!this.validateForm()) {
                this.showFormError = true;
                return
            }

            api.post('api/tindakans/store', this.tindakan)
                .then((response) => {
                    console.log('Data berhasil ditambah', response.data.data);
                    this.$router.push({
                        name: 'home'
                    });
                    // console.log(response.data.data);
                }).catch(error => {
                    this.validation = error.response.data.data;
                });
        },

        logout() {
            // 1. Hapus token otentikasi dari local storage atau state
            localStorage.removeItem("accessToken"); // Gantilah ini sesuai dengan cara Anda menyimpan token

            // 2. Alihkan pengguna ke halaman login atau halaman beranda
            this.$router.push({ name: "login" }); // Gantilah "login" dengan nama rute halaman login Anda
        },

    },
}
</script>
<style>
form label {
    font-weight: bold;
}

.form-group {
    margin-bottom: 20px;
}

.container {
    height: 500px;
}
</style>

<template>
    <div class="card">
        <Toolbar>
            <template #start>
                <a href="/">
                    <Button label="" icon="pi pi-home" class="mr-2" />
                </a>
                <a href="/create">
                    <Button label="Tambah" icon="pi pi-plus" severity="success" />
                </a>
            </template>

            <template #end>
                <div class="card">
                    <SplitButton label="" icon="pi pi-cog" :model="overlayMenuItems" severity="warning"></SplitButton>
                </div>
            </template>

            <template>
                <div class="card flex justify-content-center">
                    <Button label="Check" icon="pi pi-check" />
                </div>
            </template>
        </Toolbar>
    </div>

    <div class="container">
        <div class="card-header text-center">
            <h2 class="jpa"><b>SETTING</b></h2>
        </div>
        <Divider />
        <div class="jrkform">
            <!-- Bagian 1 -->
            <div class="field jpa jpb grid">
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Nama Rumah Sakit</label>
                <InputText v-model="setting.nama_RS" class="jkn" label="Nama Rumah Sakit" type="text"
                    placeholder="Nama RS" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Nama Aplikasi</label>
                <InputText v-model="setting.nama_aplikasi" class="jkn" label="Nama Aplikasi" type="text"
                    placeholder="Nama Aplikasi" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Port Server HL7</label>
                <InputText class="font-dropdown" v-model="setting.port_sevrer_hl7" type="number" placeholder="Port" />
            </div>

            <div class="field jpa jpb grid">
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Target IP HL7</label>
                <InputText v-model="setting.target_ip_hl7" class="jkn" label="Target IP HL7" type="number"
                    placeholder="Target IP" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Target Port HL7</label>
                <InputText v-model="setting.target_port_hl7" class="jkn" label="Target Port HL7" type="number"
                    placeholder="Target Port" />
                <Button label="Apply" @click="kirimData()" class="ml-2 font-bold" style="width: 250px;"
                    icon="pi pi-check" />

            </div>
        </div>
    </div>
</template>


