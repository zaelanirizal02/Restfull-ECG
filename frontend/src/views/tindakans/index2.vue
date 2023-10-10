
<script setup>


// import axios from "axios";
import { onMounted, ref } from "vue";
import api from '../../api';

// const url = "http://localhost:3000/api";


const items = ref([]); // Store the fetched data in the "items" ref

const formatDate = (dateString) => {
    // tanggal (YYYY-MM-DD) dari string tanggal lengkap
    const tanggalLahir = new Date(dateString);
    const year = tanggalLahir.getFullYear();
    const month = String(tanggalLahir.getMonth() + 1).padStart(2, '0'); // +1 karena indeks bulan dimulai dari 0
    const day = String(tanggalLahir.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const getTindakan = async () => {
    try {
        const response = await api.get("api/tindakans");
        // items.value = response.data.data.rows;
        if (response.status === 200) {
            // Check if the response status is 200 (OK)
            items.value = response.data.data.rows; // Store the data in "items"
        } else {
            console.log('Permintaan gagal atau status ada error');
        }
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    getTindakan();
});

</script>

<style>
.tombol-container {
    margin-top: 10px;
    /* margin-bottom: 10px; */
    margin-left: 15px;
    margin-right: 15px;
}

.tombol-spasi {
    padding-right: 20px;
}
</style>

<template>
    <div class="tombol-container d-flex flex-row">
        <router-link :to="{ name: 'tindakans.create' }" class="btn btn-success rounded shadow border-0"><i
                class="bi bi-plus-circle"></i> Tambah
            Tindakan</router-link>
        <router-link :to="{ name: 'tindakans.create' }" class="btn btn-danger rounded shadow border-0 ms-2"><i
                class="bi bi-x-octagon"></i> Batalkan Tindakan
            Tindakan</router-link>
        <a href="/option" class="btn btn-dark rounded shadow border-0 ms-auto">
            <i class="bi bi-gear"></i> Setting
        </a>
        <a href="/option" class="btn btn-dark rounded shadow border-0 ms-2">
            <i class="bi bi-gear"></i> Setting
        </a>
        <a href="/option" class="btn btn-dark rounded shadow border-0 ms-2">
            <i class="bi bi-gear"></i> Setting
        </a>

    </div>


    <div class="container-fluid mt-2 mb-3">
        <div class="row">
            <div class="col-md-12">
                <table class="table table-bordered">
                    <thead class="bg-dark text-white">
                        <tr>
                            <th scope="col">NO</th>
                            <th scope="col">No MR</th>
                            <th scope="col">Nama Lengkap</th>
                            <th scope="col">Tgl Lahir</th>
                            <th scope="col">Jenis Kelamin</th>
                            <th scope="col">title</th>
                            <th scope="col">race</th>
                            <th scope="col">Tgl Periksa</th>
                            <th scope="col">Jam Periksa</th>
                            <th scope="col">ID Dokter Jaga</th>
                            <th scope="col">Nama Dokter Jaga</th>
                            <th scope="col">Ruangan Dokter Jaga</th>
                            <th scope="col">ID Dokter DPJP</th>
                            <th scope="col">Nama Dokter DPJP</th>
                            <th scope="col">Ruangan Dokter DPJP</th>
                            <th scope="col">ID Dokter Perujuk</th>
                            <th scope="col">Nama Dokter Perujuk</th>
                            <th scope="col">Ruangan Dokter Perujuk</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item, index in items" :key="item.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.no_mr }}</td>
                            <td>{{ item.nama_lengkap }}</td>
                            <td>{{ formatDate(item.tgl_lahir) }}</td>
                            <td>{{ item.jenis_kelamin }}</td>
                            <td>{{ item.title }}</td>
                            <td>{{ item.race }}</td>
                            <td>{{ formatDate(item.tgl_periksa) }}</td>
                            <td>{{ item.jam_periksa }}</td>
                            <td>{{ item.id_dokter_jaga }}</td>
                            <td>{{ item.nama_dokter_jaga }}</td>
                            <td>{{ item.ruangan_dokter_jaga }}</td>
                            <td>{{ item.id_dokter_dpjp }}</td>
                            <td>{{ item.nama_dokter_dpjp }}</td>
                            <td>{{ item.ruangan_dokter_dpjp }}</td>
                            <td>{{ item.id_dokter_perujuk }}</td>
                            <td>{{ item.nama_dokter_perujuk }}</td>
                            <td>{{ item.ruangan_dokter_perujuk }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
