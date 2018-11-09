function getData(indicator, areaCode) {
    if (localStorage.getItem(indicator) === null) {
        return axios.get('https://unstats.un.org/SDGAPI/v1/sdg/Indicator/Data?indicator=' + indicator + '&areaCode=' + areaCode)
        .then(function (response) {
            console.log(response);
            localStorage.setItem(indicator, JSON.stringify(response));
        });
    }
}

getData("3.5.2", "616")