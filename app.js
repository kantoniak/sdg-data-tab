const routes = [
    { path: '/', component: Homepage },
];

const router = new VueRouter({
    routes
});

const vm = new Vue({
    router
}).$mount('#app');