<script>
import jwt from "jsonwebtoken"; // Impor modul jwt atau sesuaikan dengan modul JWT yang Anda gunakan

export default {
    methods: {
        checkAccessTokenExpiry() {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                const decodedToken = jwt.decode(accessToken);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decodedToken && decodedToken.exp < currentTime) {
                    this.redirectToLogin();
                }
            }
        },

        redirectToLogin() {
            this.$router.push({ name: "login" });
        }
    },

    created() {
        this.checkAccessTokenExpiry();
    }
};
</script>
