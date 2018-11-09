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
