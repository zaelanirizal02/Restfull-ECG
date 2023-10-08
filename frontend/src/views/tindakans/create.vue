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
                            <h2><b>TAMBAH TINDAKAN</b></h2>
                        </div>
                        <div class="card-body">
                            <!-- ... -->
                            <form @submit.prevent="tindakanStore">
                                <div class="form-group">
                                    <label>No MR</label>
                                    <input type="text" class="form-control" v-model="tindakan.no_mr"
                                        placeholder="Masukkan No MR">
                                    <div v-if="validation.no_mr">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.no_mr[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Nama Lengkap</label>
                                    <input type="text" class="form-control" v-model="tindakan.nama_lengkap"
                                        placeholder="Masukkan Nama Lengkap">
                                    <div v-if="validation.nama_lengkap">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.nama_lengkap[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Tanggal Lahir</label>
                                    <input type="date" class="form-control" v-model="tindakan.tgl_lahir"
                                        placeholder="Masukkan Tanggal Lahir">
                                    <div v-if="validation.tgl_lahir">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.tgl_lahir[0] }}
                                        </div>
                                    </div>
                                </div>

                                <!-- <div class="form-group">
                                    <label>Jenis Kelamin</label>
                                    <input type="text" class="form-control" v-model="tindakan.jenis_kelamin"
                                        placeholder="Masukkan Jenis Kelamin">
                                    <div v-if="validation.jenis_kelamin">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.jenis_kelamin[0] }}
                                        </div>
                                    </div>
                                </div> -->

                                <div class="form-group">
                                    <label>Jenis Kelamin</label>
                                    <select class="form-control" v-model="tindakan.jenis_kelamin">
                                        <option value="">Pilih Jenis Kelamin</option>
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
                                    <label>Title</label>
                                    <input type="text" class="form-control" v-model="tindakan.title"
                                        placeholder="Masukkan Title">
                                    <div v-if="validation.title">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.title[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Race</label>
                                    <select class="form-control" v-model="tindakan.race">
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
                                    </select>
                                    <div v-if="validation.race">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.race[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Tanggal Periksa</label>
                                    <input type="date" class="form-control" v-model="tindakan.tgl_periksa"
                                        placeholder="Masukkan Tanggal Periksa">
                                    <div v-if="validation.tgl_periksa">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.tgl_periksa[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Jam Periksa</label>
                                    <input type="time" class="form-control" v-model="tindakan.jam_periksa"
                                        placeholder="Masukkan Jam Periksa">
                                    <div v-if="validation.jam_periksa">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.jam_periksa[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>ID Dokter Jaga</label>
                                    <input type="text" class="form-control" v-model="tindakan.id_dokter_jaga"
                                        placeholder="Masukkan ID Dokter Jaga">
                                    <div v-if="validation.id_dokter_jaga">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.id_dokter_jaga[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Nama Dokter Jaga</label>
                                    <input type="text" class="form-control" v-model="tindakan.nama_dokter_jaga"
                                        placeholder="Masukkan Nama Dokter Jaga">
                                    <div v-if="validation.nama_dokter_jaga">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.nama_dokter_jaga[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Ruangan Dokter Jaga</label>
                                    <input type="text" class="form-control" v-model="tindakan.ruangan_dokter_jaga"
                                        placeholder="Masukkan Ruangan Dokter Jaga">
                                    <div v-if="validation.ruangan_dokter_jaga">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.ruangan_dokter_jaga[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>ID Dokter DPJP</label>
                                    <input type="text" class="form-control" v-model="tindakan.id_dokter_dpjp"
                                        placeholder="Masukkan ID Dokter DPJP">
                                    <div v-if="validation.id_dokter_dpjp">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.id_dokter_dpjp[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Nama Dokter DPJP</label>
                                    <input type="text" class="form-control" v-model="tindakan.nama_dokter_dpjp"
                                        placeholder="Masukkan Nama Dokter DPJP">
                                    <div v-if="validation.nama_dokter_dpjp">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.nama_dokter_dpjp[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Ruangan Dokter DPJP</label>
                                    <input type="text" class="form-control" v-model="tindakan.ruangan_dokter_dpjp"
                                        placeholder="Masukkan Ruangan Dokter DPJP">
                                    <div v-if="validation.ruangan_dokter_dpjp">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.ruangan_dokter_dpjp[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>ID Dokter Perujuk</label>
                                    <input type="text" class="form-control" v-model="tindakan.id_dokter_perujuk"
                                        placeholder="Masukkan ID Dokter Perujuk">
                                    <div v-if="validation.id_dokter_perujuk">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.id_dokter_perujuk[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Nama Dokter Perujuk</label>
                                    <input type="text" class="form-control" v-model="tindakan.nama_dokter_perujuk"
                                        placeholder="Masukkan Nama Dokter Perujuk">
                                    <div v-if="validation.nama_dokter_perujuk">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.nama_dokter_perujuk[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Ruangan Dokter Perujuk</label>
                                    <input type="text" class="form-control" v-model="tindakan.ruangan_dokter_perujuk"
                                        placeholder="Masukkan Ruangan Dokter Perujuk">
                                    <div v-if="validation.ruangan_dokter_perujuk">
                                        <div class="alert alert-danger mt-1" role="alert">
                                            {{ validation.ruangan_dokter_perujuk[0] }}
                                        </div>
                                    </div>
                                </div>

                                <div v-if="showFormError" class="alert alert-danger">
                                    Please fill in all the required fields.
                                </div>
                                <hr style="size: 10px;">
                                <br>

                                <button type="submit" class="btn btn-md btn-success mr-2">SIMPAN</button>
                                <button type="reset" class="btn btn-md btn-danger">RESET</button>
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
                this.validation.no_mr = ['No MR wajib diisi'];
            }
            if (!this.tindakan.nama_lengkap) {
                this.validation.nama_lengkap = ['Nama Lengkap wajib diisi'];
            }
            if (!this.tindakan.tgl_lahir) {
                this.validation.tgl_lahir = ['Tanggal Lahir wajib diisi'];
            }
            if (!this.tindakan.jenis_kelamin) {
                this.validation.jenis_kelamin = [' Jenis Kelamin wajib diisi'];
            }
            if (!this.tindakan.title) {
                this.validation.title = ['title wajib diisi'];
            }
            if (!this.tindakan.race) {
                this.validation.race = [' wajib diisi'];
            }
            if (!this.tindakan.tgl_periksa) {
                this.validation.tgl_periksa = ['wajib diisi'];
            }
            if (!this.tindakan.jam_periksa) {
                this.validation.jam_periksa = [' wajib diisi'];
            }
            if (!this.tindakan.id_dokter_jaga) {
                this.validation.id_dokter_jaga = ['wajib diisi'];
            }
            if (!this.tindakan.nama_dokter_jaga) {
                this.validation.nama_dokter_jaga = ['wajib diisi'];
            }
            if (!this.tindakan.ruangan_dokter_jaga) {
                this.validation.ruangan_dokter_jaga = ['wajib diisi'];
            }
            if (!this.tindakan.id_dokter_dpjp) {
                this.validation.id_dokter_dpjp = [' wajib diisi'];
            }
            if (!this.tindakan.nama_dokter_dpjp) {
                this.validation.nama_dokter_dpjp = ['wajib diisi'];
            }
            if (!this.tindakan.id_dokter_perujuk) {
                this.validation.id_dokter_perujuk = ['wajib diisi'];
            }
            if (!this.tindakan.nama_dokter_perujuk) {
                this.validation.nama_dokter_perujuk = ['wajib diisi'];
            }
            if (!this.tindakan.ruangan_dokter_perujuk) {
                this.validation.ruangan_dokter_perujuk = ['wajib diisi'];
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
