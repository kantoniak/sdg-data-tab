const ChartType = Object.freeze({
    'BAR_CHART': 'BAR_CHART'
});

class Tip {
    constructor(goal_id, text_content, chart_type, dataset) {
        this.goal_id = goal_id;
        this.text_content = text_content;
        this.chart_type = chart_type; // From ChartType
        this.dataset = dataset;
    }
}

function getData(indicator, areaCode) {
    if (localStorage.getItem(indicator) === null) {
        return axios.get('https://unstats.un.org/SDGAPI/v1/sdg/Indicator/Data?indicator=' + indicator + '&areaCode=' + areaCode)
        .then(function (response) {
            localStorage.setItem(indicator, JSON.stringify(response));
        });
    }
}

function createTipOfTheDay(indicator, idx) {
    item = JSON.parse(localStorage.getItem(indicator));
    if (item.data.data.length > 1) {
        message = item.data.data[compare[idx][0]];
        message2 = item.data.data[compare[idx][1]];
        numericalData = [(parseFloat(message2.value) - parseFloat(message.value)) , message.timePeriodStart, message2.timePeriodStart];
        if (times[idx]) {
            numericalData[0] = (parseFloat(message2.value) / parseFloat(message.value));
        }
        res = "";
        description[idx].forEach(function (descPart, id) { res += descPart + numericalData[id]; });
        console.log(res);
    }
}

description = [['Alkohol urus o ', ' litrow od roku ', ' do roku '],
['Liczba kobiet w sejmie zwiekszyla sie ', ' razy od roku ', ' do roku '],
['Pokrycie powierzchni Polski lasem zwiekszylo sie o ', '% od roku ', ' do roku '],
['Liczba bankomatow zwiekszyla sie ', ' razy od roku ', ' do roku '],
['Liczba nastoletnich ciaz zmienila sie o ', ' % od roku ', ' do roku '],
['Liczba osob podlaczonych do internetu zwiekszyla sie ', ' razy od roku ', ' do roku ']];
indicators = ['3.5.2', '5.5.1', '15.1.1', '8.10.1', '3.7.2', '17.8.1'];
compare = [[0, 4], [0, 18], [5, 8], [0, 12], [0, 15], [0, 16]];
times = [false, true, false, true, false, true];
PolskaJestNajwazniejsza = '616';

indicators.forEach(function (indicator) { getData(indicator, PolskaJestNajwazniejsza); });
indicators.forEach(function (indicator, idx) { createTipOfTheDay(indicator, idx); });

function getTip() {
    return new Tip(1, 'Urus', );
}

// Chujowy format, bo nie ma lat do tych danych
let pjn1 = new Tip(3, 'Alkohol urus o ponad dwa litry od roku 2000 do roku 2016', ChartType.BAR_CHART, [9.59, 11.06, 11.37, 11.64, 11.63]);
let pjn2 = new Tip(5, 'Liczba kobiet w sejmie zwiekszyla sie ponad dwukrotnie w przeciagu lat 2000-2018', ChartType.BAR_CHART, [60, 60, 93, 93, 93, 94, 94, 94, 93, 92, 92, 109, 109, 112, 111, 126, 129, 129]);
let pjn3 = new Tip(8, 'Liczba bankomatow zwiekszyla sie prawie trzykrotnie w przeciagu lat 2004-2016', ChartType.BAR_CHART, [25.44, 27.57, 31.09, 35.99, 43.13, 48.69, 50.89, 53.87, 56.27, 58.35, 63.46, 68.49, 72.43]);
let pjn4 = new Tip(3, 'Liczba nastoletnich ciaz zmniejszyla sie o ok 4% od roku 2000 do roku 2015', ChartType.BAR_CHART, [16.96, 15.82, 15.16, 14.5, 13.76, 13.47, 13.88, 14.74, 16.22, 16.25, 15.26, 13.97, 14.2, 13.7, 13.11, 12.31]);
let pjn5 = new Tip(17, 'Liczba osob podlaczonych do internetu zwiekszyla sie przeszło dziesiecio krotnie pomiedzy rokiem 2000, a 2016', ChartType.BAR_CHART, [7.3, 9.9, 21.2, 24.9, 32.5, 38.8, 44.6, 48.6, 53.1, 59.0, 62.3, 61.9, 62.3, 62.8, 66.6, 68.0, 73.3]);
