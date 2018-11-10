const PageHome = Vue.component('page-home', {
    props: ['tip'],
    data: function () {
        return {
            options: {
                fullWidth: true,
                chartPadding: {
                    left: 0,
                    right: 0,
                    bottom: 0
                },
                showArea: true,
                low: 0,
                onlyInteger: true,
                axisX: {
                    showGrid: false,
                    showLabel: false,
                    offset: 0
                },
                axisY: {
                    showGrid: false,
                    showLabel: false,
                    offset: 0
                },
                plugins: [
                    Chartist.plugins.ctPointLabels({
                        textAnchor: 'middle'
                    })
                ]
            }
        };
    },
    template: '#page-home',
    computed: {
        localized_text_content: function () {
            if (i18n.locale === 'pl') {
                return this.tip.text_content;
            } else {
                return this.tip.text_content_en;
            }
        },
        data: function () {
            if (this.tip == null) {
                return {};
            }
            return {
                labels: this.tip.year_dataset,
                series: [this.tip.dataset]
            }
        }
    }
});