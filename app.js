const routes = [{
    path: '/',
    component: PageHome
}];

const router = new VueRouter({
    routes
});

const vm = new Vue({
    router
}).$mount('#app');