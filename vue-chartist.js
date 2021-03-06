const PIE = 'Pie';
const LINE = 'Line';
const BAR = 'Bar';

Vue.component('vue-chartist', {
    template: '#vue-chartist',
    props: {
        type: {
            type: String,
            validator(val) {
                return val === PIE || val === LINE || val === BAR;
            },
            default() {
                return LINE;
            }
        },
        data: {
            type: Object,
            required: true
        },
        options: {
            type: Object
        },
        listener: {
            type: Object
        },
        responsiveOptions: {
            type: Array
        }
    },
    data() {
        return {
            chartist: undefined
        };
    },
    methods: {
        updateEventListener(listener, type = 'on') {
            listener = listener || {};
            for (let event in listener) {
                if (listener.hasOwnProperty(event)) {
                    this.chartist[type](event, listener[event]);
                }
            }
        },
        renderChart() {
            let data = this.data;
            let options = this.options ? this.options : {};
            let responsiveOptions = this.responsiveOptions ? this.responsiveOptions : [];
            if (this.chartist) {
                this.chartist.update(data, options, responsiveOptions);
            } else {
                this.chartist = new Chartist[this.type](this.$el, data, options, responsiveOptions);
                this.updateEventListener(this.listener, 'on');
            }
            this.chartist.on('draw', function(data) {

                const duration = 750;
                const easing = Chartist.Svg.Easing.easeOutQuad;

                if(data.type === 'line' || data.type === 'area') {
                    data.element.animate({
                        d: {
                            begin: 0,
                            dur: duration,
                            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                            to: data.path.clone().stringify(),
                            easing: easing
                        },
                        opacity: {
                            from: 0,
                            to: 1,
                            dur: duration,
                            easing: easing
                        }
                    });
                }
                if(data.type === 'point') {
                    data.element.animate({
                        y: {
                            from: 0,
                            to: data.y,
                            dur: duration,
                            easing: easing
                        },
                        opacity: {
                            from: 0,
                            to: 1,
                            dur: duration,
                            easing: easing
                        }
                    });
                }
            });
        }
    },
    watch: {
        data: {
            handler: 'renderChart',
            deep: true
        },
        options: {
            handler: 'renderChart',
            deep: true
        },
        responsiveOptions: {
            handler: 'renderChart',
            deep: true
        },
        listener(val, oldVal) {
            this.updateEventListener(oldVal, 'off');
            this.updateEventListener(val, 'on');
        }
    },
    mounted() {
        this.renderChart();
    },
    destroyed() {
        if (this.chartist) {
            this.chartist.detach();
        }
    }
});