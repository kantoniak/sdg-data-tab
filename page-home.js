const PageHome = Vue.component('page-home', {
    props: ['tip'],
    template: '#page-home',
    computed: {
        localized_text_content: function () {
            if (i18n.locale === 'pl') {
                return this.tip.text_content;
            } else {
                return this.tip.text_content_en;
            }
        }
    }
});