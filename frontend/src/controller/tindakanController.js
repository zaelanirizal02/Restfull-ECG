import api from "../../api";
import { ref } from "vue";

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
  components: {},

  data() {
    return {
      items: [],
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

      overlayMenuItems: [
        {
          label: "Logout",
          icon: "pi pi-sign-out",
        },

        {
          label: "Aplication Setting",
          icon: "pi pi-cog",
          command: () => {
            window.location.href = "/option";
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
        (item) => item.status_pembatalan === false
      );
    },
  },

  created() {
    this.fetchDataFromAPI(); // Panggil method untuk mengambil data saat komponen diinisialisasi
  },

  methods: {
    async fetchDataFromAPI() {
      try {
        const response = await api.get("api/tindakans");
        this.items = response.data.data.rows;
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    },

    async deleteItem(item) {
      try {
        // Kirim permintaan API untuk menghapus item berdasarkan ID atau data yang sesuai
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

        this.filteredItemsFalse = this.filteredItemsFalse.filter(
          (i) => i.id !== item.id
        );
        this.filteredItemsTrue.push(item);
      } catch (error) {
        console.error("Error cancelling item:", error);
      }
    },

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
