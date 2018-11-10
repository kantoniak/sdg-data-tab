const ChartType = Object.freeze({
    'BAR_CHART': 'BAR_CHART',
    'PIE_CHART': 'PIE_CHART',
});

class Tip {
    constructor(goal_id, text_content, text_content_en, chart_type, dataset, year_dataset) {
        this.goal_id = goal_id;
        this.text_content = text_content;
        this.text_content_en = text_content_en;
        this.chart_type = chart_type; // From ChartType
        this.dataset = dataset;
        this.year_dataset = year_dataset;
    }
}

function getData(indicator, idx, areaCode) {
    if (localStorage.getItem(indicator) === null) {
        return axios.get('https://unstats.un.org/SDGAPI/v1/sdg/Indicator/Data?indicator=' + indicator + '&areaCode=' + areaCode + query[idx])
        .then(function (response) {
            localStorage.setItem(indicator, JSON.stringify(response));
        });
    }
}

function createTipOfTheDay(indicator, idx) {
    item = JSON.parse(localStorage.getItem(indicator));
    mini_year = 3000;
    maxi_year = 0;
    item.data.data.forEach(function (element) {
        if (element.timePeriodStart < mini_year) {
            mini_year = element.timePeriodStart;
            message = element;
        }
        if (element.timePeriodStart > maxi_year) {
            maxi_year = element.timePeriodStart;
            message2 = element;
        }
    });

    numericalData = [(parseFloat(message2.value) - parseFloat(message.value)) , message.timePeriodStart, message2.timePeriodStart];
    if (times[idx]) {
        numericalData[0] = (parseFloat(message2.value) / parseFloat(message.value));
    }
    //console.log(description_pl[idx]);
}


// TODO merge getYear and getValues
function getYear(indicator, idx) {
    res = [];
    year = [];
    item = JSON.parse(localStorage.getItem(indicator));
    mini_year = 3000;
    maxi_year = 0;
    item.data.data.forEach(function (element) {
        res.push(element.value);
        year.push(element.timePeriodStart);
    });
    return year;
}

function getValues(indicator, idx) {
    res = [];
    year = [];
    item = JSON.parse(localStorage.getItem(indicator));
    mini_year = 3000;
    maxi_year = 0;
    item.data.data.forEach(function (element) {
        res.push(element.value);
        year.push(element.timePeriodStart);
    });
    return res;
}

PolskaJestNajwazniejsza = '616';

indicators = ['5.5.1', '8.10.1', '3.7.2', '17.8.1', '3.5.2'];
description_pl = [
    'Liczba kobiet w sejmie zwiększyła się ponad dwukrotnie w przeciągu lat 2000-2018',
    'Liczba bankomatów zwiększyła się prawie trzykrotnie w przeciągu lat 2004-2016',
    'Liczba nastoletnich ciąż zmniejszyła się o ok 4% od roku 2000 do roku 2015',
    'Liczba osób podłączonych do internetu zwiększyła się przeszło dziesięciokrotnie pomiędzy rokiem 2000, a 2016',
    'Spożycie alkoholu na osobę wzrosło o ponad dwa litry od roku 2000 do roku 2016',
];
description_en = [
    'Number of women in parliament has increased over two times in 2000-2018',
    'Number of ATMs has increased almost triple through 2004 to 2016',
    'Number of adolescent pregnancy has descreased about 4% since 2000 to 2015',
    'Number of people online has increased over 10 times through 2000 to 2016',
    'Alcohol consumption has increased over two liters through 2000 to 2016',
];
chart_type = [ChartType.PIE_CHART, ChartType.BAR_CHART, ChartType.BAR_CHART, ChartType.BAR_CHART, ChartType.BAR_CHART];

times = [true, true, false, true, false];
query = ['&pageSize=19', '&pageSize=13', '', '', '']

indicators.forEach(function (indicator, idx) { getData(indicator, idx, PolskaJestNajwazniejsza); });
indicators.forEach(function (indicator, idx) { createTipOfTheDay(indicator, idx); });

let it = 0;
let samples = [];
for (var i = 0; i < indicators.length; i++) {
    samples.push(new Tip(parseInt(indicators[i].split('.')[0]),
                        description_pl[i],
                        description_en[i],
                        chart_type[i],
                        getValues(indicators[i], i),
                        getYear(indicators[i], i)));
}

function getTip() {
    let tip = samples[it];
    it = (it + 1) % 5;
    return tip;
}
