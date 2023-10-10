<style>
form label {
    font-weight: bold;
}

.form-group {
    margin-bottom: 20px;
}
</style>
<template>
    <div class="tindakans">
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-10">
                    <div class="card">
                        <div class="card-header text-center">
                            <h2><b>SETTING</b></h2>
                        </div>
                        <div class="card-body">
                            <!-- ... -->
                            <form @submit.prevent="tindakanStore">
                                <div class="form-group">
                                    <label>Nama Rumah Sakit</label>
                                    <input type="text" class="form-control" v-model="tindakan.nama_lengkap" placeholder="">
                                    <div v-if="validation.nama_lengkap">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.nama_lengkap[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Nama Aplikasi</label>
                                    <input type="text" class="form-control" v-model="tindakan.tgl_lahir" placeholder="">
                                    <div v-if="validation.tgl_lahir">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.tgl_lahir[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Port Server HL7</label>
                                    <select class="form-control" v-model="tindakan.jenis_kelamin">
                                        <option value=""></option>
                                        <option value="M">Laki-Laki</option>
                                        <option value="F">Perempuan</option>
                                    </select>
                                    <div v-if="validation.jenis_kelamin">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.jenis_kelamin[0] }}
                                        </div>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label>Target IP Address HL7</label>
                                    <input type="text" class="form-control" v-model="tindakan.title" placeholder="">
                                    <div v-if="validation.title">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.title[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Target Port HL7</label>
                                    <input type="text" class="form-control" v-model="tindakan.title" placeholder="">
                                    <div v-if="validation.title">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.title[0] }}
                                        </div>
                                    </div>
                                </div>



                                <button type="submit" class="btn btn-md btn-success">SIMPAN</button>
                                <button type="reset" class="btn btn-md btn-danger ms-2">RESET</button>
                            </form>
                            <!-- ... -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import api from '../../api';

export default {
    data() {
        return {
            tindakan: {},
            validation: [],
            showFormError: false
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
        }
    },
}
</script>
