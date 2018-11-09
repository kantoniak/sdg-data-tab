const routes = [{
    path: '/',
    component: PageHome
}];

const router = new VueRouter({
    routes
});

const i18n = new VueI18n({
    locale: 'pl',
    messages,
})

const vm = new Vue({
    router,
    i18n
}).$mount('#app');