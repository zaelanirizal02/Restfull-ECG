<script setup>

//import ref and onMounted
import { ref, onMounted } from 'vue';

//import api
import api from '../../api';

//define state
const tindakans = ref([]);

//method fetchDataPosts
const fetchDataTindakans = async () => {

    //fetch data 
    try {
        const response = await api.get('/api/tindakans');
        tindakans.value = response.data.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//run hook "onMounted"
onMounted(() => {

    //call method "fetchDataPosts"
    fetchDataTindakans();
});

</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <router-link :to="{ name: 'tindakans.create' }"
                    class="btn btn-md btn-success rounded shadow border-0 mb-3">TAMBAH TINDAKAN</router-link>
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Nama Lengkap</th>
                                    <th scope="col">Tanggal Lahir</th>
                                    <th scope="col" style="width:15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="tindakans.length == 0">
                                    <td colspan="4" class="text-center">
                                        <div class="alert alert-danger mb-0">
                                            Data Belum Tersedia!
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else v-for="(tindakan, index) in tindakans" :key="index">
                                    <td class="text-center">
                                        <img :src="tindakan.image" width="200" class="rounded-3" />
                                    </td>
                                    <td>{{ tindakan.nama_lengkap }}</td>
                                    <td>{{ tindakan.tgl_lahir }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'tindakans.edit', params: { id: tindakan.id } }"
                                            class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</router-link>
                                        <button class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>