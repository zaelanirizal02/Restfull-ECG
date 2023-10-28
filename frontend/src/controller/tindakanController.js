import api from "../api";

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
  name: "index",

  components: {},

  data() {
    return {
      items: [],
      namaLengkapFilter: "",

      itemToDelete: null,
      menuDrop: [
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

      menuSetting: [
        {
          label: "Logout",
          icon: "pi pi-sign-out",
        },

        {
          label: "Aplication Setting",
          icon: "pi pi-cog",
          command: () => {
            window.location.href = "/setting";
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
        (item) =>
          item.status_pembatalan === false &&
          item.nama_lengkap
            .toLowerCase()
            .includes(this.namaLengkapFilter.toLowerCase())
      );
    },
  },

  created() {
    this.fetchDataFromAPI(); // Panggil method untuk mengambil data saat komponen diinisialisasi
  },

  methods: {
    confirmDelete(item) {
      this.$confirm.require({
        message: "Are you sure you want to Delete?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          console.log("confirm");
          this.$toast.add({
            severity: "info",
            summary: "Confirmed",
            detail: "You have accepted",
            life: 3000,
          });
          // Panggil metode deleteItem untuk menghapus item yang telah dikonfirmasi
          this.deleteItem(item);
        },
        reject: () => {
          this.$toast.add({
            severity: "error",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
          });
        },
      });
      // Simpan item yang akan dihapus dalam properti itemToDelete
      // this.itemToDelete = item;
    },
    confirmCancel(item) {
      this.$confirm.require({
        message: "Are you sure you want to Cancel?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          console.log("cancel");
          this.$toast.add({
            severity: "info",
            summary: "Confirmed",
            detail: "You have accepted",
            life: 3000,
          });
          // Panggil metode deleteItem untuk menghapus item yang telah dikonfirmasi
          this.cancelItem(item);
        },
        reject: () => {
          this.$toast.add({
            severity: "error",
            summary: "Rejected",
            detail: "You have rejected",
            life: 3000,
          });
        },
        close: () => {},
      });
    },
    async fetchDataFromAPI() {
      try {
        const response = await api.get("api/tindakans");
        this.items = response.data.data.rows;
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    },

    async deleteItem(item) {
      // Lakukan tindakan penghapusan jika pengguna menerima konfirmasi
      try {
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

        this.items = this.items.filter((i) => i.id !== item.id);
      } catch (error) {
        console.error("Error cancelling item:", error);
      }
      this.fetchDataFromAPI();
    },

    //     async cancelItem(item) {
    //   try {
    //     // Kirim permintaan API untuk mengubah status tindakan menjadi dibatalkan berdasarkan ID atau data yang sesuai
    //     const response = await api.put(`api/tindakans/cancel/${item.id}`);

    //     if (response.status === 200) {
    //       // Jika permintaan berhasil, perbarui status item di data
    //       item.status_pembatalan = true;

    //       // Tunggu sebentar untuk memastikan perubahan sudah tersimpan dan proses selesai
    //       await new Promise(resolve => setTimeout(resolve, 1000));

    //       // Panggil metode fetchDataFromAPI untuk mengambil data terbaru
    //       this.fetchDataFromAPI();
    //     }
    //   } catch (error) {
    //     console.error("Error cancelling item:", error);
    //   }
    // }

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
