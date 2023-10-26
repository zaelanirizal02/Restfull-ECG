
<script>
import api from "../../api";
import { ref } from "vue";

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export default {
    components: {},

    data() {
        return {
            items: [],
            namaLengkapFilter: '',
            menuDrop: [ //menu dropdown
                {
                    label: "Update",
                    icon: "pi pi-refresh",
                },
                {
                    label: "Delete",
                    icon: "pi pi-times",
                },
                {
                    label: "Vue Website",
                    icon: "pi pi-external-link",
                    command: () => {
                        window.location.href = "https://vuejs.org/";
                    },
                },
                {
                    label: "Upload",
                    icon: "pi pi-upload",
                    command: () => {
                        this.$router.push("fileupload");
                    },
                },
            ],

            //menu dropdown akun
            overlayMenuItems: [
                {
                    label: "Logout",
                    icon: "pi pi-sign-out",
                },

                {
                    label: "Aplication Setting",
                    icon: "pi pi-cog",
                    command: () => {
                        window.location.href = "/option";
                    },
                },
                {
                    separator: true,
                },
                {
                    label: "Home",
                    icon: "pi pi-home",
                },
            ],

            startDate: null, // Tanggal Awal
            endDate: null,   // Tanggal Akhir
            dateFormat: 'yy-MM-dd',
        };
    },

    computed: {
        formattedItems() {
            return this.items.map((item) => {
                item.tgl_lahir = formatDate(item.tgl_lahir);
                item.tgl_periksa = formatDate(item.tgl_periksa);
                item.nama_lengkap = item.nama_lengkap.trim();
                return item;
            });
        },
        // Filter items to only include those with status_pembatalan true
        filteredItemsTrue() {
            return this.formattedItems.filter(
                (item) => item.status_pembatalan === true
            );
        },

        filteredItemsFalse() {
            return this.formattedItems.filter(
                (item) => item.status_pembatalan === false && item.nama_lengkap.toLowerCase().includes(this.namaLengkapFilter.toLowerCase()));
        },


    },

    created() {
        this.fetchDataFromAPI(); // Panggil method untuk mengambil data saat komponen diinisialisasi
    },

    methods: {


        async fetchDataFromAPI() {
            try {
                const response = await api.get("api/tindakans");
                this.items = response.data.data.rows;
            } catch (error) {
                console.error("Error fetching data from API:", error);
            }
        },

        async deleteItem(item) {
            try {
                // Kirim permintaan API untuk menghapus item berdasarkan ID atau data yang sesuai
                const response = await api.delete(`api/tindakans/delete/${item.id}`);
                // Perbarui data Anda setelah penghapusan berhasil
                this.items = this.items.filter((i) => i.id !== item.id);
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        },

        async cancelItem(item) {
            try {
                // Kirim permintaan API untuk mengubah status tindakan menjadi dibatalkan berdasarkan ID atau data yang sesuai
                const response = await api.put(`api/tindakans/cancel/${item.id}`);

                // Perbarui status item di data
                item.status_pembatalan = true;

                this.filteredItemsFalse = this.filteredItemsFalse.filter(
                    (i) => i.id !== item.id
                );
                this.filteredItemsTrue.push(item);
            } catch (error) {
                console.error("Error cancelling item:", error);
            }
        },

        async editItem(item) {
            try {
                const response = await api.edit(`api/tindakans/edit/${item.id}`);
                this.items = this.items.filter((i) => i.id !== item.id);
            } catch (error) {
                console.error("Error Edit item: ", error);
            }
        },

        toggleMenu(event) {
            this.$refs.menu.toggle(event);
        },
    },
};

</script>
<template>
    <!-- NAVBAR -->
    <div class="card">
        <Toolbar>
            <template #start>
                <a href="/create">
                    <Button label="Tambah" icon="pi pi-plus" class="mr-2" />
                </a>
                <i class="pi pi-bars p-toolbar-separator mr-2" />
                <SplitButton label="Save" icon="pi pi-check" :model="menuDrop" severity="warning"></SplitButton>
            </template>

            <template #end>
                <Button icon="pi pi-search" class="mr-2" />
                <Button icon="pi pi-file-pdf" severity="success" class="mr-2" />
                <div class="card">
                    <!-- <Menu ref="menu" :model="overlayMenuItems" :popup="true" /> -->
                    <!-- <SplitButton label="TES" type="" icon="pi pi-user" @click="toggleMenu" style="width: 50px" /> -->
                    <SplitButton label="" icon="pi pi-cog" :model="overlayMenuItems" severity="">
                    </SplitButton>
                </div>
            </template>

        </Toolbar>
    </div>



    <div class="">
        <div class="card">
            <TabView class="col">
                <TabPanel header="TINDAKAN ECG">
                    <InputText v-model="namaLengkapFilter" placeholder="Cari.." />

                    <DataTable ref="dataTable" :value="filteredItemsFalse" sortMode="multiple" paginator :rows="10"
                        :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem" stripedRows>

                        <Column header="Action" body={deleteButtonTemplate} headerStyle="text-align: center;">
                            <template #body="slotProps">
                                <!-- <button @click="deleteItem(slotProps.data)" class="p-button-danger">Delete</button> -->
                                <button @click="cancelItem(slotProps.data)" class="p-button-secondary">Cancel
                                </button>
                            </template>

                        </Column>

                        <!-- <Column header="Action" headerStyle="text-align: center;">
                            <template #body="slotProps">
                                <button @click="cancelItem(slotProps.data)" class="p-button-secondary">Batalkan
                                    Tindakan</button>
                            </template>
                        </Column> -->


                        <Column field="tgl_periksa" header="Tgl Periksa" sortable
                            headerStyle="white-space: nowrap; text-align: center;"></Column>
                        <Column field="no_mr" header="NO MR" sortable headerStyle="white-space: nowrap; text-align: center;"
                            tableStyle="'min-width:40rem'"></Column>
                        <Column field="nama_lengkap" header="Nama" sortable
                            headerStyle="white-space: nowrap; text-align: center;"></Column>
                        <Column field="tgl_lahir" header="Tgl Lahir" sortable
                            headerStyle="white-space: nowrap; text-align: center;">
                        </Column>
                        <Column field="jenis_kelamin" header="Jenis Kelamin" sortable
                            headerStyle="white-space: nowrap; text-align: center;" tableStyle="'min-width:40rem'"></Column>
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
                </TabPanel>

                <TabPanel header="TINDAKAN DIBATALKAN">
                    <DataTable :value="filteredItemsTrue" sortMode="multiple" paginator :rows="10"
                        :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem" stripedRows>
                        <Column header="Action" body={deleteButtonTemplate} headerStyle="text-align: center;">
                            <template #body="slotProps">
                                <button @click="deleteItem(slotProps.data)" class="p-button-danger">Delete</button>
                            </template>
                        </Column>
                        <Column field="tgl_periksa" header="Tgl Periksa" sortable
                            headerStyle="white-space: nowrap; text-align: center;"></Column>
                        <Column field="no_mr" header="NO MR" sortable headerStyle="white-space: nowrap; text-align: center;"
                            tableStyle="'min-width:40rem'"></Column>
                        <Column field="nama_lengkap" header="Nama" sortable
                            headerStyle="white-space: nowrap; text-align: center;"></Column>
                        <Column field="tgl_lahir" header="Tgl Lahir" sortable
                            headerStyle="white-space: nowrap; text-align: center;">
                        </Column>
                        <Column field="jenis_kelamin" header="Jenis Kelamin" sortable
                            headerStyle="white-space: nowrap; text-align: center;" tableStyle="'min-width:40rem'"></Column>
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
                </TabPanel>
            </TabView>
        </div>
    </div>
</template>



<style>
table td {
    text-align: center;
}

.custom-table {
    height: 300px;
}

.p-datatable-thead>tr>th {
    padding: 5px 12px;
}

.p-datatable-tbody>tr>td {
    cursor: auto;
}

.p-datatable-tbody>tr>td {
    padding: 10px 10px;
}
</style>