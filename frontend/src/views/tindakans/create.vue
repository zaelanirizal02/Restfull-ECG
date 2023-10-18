<script>
// import axios from 'axios'
import api from '../../api';
// import { Ref } from 'vue';

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
            }
        };
    },

    // created() {
    //     this.tindakanStore();
    // },

    methods: {
        async kirimData() {
            try {
                const response = await api.post('api/tindakans/store', this.FormData);

                console.log('Data Berhasil Ditambah', response.data.data);
                this.$router.push({ path: 'contoh' });
            } catch (error) {
                console.error('Terjadi Kesalahan', error);
            }
        }
    }
}
</script>

<style>
.container {
    margin-top: 50px;
    margin-left: 20px;
    margin-right: 20px;
    border-color: black;
    width: auto;
    height: auto;
    background-color: rgb(26, 25, 25);
}

.jrk {
    margin-left: 40px;
}

.jrkform {
    margin-left: 150px;
}

.jkn {
    margin-right: 100px;

}

.jb {
    margin-bottom: 20px;
}

.jpa {
    padding-top: 20px;
}

.jpb {
    padding-bottom: 20px;
}
</style>

<template>
    <div class="container">
        <div class="jrkform">
            <!-- Bagian 1 -->
            <div class="field jpa">
                <label for="" class="col-12 mb-1 md:col-1 md:mb-3">No MR</label>
                <InputText v-model="FormData.no_mr" class="jkn" label="NO RM" type="text" placeholder="NO RM" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Nama Pasien</label>
                <InputText v-model="FormData.nama_lengkap" class="jkn" label="NO RM" type="text"
                    placeholder="Nama Pasien" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Jenis Kelamin</label>
                <InputText v-model="FormData.jenis_kelamin" type="text" placeholder="pilih --" />
                <!-- Tambahkan lebih banyak input sesuai kebutuhan -->
            </div>

            <!-- Bagian 2 -->
            <div class="field">
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Tanggal Lahir</label>
                <InputText v-model="FormData.tgl_lahir" class="jkn" type="date" placeholder="Tgl Lahir" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Title</label>
                <InputText v-model="FormData.title" class="jkn" type="text" placeholder="Title" />
                <label for="" class="col-12 mb-1 md:col-1 md:mb-0">Race</label>
                <InputText v-model="FormData.race" class="jkn" type="text" placeholder="pilih --" />
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

    <div class="">
        <div class="col-8">
            <div class="card">
                <h5>Horizontal</h5>
                <div class="">
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Nomor RM :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.no_mr" label="NO RM" type="text" placeholder="NO RM" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Nama :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.nama_lengkap" type="text" placeholder="Nama Pasien" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Tanggal Lahir :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.tgl_lahir" type="date" placeholder="Tgl Lahir" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Nama Pasien :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.jenis_kelamin" type="text" placeholder="Jenis Kelamin" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Title :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.title" type="text" placeholder="Title" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Race :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.race" type="text" placeholder="Ras" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Tanggal Periksa :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.tgl_periksa" type="date" placeholder="Tgl Periksa" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Jam Periksa :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.jam_periksa" type="time" placeholder="Jam Periksa" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">ID Dokter Jaga :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.id_dokter_jaga" type="text" placeholder="ID Dokter Jaga" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Nama Dokter Jaga :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.nama_dokter_jaga" type="text" placeholder="Nama Dokter Jaga" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Ruangan Dokter Jaga :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.ruangan_dokter_jaga" type="text"
                                placeholder="Ruangan Dokter Jaga" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">ID Dokter DPJP :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.id_dokter_dpjp" type="text" placeholder="ID Dokter DPJP" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Nama Dokter DPJP :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.nama_dokter_dpjp" type="text" placeholder="Nama Dokter DPJP" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Ruangan Dokter DPJP :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.ruangan_dokter_dpjp" type="text"
                                placeholder="Ruangan Dokter DPJP" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">ID Dokter Perujuk :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.id_dokter_perujuk" type="text" placeholder="ID Dokter Perujuk" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Nama Dokter Perujuk :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.nama_dokter_perujuk" type="text"
                                placeholder="Nama Dokter Perujuk" />
                        </div>
                    </div>
                    <div class="field grid">
                        <label class="col-12 mb-2 md:col-2 md:mb-0">Ruangan Dokter Perujuk :</label>
                        <div class="col-12 md:col-10">
                            <InputText v-model="FormData.ruangan_dokter_perujuk" type="text"
                                placeholder="Ruangan Dokter Perujuk" />
                        </div>
                    </div>
                </div>

                <button @click="kirimData()">Kirim</button>
            </div>
        </div>
    </div>


    <div class="card flex flex-column align-items-center gap-2">
        <InputText v-model="FormData.no_mr" label="NO RM" type="text" placeholder="NO RM" />
        <InputText v-model="FormData.nama_lengkap" type="text" placeholder="Nama Pasien" />
        <InputText v-model="FormData.tgl_lahir" type="date" placeholder="Tgl Lahir" />
        <InputText v-model="FormData.jenis_kelamin" type="text" placeholder="Jenis Kelamin" />
        <InputText v-model="FormData.title" type="text" placeholder="Title" />
        <InputText v-model="FormData.race" type="text" placeholder="Race" />
        <InputText v-model="FormData.tgl_periksa" type="date" placeholder="Tgl Periksa" />
        <InputText v-model="FormData.jam_periksa" type="time" placeholder="Jam Periksa" />
        <InputText v-model="FormData.id_dokter_jaga" type="text" placeholder="ID Dokter Jaga" />
        <InputText v-model="FormData.nama_dokter_jaga" type="text" placeholder="Nama Dokter Jaga" />
        <InputText v-model="FormData.ruangan_dokter_jaga" type="text" placeholder="Ruangan Dokter Jaga" />
        <InputText v-model="FormData.id_dokter_dpjp" type="text" placeholder="ID Dokter DPJP" />
        <InputText v-model="FormData.nama_dokter_dpjp" type="text" placeholder="Nama Dokter DPJP" />
        <InputText v-model="FormData.ruangan_dokter_dpjp" type="text" placeholder="Ruangan Dokter DPJP" />
        <InputText v-model="FormData.id_dokter_perujuk" type="text" placeholder="ID DOkter Perujuk" />
        <InputText v-model="FormData.nama_dokter_perujuk" type="text" placeholder="Nama Dokter Perujuk" />
        <InputText v-model="FormData.ruangan_dokter_perujuk" type="text" placeholder="Ruangan Dokter Perujuk" />
        <!-- 
        <button type="submit" class="btn btn-md btn-success mr-2">SIMPAN</button>
        <button type="reset" class="btn btn-md btn-danger">RESET</button> -->
        <button @click="kirimData()">Kirim</button>
    </div>
</template>




<!-- <select class="form-control" v-model="tindakan.race">
                                        <option value="">Unknow</option>
                                        <option value="Caucasian">Caucasian</option>
                                        <option value="Northeast Asian">Northeast Asian</option>
                                        <option value="Southeast Asian">Southeast Asian</option>
                                        <option value="Japanese">Japanese</option>
                                        <option value="African">African</option>
                                        <option value="African American">African American</option>
                                        <option value="North Indian">North Indian</option>
                                        <option value="South Indian">South Indian</option>
                                        <option value="Mexican">Mexican</option>
                                        <option value="American">American</option>
                                        <option value="Latino American">Latino American</option>
                                        <option value="Iberian">Iberian</option>
                                        <option value="Pakistanis">Pakistanis</option>
                                        <option value="Polynesian">Polynesian</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select> -->