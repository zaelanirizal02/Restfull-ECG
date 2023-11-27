import api from "../api";
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();

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
  return `${currentYear}-${month}-${day}`;
}

export default {
  name: "index",
  tglPeriksaFilter: null,
  formatDate: "yy-mm-dd",
  components: {},

  data() {
    return {
      items: [],
      dateFilterStart: null,
      dateFilterEnd: null,
      nameFilter: null,
      dateFilterRange: new Date(),
      maxDate: new Date(),
      itemToDelete: null,
      expandedRows: [],
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
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => {
            this.logout(); // Panggil metode logout saat item Logout diklik
          },
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
        // &&
        // item.nama_lengkap
        //   .toLowerCase()
        //   .includes(this.namaLengkapFilter.toLowerCase())
      );
    },

    // Filter items to only include those with status_pembatalan false
    filteredItemsFalse() {
      return this.formattedItems.filter(
        (item) => item.status_pembatalan === false
      );
    },
  },

  created() {
    this.fetchDataFromAPI(); // Panggil method untuk mengambil data saat komponen diinisialisasi
  },

  methods: {
    formatTgl(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const currentYear = new Date().getFullYear();

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
      return `${currentYear}-${month}-${day}`;
    },

    // onRowExpand(item) {
    //   // console.log("Row Expand:", item.data);
    //   const expandedItem = this.formattedItems.find(
    //     (i) => i.id === item.data.id
    //   );
    //   this.expandedRows.push(expandedItem);

    //   console.log("Expanded Rows:", this.expandedRows);
    //   this.$toast.add({
    //     severity: "info",
    //     summary: "Product Expanded",
    //     detail: `Atas Nama : ${item.data.nama_lengkap}`,
    //     life: 3000,
    //   });
    // },
    // onRowCollapse(item) {
    //   // console.log("Row Collapsed:", item.data);
    //   this.expandedRows = this.expandedRows.filter((row) => row !== item.data);
    //   this.$toast.add({
    //     severity: "success",
    //     summary: "Product Collapsed",
    //     detail: `Atas Nama : ${item.data.nama_lengkap}`,
    //     life: 3000,
    //   });
    // },

    onRowExpand(item) {
      // Ambil objek yang sesuai dari slotProps.item.data
      const expandedItem = this.formattedItems.find(
        (i) => i.id === item.data.id
      );

      // Tambahkan objek ke expandedRows
      this.expandedRows.push(expandedItem);

      console.log("Expanded Rows:", this.expandedRows);
      // ...
    },

    onRowCollapse(item) {
      // Ambil objek yang sesuai dari slotProps.item.data
      const collapsedItem = this.formattedItems.find(
        (i) => i.id === item.data.id
      );

      // Hapus objek dari expandedRows
      this.expandedRows = this.expandedRows.filter(
        (row) => row.id !== collapsedItem.id
      );

      console.log("Expanded Rows:", this.expandedRows);
      // ...
    },

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
        // Ambil accessToken dari local storage atau state aplikasi
        const accessToken = localStorage.getItem("accessToken");
        // Sesuaikan dengan cara Anda menyimpan token

        // Pastikan accessToken telah disetel sebelum melakukan permintaan
        if (!accessToken) {
          console.error("AccessToken tidak tersedia");
          return;
        }

        // Set header Authorization dengan accessToken
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

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
    async editItem(item) {
      try {
        const response = await api.edit(`api/tindakans/edit/${item.id}`);
        this.items = this.items.filter((i) => i.id !== item.id);
      } catch (error) {
        console.error("Error Edit item: ", error);
      }
    },

    //tanggal periksa filter
    async caritglPeriksa() {
      try {
        // Ambil accessToken dari local storage atau state aplikasi
        const accessToken = localStorage.getItem("accessToken");
        // Pastikan accessToken telah disetel sebelum melakukan permintaan
        if (!accessToken) {
          console.error("AccessToken tidak tersedia");
          return;
        }

        // Set header Authorization dengan accessToken
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        if (this.dateFilterRange) {
          // Ambil tanggal awal dan tanggal akhir dari range yang dipilih
          const startDate = (this.formatDate = this.formatTgl(
            this.dateFilterRange[0]
          ));
          const endDate = (this.formatDate = this.formatTgl(
            this.dateFilterRange[1]
          ));

          // Kirim permintaan API dengan rentang tanggal dan nama
          const response = await api.get(
            `api/tindakans/search/${this.nameFilter}/${startDate}/${endDate}`
          );
          this.items = response.data.data.rows;
        } else {
          // Kirim permintaan API tanpa rentang tanggal dan nama jika tidak ada filter
          const response = await api.get("api/tindakans");
          this.items = response.data.data.rows;
        }
      } catch (error) {
        console.error("Error ambil data dari API:", error);
      }
    },

    logout() {
      // 1. Hapus token otentikasi dari local storage atau state
      localStorage.removeItem("accessToken"); // Gantilah ini sesuai dengan cara Anda menyimpan token

      // 2. Alihkan pengguna ke halaman login atau halaman beranda
      this.$router.push({ name: "login" }); // Gantilah "login" dengan nama rute halaman login Anda
    },

    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
  },
};
