function getData(indicator, areaCode) {
    if (localStorage.getItem(indicator) === null) {
        return axios.get('https://unstats.un.org/SDGAPI/v1/sdg/Indicator/Data?indicator=' + indicator + '&areaCode=' + areaCode)
        .then(function (response) {
            //console.log(response);
            localStorage.setItem(indicator, JSON.stringify(response));
        });
    }
}

function createTipOfTheDay(indicator, desc) {
    item = JSON.parse(localStorage.getItem(indicator));
    if (item.data.data.length > 1) {
        message = item.data.data[0];
        message2 = item.data.data[item.data.data.length-1];
        numericalData = [(parseFloat(message2.value) - parseFloat(message.value)) , message.timePeriodStart, message2.timePeriodStart];
        res = "";
        desc.forEach(function (descPart, idx) { res += descPart + numericalData[idx]; });
        console.log(res);
    }
}

description = [['Alkohol urus o ', ' od roku ', ' do roku '], ['aaa ', ' bbb ', ' ccc '], ['ddd ', ' eee ', ' fff ']];
indicators = ['3.5.2', '3.1.1', '4.1.1'];
PolskaJestNajwazniejsza = '616';

indicators.forEach(function (indicator) { getData(indicator, PolskaJestNajwazniejsza); });
indicators.forEach(function (indicator, idx) { createTipOfTheDay(indicator, description[idx]); });
