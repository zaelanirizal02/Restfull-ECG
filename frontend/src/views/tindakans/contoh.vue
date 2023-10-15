<script>
import api from '../../api';
import { ref } from "vue";

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default {
    components: {
    },

    data() {
        return {
            items: [],
            item: ([
                {
                    label: 'Update',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times'
                },
                {
                    label: 'Vue Website',
                    icon: 'pi pi-external-link',
                    command: () => {
                        window.location.href = 'https://vuejs.org/';
                    }
                },
                {
                    label: 'Upload',
                    icon: 'pi pi-upload',
                    command: () => {
                        this.$router.push('fileupload');
                    }
                }
            ])
        };
    },


    computed: {
        formattedItems() {
            return this.items.map(item => {
                item.tgl_lahir = formatDate(item.tgl_lahir);
                item.tgl_periksa = formatDate(item.tgl_periksa);
                return item;
            });
        },
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
        <Toolbar>
            <template #start>
                <Button label="New" icon="pi pi-plus" class="mr-2" />
                <Button label="Upload" icon="pi pi-upload" severity="success" />
                <i class="pi pi-bars p-toolbar-separator mr-2" />
                <SplitButton label="Save" icon="pi pi-check" :model="item" severity="warning"></SplitButton>
            </template>

            <template #end>
                <Button icon="pi pi-search" class="mr-2" />
                <Button icon="pi pi-calendar" severity="success" class="mr-2" />
                <Button icon="pi pi-times" severity="danger" />
            </template>

            <template>
                <div class="card flex justify-content-center">
                    <Button label="Check" icon="pi pi-check" />
                </div>
            </template>
        </Toolbar>
    </div>



    <div class="">
        <div class="">
            <div class="card">
                <DataTable :value="formattedItems" sortMode="multiple" paginator :rows="10"
                    :rowsPerPageOptions="[5, 10, 20, 50]" showGridlines tableStyle="min-width: 150rem" stripedRows>
                    <Column field="tgl_periksa" header="Tgl Periksa" sortable headerStyle="min-width: 100px"></Column>
                    <Column field="no_mr" header="NO MR" sortable headerStyle="min-width: 80px"
                        tableStyle="'min-width:40rem'"></Column>
                    <Column field="nama_lengkap" header="Nama" sortable headerStyle="min-width: 100px"></Column>
                    <Column field="tgl_lahir" header="Tgl Lahir" sortable headerStyle="min-width:100px">
                    </Column>
                    <Column field="jenis_kelamin" header="Jenis Kelamin" sortable headerStyle="min-width: 120px"
                        tableStyle="'min-width:40rem'"></Column>
                    <Column field="title" header="Title" sortable></Column>
                    <Column field="race" header="Race" sortable></Column>
                    <Column field="jam_periksa" header="Jam Periksa" sortable></Column>
                    <Column field="id_dokter_jaga" header="ID Dokter Jaga" sortable></Column>
                    <Column field="nama_dokter_jaga" header="Nama Dokter Jaga" sortable></Column>
                    <Column field="ruangan_dokter_jaga" header="Ruangan Dokter Jaga" sortable></Column>
                    <Column field="id_dokter_dpjp" header="ID Dokter DPJP" sortable></Column>
                    <Column field="nama_dokter_dpjp" header="Nama Dokter DPJP" sortable></Column>
                    <Column field="ruangan_dokter_dpjp" header="Ruangan Dokter DPJP" sortable></Column>
                    <Column field="id_dokter_perujuk" header="ID Dokter Perujuk" sortable></Column>
                    <Column field="nama_dokter_perujuk" header="Nama Dokter Perujuk" sortable></Column>
                    <Column field="ruangan_dokter_perujuk" header="Ruangan Dokter Perujuk" sortable></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style>
table td {
    text-align: center;
}
</style>