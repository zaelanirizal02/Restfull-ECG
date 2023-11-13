<script>
// import axios from 'axios'
import api from '../../api';
// import { Ref } from 'vue';
import "../../assets/form.css";


export default {
    data() {
        return {
            FormData: {
                no_mr: '',
                nama_lengkap: '',
                tgl_lahir: '',
                jenis_kelamin: '',
                title: '',
                race: '',
                tgl_periksa: '',
                jam_periksa: '',
                id_dokter_jaga: '',
                nama_dokter_jaga: '',
                ruangan_dokter_jaga: '',
                id_dokter_dpjp: '',
                nama_dokter_dpjp: '',
                ruangan_dokter_dpjp: '',
                id_dokter_perujuk: '',
                nama_dokter_perujuk: '',
                ruangan_dokter_perujuk: '',
                status_pembatalan: (false),
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

            RaceOption: [
                { label: 'Unknow', value: 'Unknow' },
                { label: 'Caucasian', value: 'Caucasian' },
                { label: 'Northeast Asian', value: 'Northeast Asian' },
                { label: 'Southeast Asian', value: 'Southeast Asian' },
                { label: 'Japanese', value: 'Japanese' },
                { label: 'African', value: 'African' },
                { label: 'American', value: 'American' },
                { label: 'North Indian', value: 'North Indian' },
                { label: 'South Indian', value: 'South Indian' },
                { label: 'Mexican', value: 'Mexican' },
                { label: 'Latino', value: 'Latino' },
                { label: 'Iberian', value: 'Iberian' },
                { label: 'Polynesian', value: 'Polynesian' },
                { label: 'Pakistanis', value: 'Pakistanis' },
                { label: 'Lainnya', value: 'Lainnya' },
            ],
            selectedRace: null,

            SexOption: [
                { label: 'Laki-Laki', value: 'M' },
                { label: 'Perempuan', value: 'F' },
            ],
            selectedSex: null,
        };
    },

    // created() {
    //     this.tindakanStore();
    // },

    methods: {
        async kirimData() {
            this.FormData.status_pembatalan = false;
            try {
                const response = await api.post('api/tindakans/store', this.FormData);

                console.log('Data Berhasil Ditambah', response.data.data);
                this.$router.push({ path: '/' });
            } catch (error) {
                console.error('Terjadi Kesalahan', error);
            }
        },

        logout() {
            // 1. Hapus token otentikasi dari local storage atau state
            localStorage.removeItem("accessToken"); // Gantilah ini sesuai dengan cara Anda menyimpan token

            // 2. Alihkan pengguna ke halaman login atau halaman beranda
            this.$router.push({ name: "login" }); // Gantilah "login" dengan nama rute halaman login Anda
        },

    }
}
</script>
<style>
.container {
    height: 550px;
}
</style>


<template>
    <div class="card">
        <Toolbar>
            <template #start>
                <a href="/">
                    <Button label="" icon="pi pi-home" severity="success" class="mr-2" />
                </a>
                <a href="/create">
                    <Button label="Tambah" icon="pi pi-plus" class="mr-2" />
                </a>

            </template>

            <template #end>
                <!-- <Button icon="pi pi-search" class="mr-2" /> -->
                <!-- <Button icon="pi pi-file-pdf" severity="success" class="mr-2" /> -->
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
            <h2 class="jpa"><b>TAMBAH TINDAKAN</b></h2>
        </div>
        <Divider />

        <div class="jrkform">
            <!-- Bagian 1 -->
            <div class="field jpa">
                <label for="" class="col-12 mb-1 md:col-1 md:mb-3">No MR</label>
                <InputText v-model="FormData.no_mr" class="jkn" label="NO RM" type="text" placeholder="NO RM" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Nama Pasien</label>
                <InputText v-model="FormData.nama_lengkap" class="jkn" label="NO RM" type="text"
                    placeholder="Nama Pasien" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Jenis Kelamin</label>
                <Dropdown class="font-dropdown" v-model="FormData.jenis_kelamin" :options="SexOption" optionLabel="label"
                    optionValue="value" placeholder="Pilih --" style="font-size: 22px;" />
            </div>

            <!-- Bagian 2 -->
            <div class="field">
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Tanggal Lahir</label>
                <InputText v-model="FormData.tgl_lahir" class="jkn" type="date" placeholder="Tgl Lahir" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Title</label>
                <InputText v-model="FormData.title" class="jkn" type="text" placeholder="Title" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Race</label>
                <Dropdown class="font-dropdown" v-model="FormData.race" :options="RaceOption" optionLabel="label"
                    optionValue="value" placeholder="Pilih --" />
            </div>
            <!-- Bagian 3 -->
            <div class="field">
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">ID Dokter Jaga</label>
                <InputText v-model="FormData.id_dokter_jaga" class="jkn" type="text" placeholder="ID Dokter Jaga" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Nama Dokter Jaga</label>
                <InputText v-model="FormData.nama_dokter_jaga" class="jkn" type="text" placeholder="Nama Dokter" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Ruangan Dokter Jaga</label>
                <InputText v-model="FormData.ruangan_dokter_jaga" class="" type="text" placeholder="Ruangan Dokter Jaga" />
                <!-- Tambahkan lebih banyak input sesuai kebutuhan -->
            </div>
            <!-- Bagian 4 -->
            <div class="field">
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">ID Dokter DPJP</label>
                <InputText v-model="FormData.id_dokter_dpjp" class="jkn" type="text" placeholder="ID Dokter DPJP" />
                <label for="" class="col-12 mb-1 md:col-1">Nama Dokter DPJP</label>
                <InputText v-model="FormData.nama_dokter_dpjp" class="jkn" type="text" placeholder="Nama Dokter DPJP" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Ruangan Dokter DPJP</label>
                <InputText v-model="FormData.ruangan_dokter_dpjp" type="text" placeholder="Ruangan Dokter DPJP" />
                <!-- Tambahkan lebih banyak input sesuai kebutuhan -->
            </div>
            <!-- Bagian 5 -->
            <div class="field">
                <label for="" class="col-12 mb-1 md:col-1 md:mb-3">ID Dokter Perujuk</label>
                <InputText v-model="FormData.id_dokter_perujuk" class="jkn" type="text" placeholder="ID Dokter Perujuk" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Nama Dokter Perujuk</label>
                <InputText v-model="FormData.nama_dokter_perujuk" class="jkn" type="text"
                    placeholder="Nama Dokter Perujuk" />
                <label for="" class="col-12 mb-1 md:col-1">Ruangan Dokter Perujuk</label>
                <InputText v-model="FormData.ruangan_dokter_perujuk" class="jkn" type="text"
                    placeholder="Ruangan Dokter Perujuk" />
            </div>
            <!-- Bagian 6 -->
            <div class="field jpb">
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Tanggal Periksa</label>
                <InputText v-model="FormData.tgl_periksa" class="jkn" type="date" placeholder="Tgl Periksa" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Jam Periksa</label>
                <InputText v-model="FormData.jam_periksa" class="jkn" type="time" placeholder="" />

                <Button label="Kirim" @click="kirimData()" class="ml-2 col-1" icon="pi pi-send" />
                <Button label="" disabled class="ml-2 col" icon="pi pi-ellipsis-v" />
                <Button label="Reset" icon="pi pi-trash" severity="danger" class="col-1 ml-2" />

                <!-- <Button label="Tambah" icon="pi pi-plus" class="mr-2" /> -->
                <!-- Tambahkan lebih banyak input sesuai kebutuhan -->
            </div>

        </div>
    </div>
</template>

    