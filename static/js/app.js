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
    let stationId = "700635"

    console.log(startDate);
    console.log(endDate);
    console.log(stationId);

    //Initialize selector with station ids for the period
    initializeStationIdsSelector(startDate, endDate, selector);

    d3.json(`api/v1.0/weatherdata/period/${startDate}/${endDate}/${stationId}`)
                        .then(function (responseData) {

        console.log(responseData)

        // Setup event listeners for changing station, etc.
        selector.on("change", function(){
            updateLineChart();
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

initWeather();