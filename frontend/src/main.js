import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
// import "vuetify/dist/vuetify.css";

import PrimeVue from "primevue/config";
import DataTable from "primevue/datatable";
import Toolbar from "primevue/toolbar";
import Column from "primevue/column";
import Toast from "primevue/toast";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import "primevue/resources/themes/md-dark-deeppurple/theme.css";
// import "primevue/resources/themes/saga-purple/theme.css";
// import "primeflex/themes/primeone-dark.css";

import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.component("Toast", Toast);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Menubar", Menubar);
app.component("Button", Button);
app.component("Toolbar", Toolbar);

app.use(PrimeVue, { ripple: true });

app.config.productionTip = false;

loadFonts();

app.use(router);
// app.use(vuetify);
app.mount("#app");
