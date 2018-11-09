Vue.component('lang-link', {
    props: ['locale'],
    template: '#lang-link',
    methods: {
        setLocale: function (locale) {
            vm.$i18n.locale = locale;
        }
    }
});

Vue.component('lang-switcher', {
    data: function () {
        return {
            messages: Object.keys(messages)
        }
    },
    template: '#lang-switcher'
});