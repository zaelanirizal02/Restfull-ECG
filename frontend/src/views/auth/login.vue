<script>
import api from '../../api';
import "../../assets/form.css";

export default {
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {


        async login() {

            try {
                const response = await api.post('api/auth/login', {
                    username: this.username,
                    password: this.password,
                },);
                // console.log(response.data.data.accessToken);

                if (response.status === 200) {
                    // Login berhasil
                    const token = response.data.data.accessToken;
                    // Anda dapat menyimpan token yang diberikan dalam respons di sini
                    // Simpan token akses di localStorage
                    localStorage.setItem('accessToken', token);

                    this.$router.push({ path: '/' });
                    // Redirect ke halaman yang sesuai
                } else {
                    // Tangani situasi lain jika diperlukan
                    console.log("Gagal login");
                }

            } catch (error) {
                // Tangani kesalahan jika terjadi
                console.error("Terjadi kesalahan saat login:", error);
            }
        },
    },


};
</script>

<template>
    <div class="container">
        <div class="flex flex-column md:flex-row">
            <div class="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-8">
                <div class="flex flex-wrap justify-content-center align-items-center gap-2">
                    <label class="w-6rem">Username</label>
                    <InputText v-model="username" id="username" type="text" class="w-12rem" />
                </div>
                <div class="flex flex-wrap justify-content-center align-items-center gap-2">
                    <label class="w-6rem">Password</label>
                    <InputText v-model="password" id="password" type="password" class="w-12rem" />
                </div>

            </div>
            <div class="w-full md:w-2">
                <Divider layout="vertical" class="hidden md:flex"><b>OR</b></Divider>
                <Divider layout="horizontal" class="flex md:hidden" align="center"><b>OR</b></Divider>
            </div>
            <div class="w-full md:w-5 flex align-items-center justify-content-center py-5">
                <div>
                    <Button label="Login" @click="login()" icon="pi pi-user" class="w-10rem"></Button>
                </div>
                <div>

                    <Button label="Sign Up" icon="pi pi-user-plus" severity="success" class="center w-10rem"></Button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.container {
    margin: 200px;
    height: 300px;
    padding: 15px;
    background-color: rgb(34, 50, 74);
}

.center {
    margin: center;
}
</style>