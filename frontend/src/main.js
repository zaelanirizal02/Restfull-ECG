import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";

import DataTable from "primevue/datatable";
import Toolbar from "primevue/toolbar";
import Column from "primevue/column";
import Toast from "primevue/toast";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import Card from "primevue/card";
import Fieldset from "primevue/fieldset";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import BlockUI from "primevue/blockui";
import OverlayPanel from "primevue/overlaypanel";
import SplitButton from "primevue/splitbutton";
import Menu from "primevue/menu";
import ToggleButton from "primevue/togglebutton";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Dropdown from "primevue/dropdown";
import Divider from "primevue/divider";
import Listbox from "primevue/listbox";
import Calendar from "primevue/calendar";

// import "primevue/resources/themes/md-dark-deeppurple/theme.css";
import "primevue/resources/themes/bootstrap4-dark-purple/theme.css";

// import "primevue/resources/themes/lara-dark-indigo/theme.css";
// import "primeflex/themes/primeone-dark.css";

import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.min.css";
import "./assets/style.css";

const app = createApp(App);
app.component("Divider", Divider);
app.component("Dropdown", Dropdown);
app.component("TabPanel", TabPanel);
app.component("TabView", TabView);
app.component("ToggleButton", ToggleButton);
app.component("Menu", Menu);
app.component("Accordion", Accordion);
app.component("AccordionTab", AccordionTab);
app.component("BlockUI", BlockUI);
app.component("Toast", Toast);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Menubar", Menubar);
app.component("Button", Button);
app.component("Toolbar", Toolbar);
app.component("Card", Card);
app.component("Fieldset", Fieldset);
app.component("InputText", InputText);
app.component("InputNumber", InputNumber);
app.component("OverlayPanel", OverlayPanel);
app.component("SplitButton", SplitButton);
app.component("Listbox", Listbox);
app.component("Calendar", Calendar);

app.use(PrimeVue, { ripple: true });

app.config.productionTip = false;

// loadFonts();

app.use(router);
// app.use(vuetify);
app.mount("#app");
