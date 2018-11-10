const routes = [{
    path: '/',
    component: PageHome
},
{
    path: '/about',
    component: PageAbout
}];

const router = new VueRouter({
    routes
});

const i18n = new VueI18n({
    locale: 'pl',
    messages,
})

var data = {
    tip: getTip()
}

const vm = new Vue({
    router,
    i18n,
    data,
    methods: {
        nextTip: function() {
            this.tip = getTip();
        }
    }
}).$mount('#app');