function createTipOfTheDay(indicator, areaCode) {
    item = JSON.parse(localStorage.getItem(indicator));
    if (item.data.data.length > 1) {
        message = item.data.data[0];
        message2 = item.data.data[item.data.data.length-1];
        console.log(message);
        console.log(message2);
        console.log('Alkohol urus o ' + (parseFloat(message2.value) - parseFloat(message.value)) + ' od roku ' + message.timePeriodStart + ' do roku ' + message2.timePeriodStart)
    }
}

createTipOfTheDay("3.5.2", "616")