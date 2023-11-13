
<script>
import tindakanController from "../../controller/tindakanController";
export default tindakanController;
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
                    <SplitButton label="" icon="pi pi-cog" :model="menuSetting" severity="">
                    </SplitButton>
                </div>
            </template>

        </Toolbar>
    </div>

    <div class="">
        <div class="card">
            <TabView class="col">
                <TabPanel header="TINDAKAN ECG">
                    <div>
                        <span class="p-float-label p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText id="namaLengkapFilter" name="namaLengkapFilter" v-model="namaLengkapFilter"
                                class="mr-2" />
                            <label for="namaLengkapFilter">Cari Nama</label>
                        </span>

                        <!-- <label for="dateFilterStart" class="mr-2">Tanggal Awal</label>
                        <Calendar v-model="dateFilterStart" class="mr-2" id="dateFilterStart" dateFormat="yy-mm-dd"
                            :manualInput="true" showButtonBar showIcon>
                        </Calendar> -->

                        <label for="range" class="mr-2">Tanggal-</label>
                        <Calendar v-model="dateFilterRange" selectionMode="range" class="mr-2" id="range"
                            dateFormat="yy-mm-dd" :manualInput="false" showButtonBar showIcon>
                        </Calendar>

                        <Button icon="pi pi-search" @click="caritglPeriksa" />
                    </div>

                    <!-- <ConfirmDialog ref="confirmCancelDialog"></ConfirmDialog> -->

                    <div class="card flex justify-content-center">
                    </div>

                    <DataTable ref="dataTable" :value="filteredItemsFalse" sortMode="multiple" paginator :rows="10"
                        :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem" stripedRows
                        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        :rowExpansionTemplate="rowExpansionTemplate" :groupField="groupField" :sortMode="sortMode"
                        :groupBy="groupBy">
                        <Column header="Action" body={cancelButtonTemplate} headerStyle="text-align: center;">
                            <template #body="slotProps">
                                <Toast />
                                <div class="card flex flex-wrap gap-2 justify-content-center">
                                    <Button @click="confirmCancel(slotProps.data)" icon="" label="Cancel" severity="warning"
                                        style="height: 30px;"></Button>
                                </div>
                            </template>
                        </Column>
                        <Column field="tgl_periksa" header="Tgl Periksa" sortable
                            headerStyle="white-space: nowrap; text-align: center">
                        </Column>

                        <Column field="no_mr" header="NO MR" sortable headerStyle="white-space: nowrap; text-align: center;"
                            tableStyle="'min-width:40rem'">
                        </Column>
                        <Column field="nama_lengkap" header="Nama" sortable
                            headerStyle="white-space: nowrap; text-align: center;"></Column>
                        <Column field="tgl_lahir" header="Tgl Lahir" sortable
                            headerStyle="white-space: nowrap; text-align: center;">
                        </Column>
                        <Column field="jenis_kelamin" header="Jenis Kelamin" sortable
                            headerStyle="white-space: nowrap; text-align: center;" tableStyle="'min-width:40rem'">
                        </Column>
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
                    <ConfirmDialog ref="confirmDeleteDialog"></ConfirmDialog>
                    <DataTable :value="filteredItemsTrue" sortMode="multiple" paginator :rows="10"
                        :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem" stripedRows>
                        <div>
                            <InputText v-model="namaLengkapFilter" class="mr-2" placeholder="Cari Nama ..." />

                            <!-- <label for="dateFilterStart" class="mr-2">Tanggal Awal</label>
                        <Calendar v-model="dateFilterStart" class="mr-2" id="dateFilterStart" dateFormat="yy-mm-dd"
                            :manualInput="true" showButtonBar showIcon>
                        </Calendar> -->

                            <label for="dateFilterEnd" class="mr-2">Tanggal-</label>
                            <Calendar v-model="dateFilterRange" :maxDate="maxDate" selectionMode="range" class="mr-2"
                                id="dateFilterEnd" dateFormat="yy-mm--dd" :manualInput="true" showButtonBar showIcon>
                            </Calendar>

                            <Button icon="pi pi-search" @click="caritglPeriksa" />
                        </div>
                        <Column header="Action" body={deleteButtonTemplate} headerStyle="text-align: center;">
                            <template #body="slotProps">
                                <Toast />
                                <div class="card flex flex-wrap gap-2 justify-content-center">
                                    <Button @click="confirmDelete(slotProps.data)" icon="pi pi-trash" label="Delete"
                                        severity="danger" style="height: 30px;"></Button>
                                </div>
                            </template>
                        </Column>
                        <Column field="tgl_periksa" header="Tgl Periksa" sortable
                            headerStyle="white-space: nowrap; text-align: center;"></Column>
                        <Column field="no_mr" header="NO MR" sortable headerStyle="white-space: nowrap; text-align: center;"
                            tableStyle="'min-width:40rem'"></Column>
                        <Column field="nama_lengkap" header="Nama" sortable
                            headerStyle="white-space: nowrap; text-align: center;">
                        </Column>
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
</template >



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
