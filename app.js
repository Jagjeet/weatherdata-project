var map;
function updateControlsAndCharts() {
    //Initialize selector with station ids for the period
    initializeStationIdsSelector();

    //Update chart
    updateLineChart();
}

// initialize upon page load
function initWeather() {

    let startDate = document.getElementById('start-date-id').value;
    let endDate = document.getElementById('end-date-id').value;
    let selector = d3.select("#select-station-id");

    // Use hardcode selector value
    let stationId = "690150"

    console.log(startDate);
    console.log(endDate);
    console.log(stationId);

    //Initialize selector with station ids for the period
    initializeStationIdsSelector(startDate, endDate, selector);

    d3.json(`api/v1.0/weatherdata/period/${startDate}/${endDate}/${stationId}`)
        .then(function (responseData) {


            map = L.map('mapid').setView([responseData[0].LAT,responseData[0].LON], 7);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([responseData[0].LAT,responseData[0].LON]).addTo(map)
                .bindPopup(responseData[0].LBL)
                .openPopup();

            selector.on("change", function () {
                updateLineChart();

                console.log("Initial map lat and long")
                console.log(responseData[0].LAT)
                console.log(responseData[0].LON)
                updateMap();

         
            });

            let tempTrace = {
                x: responseData.map(x => x.YEARMODA),
                y: responseData.map(x => x.TEMP),
                type: 'line'
            }

            let minTrace = {
                x: responseData.map(x => x.YEARMODA),
                y: responseData.map(x => x.MIN),
                type: 'line'
            }

            let maxTrace = {
                x: responseData.map(x => x.YEARMODA),
                y: responseData.map(x => x.MAX),
                type: 'line'
            }

            let tempData = [tempTrace, minTrace, maxTrace]

            // draw plot
            Plotly.newPlot('weatherLine', tempData);
         


        });
}

function initializeStationIdsSelector() {
    let startDate = document.getElementById('start-date-id').value;
    let endDate = document.getElementById('end-date-id').value;
    let selector = d3.select("#select-station-id");

    d3.json(`api/v1.0/weatherdata/period/stations/${startDate}/${endDate}`).then(function (responseData) {
        console.log(responseData);

        responseData.forEach((station) => {
            selector
                .append("option")
                .text(station)
                .property("value", station);
        });
    });
}


function updateMap(){
    let startDate = document.getElementById('start-date-id').value;
    let endDate = document.getElementById('end-date-id').value;
    let selector = d3.select("#select-station-id");
    let selectedStationId = selector.property("value");

    console.log('Updating line chart:');
    console.log(startDate);
    console.log(endDate);
    console.log(selectedStationId);
    map.off();
    map.remove();

    d3.json(`api/v1.0/weatherdata/period/${startDate}/${endDate}/${selectedStationId}`)
    .then(function (responseData) {
        console.log("New latitude ", responseData[0].LAT)
        console.log("New longitude data", responseData[0].LON)

        map = L.map('mapid').setView([responseData[0].LAT,responseData[0].LON], 7);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([responseData[0].LAT,responseData[0].LON]).addTo(map)
            .bindPopup(responseData[0].LBL)
            .openPopup();

    })
}


function updateLineChart() {
    let startDate = document.getElementById('start-date-id').value;
    let endDate = document.getElementById('end-date-id').value;
    let selector = d3.select("#select-station-id");
    let selectedStationId = selector.property("value");

    console.log('Updating line chart:');
    console.log(startDate);
    console.log(endDate);
    console.log(selectedStationId);

    d3.json(`api/v1.0/weatherdata/period/${startDate}/${endDate}/${selectedStationId}`)
        .then(function (responseData) {

            console.log(responseData)
            console.log(selector);

            let tempTrace = {
                x: [responseData.map(x => x.YEARMODA)],
                y: [responseData.map(x => x.TEMP)],
            }

            let minTrace = {
                x: [responseData.map(x => x.YEARMODA)],
                y: [responseData.map(x => x.MIN)],
            }

            let maxTrace = {
                x: [responseData.map(x => x.YEARMODA)],
                y: [responseData.map(x => x.MAX)],
            }

            // restyle existing plots
            Plotly.restyle('weatherLine', tempTrace, 0);
            Plotly.restyle('weatherLine', minTrace, 1);
            Plotly.restyle('weatherLine', maxTrace, 2);

        });
}

function updatelocation(err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    var data = [
        {
            type: "scattermapbox",
            text: unpack(rows, "#select-station-id"),
            lon: unpack(rows, "LON"),
            lat: unpack(rows, "LAT"),
            marker: { color: "fuchsia", size: 4 }
        }
    ];

    var layout = {
        dragmode: "zoom",
        mapbox: { style: "open-street-map", center: { lat: 38, lon: -90 }, zoom: 3 },
        margin: { r: 0, t: 0, b: 0, l: 0 }
    };

    Plotly.newPlot("myDiv", data, layout);
}



initWeather();