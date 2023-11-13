<script>
export default {
  methods: {
    logout() {
      // 1. Hapus token otentikasi dari local storage atau state
      localStorage.removeItem("accessToken"); // Gantilah ini sesuai dengan cara Anda menyimpan token

      // 2. Alihkan pengguna ke halaman login atau halaman beranda
      this.$router.push({ name: "login" }); // Gantilah "login" dengan nama rute halaman login Anda
    },
  },
};
</script>