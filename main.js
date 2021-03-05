// givenUrl = `https://covid-api.mmediagroup.fr/v1/history?continent=Asia&status=deaths`

// Twoim zadaniem jest:
// - pobranie wyników dla Europy z statusem przypadków potwierdzonych zakażeń COVID-19,
// - zwrócenie wyników tylko dla krajów o powierzchni mniejszej niż 150000 km2,
// - policzenie sumy przypadków dla ostatnich pięciu dni danego kraju,
// - wyświetlenie listy wyników w HTML wg wzoru:
// country continent sq_km_area capital_city [sum_of_cases]
// np.
// Greece Europe 131626 Athenai 33160 


async function getData(continent, status) {
    try {
        const apiUrl = `https://covid-api.mmediagroup.fr/v1/history?continent=${continent}&status=${status}`;
        const results = await fetch(apiUrl);
        const datas = await results.json();

        const countryList = Object.values(datas);
        const smallCountryList = countryList.filter(country => country.All.sq_km_area < 15000);
        smallCountryList.forEach(country => {
            const datas = Object.values(country.All.dates);
            const lastFiveDaysResults = datas.slice(0, 5);
            const totalSick = getSum(lastFiveDaysResults);

            const dataToShow = {
                country: country.All.country,
                continent: continent,
                surface: country.All.sq_km_area,
                capitalCity: country.All.capital_city,
                totalSick: totalSick
            }
            showData(dataToShow);
        })
    }
    catch (e) {
        console.error(e.message);
    }
}

function getSum(array) {
    let sum = array.reduce((acc, val) => acc = acc + val);
    return sum;
}

function showData(object) {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `${object.country} ${object.continent} ${object.surface} ${object.capitalCity} ${object.totalSick}`
    list.appendChild(li);
}

// -------- FUNCTION EXECUTION --------------
(function () {
    getData('Europe', 'confirmed');
})()

