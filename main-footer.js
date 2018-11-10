const MainFooter = Vue.component('main-footer', {
    props: ['tip'],
    template: '#main-footer',
    computed: {
        twitter_url: function () {
            let text_content;
            if (i18n.locale === 'pl') {
                text_content = this.tip.text_content;
            } else {
                text_content = this.tip.text_content_en;
            }

            text_content = text_content + '&hashtags=SDG,HackathonGUS';
            return encodeURI('https://twitter.com/intent/tweet?text=' + text_content);
        }
    }
});