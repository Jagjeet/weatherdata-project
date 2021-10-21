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
    initializeStationIdsSelector();

    d3.json(`api/v1.0/weatherdata/period/${startDate}/${endDate}/${stationId}`)
                        .then(function (responseData) {

        console.log(responseData)

        updateStationInfo(responseData)

        // Setup event listeners for changing station, etc.
        selector.on("change", function(){
            updateLineChart();
        });

        let xData = responseData.map( x => {
            let d = new Date(x.YEARMODA);
            // return d.toISOString().split('T')[0];
            return d.toISOString().substring(0,10);
        });
        let tempTrace = {
            x: xData,
            y: responseData.map(x => x.TEMP),
            type: 'line',
            line: {
                color: 'rgb(0, 255, 0)',
                width: 1
            },
            name: 'Temperature'
        }

        let minTrace = {
            x: xData,
            y: responseData.map(x => x.MIN),
            type: 'line',
            line: {
                color: 'rgb(0, 0, 255)',
                width: 1
            },
            name: 'Min Temperature'
        }

        let maxTrace = {
            x: xData,
            y: responseData.map(x => x.MAX),
            type: 'line',
            line: {
                color: 'rgb(255, 0, 0)',
                width: 1
            },
            name: 'Max Temperature'
        }

        var layout = {
            title: 'Temperature (Degrees Fahrenheit) vs Date (GMT)',
            xaxis: {
                title: 'Date (GMT)',
                tickmode: 'auto',
                tickangle: -45
            },
            yaxis: {
                title: 'Degrees Fahrenheit',
                range: [-40, 120]
            }
          };

        let tempData = [tempTrace, minTrace, maxTrace]

        // draw plot
        Plotly.newPlot('weatherLine', tempData, layout);
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

        updateStationInfo(responseData);

        let xData = responseData.map( x => {
            let d = new Date(x.YEARMODA);
            // return d.toISOString().split('T')[0];
            return d.toISOString().substring(0,10);
        });

        let tempTrace = {
            x: [xData],
            y: [responseData.map(x => x.TEMP)],
        }

        let minTrace = {
            x: [xData],
            y: [responseData.map(x => x.MIN)],
        }

        let maxTrace = {
            x: [xData],
            y: [responseData.map(x => x.MAX)],
        }

        // restyle existing plots
        Plotly.restyle('weatherLine', tempTrace, 0);
        Plotly.restyle('weatherLine', minTrace, 1);
        Plotly.restyle('weatherLine', maxTrace, 2);

    });
}

function updateStationInfo(data) {
    let metadataSelector = d3.select("#station-metadata");

    metadataSelector.selectAll("p").remove();

    metadataSelector
    .append("p")
    .text(`Station Name: ${data[0]['STATION NAME']}`);

    // metadataSelector
    // .append("p")
    // .text(`Location: ${data[0]['CTRY']}`);

    metadataSelector
    .append("p")
    .text(`State: ${data[0]['STATE']}`);


    metadataSelector
    .append("p")
    .text(`Elevation (meters): ${data[0]['ELEV(M)']}`);

    metadataSelector
    .append("p")
    .text(`Latitude: ${data[0]['LAT']}`);

    metadataSelector
    .append("p")
    .text(`Latitude: ${data[0]['LON']}`);

}

initWeather();