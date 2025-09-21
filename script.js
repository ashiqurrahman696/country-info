// Fetch all countries from API
async function fetchCountries(){
    try {
        let response = await fetch('https://restcountries.com/v3.1/all?fields=name'),
        data = await response.json(),
        countrySelect = document.getElementById('country-select');
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        data.forEach((country) => {
            let option = document.createElement('option');
            option.value = country.name.common;
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching countries: ', error);
    }
}

// Fetch country information from API when a country is selected
async function fetchCountryInfo(){
    let countryName = document.getElementById('country-select').value.toLowerCase();
    if(!countryName) return;
    try {
        let response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`),
        data = await response.json(),
        country = data[0];
        if(countryName == "china" || countryName == "mali"){
            country = data[1]; // Handle special cases for China and Mali
        }
        let infoDiv = document.getElementById('country-info'),
        currencies = country.currencies ? Object.values(country.currencies).map((currency) => currency.name + ' (' + currency.symbol + ')').join(', ') : 'N/A',
        languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
        infoDiv.innerHTML = `
            <h2>${country.name.common} - (${country.name.official})</h2>
            <h3>Flag</h3>
            <img src="${country.flags.png}" alt="${country.flags.alt}">
            ${country.coatOfArms.png ?
                `<h3>Coat of Arms</h3>
                <img src="${country.coatOfArms.png}" alt="Coat of Arms of ${country.name.common}" id="coat-of-arms">`
            : ''}
            <table border="1">
                <tr>
                    <td><strong>Capital:</strong></td>
                    <td>${country.capital ? country.capital.join(', ') : 'N/A'}</td>
                </tr>
                <tr>
                    <td><strong>Top-Level Domains:</strong></td>
                    <td>${country.tld ? country.tld.join(', ') : 'N/A'}</td>
                </tr>
                <tr>
                    <td><strong>Currencies:</strong></td>
                    <td>${currencies}</td>
                </tr>
                <tr>
                    <td><strong>Languages:</strong></td>
                    <td>${languages}</td>
                </tr>
                <tr>
                    <td><strong>Region:</strong></td>
                    <td>${country.region}</td>
                </tr>
                <tr>
                    <td><strong>Subregion:</strong></td>
                    <td>${country.subregion ?? 'N/A'}</td>
                </tr>
                <tr>
                    <td><strong>Latitude/Longitude:</strong></td>
                    <td>${country.latlng.join(', ')}</td>
                </tr>
                <tr>
                    <td><strong>Area:</strong></td>
                    <td>${country.area.toLocaleString()} km<sup>2</sup></td>
                </tr>
                <tr>
                    <td><strong>Population:</strong></td>
                    <td>${country.population.toLocaleString()}</td>
                </tr>
                <tr>
                    <td><strong>Timezones:</strong></td>
                    <td>${country.timezones.join(', ')}</td>
                </tr>
                <tr>
                    <td><strong>Continents:</strong></td>
                    <td>${country.continents.join(', ')}</td>
                </tr>
                <tr>
                    <td><strong>Start of week:</strong></td>
                    <td>${country.startOfWeek}</td>
                </tr>
                <tr>
                    <td><strong>Maps:</strong></td>
                    <td>
                        <a href="${country.maps.googleMaps}" target="_blank">Google Maps</a>,
                        <a href="${country.maps.openStreetMaps}" target="_blank">OpenStreetMap</a>
                    </td>
                </tr>
            </table>
        `;
    } catch (error) {
        console.error('Error fetching country info: ', error);
    }
}
fetchCountries();
