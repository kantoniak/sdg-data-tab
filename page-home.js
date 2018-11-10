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
        localized_goal_num: function() {
            return '#' + this.tip.goal_id;
        },
        localized_text_content: function () {
            if (i18n.locale === 'pl') {
                return this.tip.text_content;
            } else {
                return this.tip.text_content_en;
            }
        },
        icon_src: function () {
            return 'goals/' + this.tip.goal_id + '.svg';
        },
        data: function () {
            if (this.tip == null) {
                return {};
            }
            return {
                labels: this.tip.year_dataset_eu,
                series: [this.tip.dataset, this.tip.dataset_eu]
            }
        }
    }
});