import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "vuetify/dist/vuetify.css";

import PrimeVue from "primevue/config";

import DataTable from "primevue/datatable";
import Column from "primevue/column";

import "primevue/resources/themes/bootstrap4-dark-purple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.component("DataTable", DataTable);
app.component("Column", Column);

app.use(PrimeVue, { ripple: true });

app.config.productionTip = false;

loadFonts();

app.use(router).use(vuetify).mount("#app");
