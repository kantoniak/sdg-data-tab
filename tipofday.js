const ChartType = Object.freeze({
    'BAR_CHART': 'BAR_CHART',
    'PIE_CHART': 'PIE_CHART',
});

class Tip {
    constructor(goal_id, text_content, text_content_en, chart_type, dataset, year_dataset, dataset_eu, year_dataset_eu) {
        this.goal_id = goal_id;
        this.text_content = text_content + " w latach " + year_dataset[0] + "-" + year_dataset[year_dataset.length - 1];
        this.text_content_en = text_content_en + " " + year_dataset[0] + "-" + year_dataset[year_dataset.length - 1];;
        this.chart_type = chart_type; // From ChartType
        this.dataset = dataset;
        this.year_dataset = year_dataset;
        this.dataset_eu = dataset_eu;
        this.year_dataset_eu = year_dataset_eu;
    }
}

function getData(indicator, idx, areaCode) {
    if (localStorage.getItem(indicator + "_" + areaCode) === null) {
        return axios.get('https://unstats.un.org/SDGAPI/v1/sdg/Series/Data?seriesCode=' + indicator + '&areaCode=' + areaCode)
        .then(function (response) {
            localStorage.setItem(indicator + "_" +  areaCode, JSON.stringify(response));
        });
    }
    return new Promise(function(){});
}

function createTipOfTheDay(indicator, idx) {
    item = JSON.parse(localStorage.getItem(indicator + "_" + PolskaJestNajwazniejsza));
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
}


// TODO merge getYear and getValues
function getYear(indicator, idx, areaCode) {
    res = [];
    year = [];
    item = JSON.parse(localStorage.getItem(indicator + "_" + areaCode));
    mini_year = 3000;
    maxi_year = 0;
    item.data.data.forEach(function (element) {
        res.push(parseFloat(element.value).toFixed(2));
        year.push(element.timePeriodStart);
    });
    return year;
}

function getValues(indicator, idx, areaCode) {
    res = [];
    year = [];
    item = JSON.parse(localStorage.getItem(indicator + "_" + areaCode));
    mini_year = 3000;
    maxi_year = 0;
    item.data.data.forEach(function (element) {
        res.push(parseFloat(element.value).toFixed(2));
        year.push(element.timePeriodStart);
    });
    return res;
}

function getYearEU(indicator, idx, areaCodes, butlast=false) {
    res = [];
    year = [];
    dict = {};
    dict2 = {};
    areaCodes.forEach(function (areaCode) {
        item = JSON.parse(localStorage.getItem(indicator + "_" + areaCode));
        mini_year = 3000;
        maxi_year = 0;
        item.data.data.forEach(function (element) {
            if (dict[parseInt(element.timePeriodStart)] == undefined) {
                dict[parseInt(element.timePeriodStart)] = parseFloat(element.value);
                dict2[parseInt(element.timePeriodStart)] = 1;
            } else {
                dict[parseInt(element.timePeriodStart)] += parseFloat(element.value);
                dict2[parseInt(element.timePeriodStart)] += 1;
            }
        });
    });
    for (var key in dict) {
        res.push((dict[key] / dict2[key]).toFixed(2));
        year.push(parseInt(key));
    }
    if (butlast) {
        res.pop();
        year.pop();
    }
    return year;
}

function getValuesEU(indicator, idx, areaCodes, butlast=false) {
    res = [];
    year = [];
    dict = {};
    dict2 = {};
    areaCodes.forEach(function (areaCode) {
        item = JSON.parse(localStorage.getItem(indicator + "_" + areaCode));
        mini_year = 3000;
        maxi_year = 0;
        item.data.data.forEach(function (element) {
            if (dict[parseInt(element.timePeriodStart)] == undefined) {
                dict[parseInt(element.timePeriodStart)] = parseFloat(element.value);
                dict2[parseInt(element.timePeriodStart)] = 1;
            } else {
                dict[parseInt(element.timePeriodStart)] += parseFloat(element.value);
                dict2[parseInt(element.timePeriodStart)] += 1;
            }
        });
    });
    for (var key in dict) {
        res.push((dict[key] / dict2[key]).toFixed(2));
        year.push(parseInt(key));
    }
    if (butlast) {
        res.pop();
        year.pop();
    }
    return res;
}

PolskaJestNajwazniejsza = '616';
EU = ['40', '56', '100', '191', '196', '203', '208', '233', '246', '250', '300', '724', '528', '372', '440', '442', '428', '470', '276', '616', '620', '642', '703', '705', '752', '348', '380', '826'];

series = ['SG_GEN_PARLN', 'FB_ATM_TOTL', 'SP_DYN_ADKL', 'IT_USE_ii99', 'SH_ALC_CONSPT'];
indicators = ['5.5.1', '8.10.1', '3.7.2', '17.8.1', '3.5.2'];
description_pl = [
    'Liczba kobiet w sejmie zwiększyła się ponad 2 razy',
    'Liczba bankomatów zwiększyła się prawie 3 razy',
    'Liczba nastoletnich ciąż zmniejszyła się o ok 4%',
    'Liczba osób podłączonych do internetu zwiększyła się ponad 10 razy',
    'Spożycie alkoholu na osobę wzrosło o ponad 2 litry',
];
description_en = [
    'Number of women in parliament has increased over 2 times',
    'Number of ATMs has increased almost 3 times',
    'Number of adolescent pregnancy has descreased about 4%',
    'Number of people online has increased over 10 times',
    'Alcohol consumption per capita has increased over 2 liters',
];
chart_type = [ChartType.PIE_CHART, ChartType.BAR_CHART, ChartType.BAR_CHART, ChartType.BAR_CHART, ChartType.BAR_CHART];

times = [true, true, false, true, false];

series.forEach(function (el, idx) {
    getData(el, idx, PolskaJestNajwazniejsza)
    .then(function () {
        createTipOfTheDay(el, idx);
    })
});

series.forEach(function (el, idx) {
    EU.forEach(function (country, idx) {
        getData(el, idx, country)
        .then(function () {
            createTipOfTheDay(el, idx);
        })
    });
});

let it = 0;
let samples = [];
for (var i = 0; i < indicators.length; i++) {
    if (i == 2) {
        samples.push(new Tip(parseInt(indicators[i].split('.')[0]),
                            description_pl[i],
                            description_en[i],
                            chart_type[i],
                            getValues(series[i], i, PolskaJestNajwazniejsza),
                            getYear(series[i], i, PolskaJestNajwazniejsza),
                            getValuesEU(series[i], i, EU, true),
                            getYearEU(series[i], i, EU, true)));
    } else {
        samples.push(new Tip(parseInt(indicators[i].split('.')[0]),
                            description_pl[i],
                            description_en[i],
                            chart_type[i],
                            getValues(series[i], i, PolskaJestNajwazniejsza),
                            getYear(series[i], i, PolskaJestNajwazniejsza),
                            getValuesEU(series[i], i, EU),
                            getYearEU(series[i], i, EU)));
    }
}

function getTip() {
    let tip = samples[it];
    it = (it + 1) % 5;
    return tip;
}
