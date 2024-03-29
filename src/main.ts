import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { storage, db } from './firebase';

import BaseButton from './components/ui/BaseButton.vue'
import BaseCard from './components/ui/BaseCard.vue'
import BaseDialog from './components/ui/BaseDialog.vue'
import BaseBadge from './components/ui/BaseBadge.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'

const app= createApp(App)

app.use(store)
app.use(router)
app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-dialog', BaseDialog)
app.component('base-badge', BaseBadge)
app.component('base-spinner', BaseSpinner)
app.mount('#app')


