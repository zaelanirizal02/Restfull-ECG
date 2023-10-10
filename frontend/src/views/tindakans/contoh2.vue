<template>
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="desserts" item-value="name"
        class="elevation-1"></v-data-table>
</template>

<script>
import {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import api from '../../api';


export default {
    components: {
        VDataTable,
        VDataTableServer,
        VDataTableVirtual,
    },
    data() {
        return {
            itemsPerPage: 14,
            headers: [
                {
                    title: 'No', align: 'start', key: 'nomor',
                },
                { title: 'No MR', align: 'end', key: 'no_mr' },
                { title: 'Nama', align: 'end', key: 'nama_lengkap' },
                { title: 'Tgl Lahir', align: 'end', key: 'tgl_lahir' },
                { title: 'Jenis Kelamin', align: 'end', key: 'jenis_kelamin' },
                { title: 'title', align: 'end', key: 'title' },
                { title: 'race', align: 'end', key: 'race' },
                { title: 'Tgl Periksa', align: 'end', key: 'tgl_periksa' },
                { title: 'Jam Periksa', align: 'end', key: 'jam_periksa' },
                { title: 'ID Dokter Jaga', align: 'end', key: 'id_dokter_jaga' },
                { title: 'Nama Dokter Jaga', align: 'end', key: 'nama_dokter_jaga' },
                { title: 'Ruangan Dokter Jaga', align: 'end', key: 'ruangan_dokter_jaga' },
                { title: 'ID Dokter DPJP', align: 'end', key: 'id_dokter_dpjp' },
                { title: 'Nama Dokter DPJP', align: 'end', key: 'nama_dokter_dpjp' },
                { title: 'Ruangan Dokter DPJP', align: 'end', key: 'ruangan_dokter_dpjp' },
                { title: 'ID Dokter Perujuk', align: 'end', key: 'id_dokter_perujuk' },
                { title: 'Nama Dokter Perujuk', align: 'end', key: 'nama_dokter_perujuk' },
                { title: 'Ruangan Dokter Perujuk', align: 'end', key: 'ruangan_dokter_perujuk' },
            ],
            desserts: [],
        }
    },



    created() {
        this.fetchDataFromAPI(); // Panggil method untuk mengambil data saat komponen diinisialisasi
    },

    methods: {
        async fetchDataFromAPI() {
            try {
                const response = await api.get('api/tindakans');
                this.desserts = response.data.data.rows; // Mengganti data desserts dengan data dari API
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        },
    },

}
</script>