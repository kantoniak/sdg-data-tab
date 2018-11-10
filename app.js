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
    computed: {
        logo_src: function () {
            return 'logo_' + i18n.locale + '.svg';
        }
    },
    methods: {
        nextTip: function() {
            this.tip = getTip();
        }
    }
}).$mount('#app');