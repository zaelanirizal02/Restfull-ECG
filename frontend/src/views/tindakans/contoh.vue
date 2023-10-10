<script>


import api from '../../api';


export default {
    components: {

    },

    data() {
        return {
            items: [],
        };
    },


    created() {
        this.fetchDataFromAPI(); // Panggil method untuk mengambil data saat komponen diinisialisasi
    },

    methods: {
        async fetchDataFromAPI() {
            try {
                const response = await api.get('api/tindakans');
                this.items = response.data.data.rows;
            } catch (error) {
                console.error('Error fetching data from API:', error);
            }
        },
    },

};
</script>

<template>
    <div class="card">
        <DataTable :value="items" sortMode="multiple" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem">
            <Column field="rowIndex" header="No" sortable></Column>
            <Column field="no_mr" header="NO MR" sortable></Column>
            <Column field="nama_lengkap" header="Nama" sortable style="width: 3%"></Column>
            <Column field="tgl_lahir" header="Tgl Lahir" sortable style="width: 3%"></Column>
            <Column field="jenis_kelamin" header="Jenis Kelamin" sortable style="width: 3%"></Column>
            <Column field="title" header="Title" sortable style="width: 3%"></Column>
            <Column field="race" header="Race" sortable style="width: 3%"></Column>
            <Column field="tgl_periksa" header="Tgl Periksa" sortable style="width: 3%"></Column>
            <Column field="jam_periksa" header="Jam Periksa" sortable style="width: 3%"></Column>
            <Column field="id_dokter_jaga" header="ID Dokter Jaga" sortable style="width: 3%"></Column>
            <Column field="nama_dokter_jaga" header="Nama Dokter Jaga" sortable style="width: 3%"></Column>
            <Column field="ruangan_dokter_jaga" header="Ruangan Dokter Jaga" sortable style="width: 3%"></Column>
            <Column field="id_dokter_dpjp" header="ID Dokter DPJP" sortable style="width: 3%"></Column>
            <Column field="nama_dokter_dpjp" header="Nama Dokter DPJP" sortable style="width: 3%"></Column>
            <Column field="ruangan_dokter_dpjp" header="Ruangan Dokter DPJP" sortable style="width: 3%"></Column>
            <Column field="id_dokter_perujuk" header="ID Dokter Perujuk" sortable style="width: 3%"></Column>
            <Column field="nama_dokter_perujuk" header="Nama Dokter Perujuk" sortable style="width: 3%"></Column>
            <Column field="ruangan_dokter_perujuk" header="Ruangan Dokter Perujuk" sortable style="width: 3%"></Column>
        </DataTable>
    </div>
</template>

