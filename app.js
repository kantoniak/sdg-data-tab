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

let initTip = getTip();
var data = {
    tip: initTip,
    color_rgb: tinycolor('#' + goal_colors[initTip.goal_id]).toRgb()
}

const vm = new Vue({
    router,
    i18n,
    data,
    computed: {
        color: function() {
            return goal_colors[this.tip.goal_id];
        },
        style: function() {
            return '--question-color: ' + tinycolor(this.color_rgb).toHexString();
        },
        logo_src: function () {
            return 'circle.svg';
            //return 'logo_' + i18n.locale + '.svg';
        }
    },
    methods: {
        nextTip: function() {
            this.tip = getTip();
        }
    },
    watch: {
        tip: function(newTip) {
            const newColor = tinycolor('#' + goal_colors[newTip.goal_id]).toRgb();

            TweenLite.to(this.$data.color_rgb, 1, {
                r: newColor.r,
                g: newColor.g,
                b: newColor.b
            });
        }
    }
}).$mount('#app');