function createChart(diurnalData) {
        diurnalData.sort(function(a, b){return a.MONTH - b.MONTH});

        var min = [];
        var max = [];
        var sum3 = 0;
        var sum4 = 0;
        for (var i = 1; i < 13; i++) {
            var monthData =  diurnalData.filter(diurnalData => diurnalData.MONTH == i);
            var sum1 = 0;
            var sum2 = 0;
            var count = 0;
            
            for (var k = 0; k < monthData.length; k++) {
                if (monthData[k].MAX !== 9999.9) {
                    if (monthData[k].MIN !== 9999.9) {   
                    sum1 += parseInt( monthData[k].MAX, 10 );
                    sum2 += parseInt( monthData[k].MIN, 10 );
                    count += 1;
                    }
                }
            };
            console.log(sum1);
            console.log(count);
            // if (monthData.length !== 0) {
            var avg1 = sum1/count;
            var avg2 = sum2/count;
                let data = {
                    x: i,
                    y: avg1
                };
                max.push(data);    
                    
                let data2 = {
                    x: i,
                    y: avg2
                };
                min.push(data2)
                sum3 += avg1
                sum4 += avg2
            // }
            
        };
        console.log(max);
        console.log(min);
        var avg3 = sum3/min.length;
        var avg4 = sum4/min.length;
        var unrounded = avg1 - avg2;
        var avgDiurnal = Math.round(unrounded)
        console.log(avgDiurnal)
        document.getElementById("average").innerHTML = `<p>The average diurnal tempature range for the US is ${avgDiurnal}</p>`;

      var ctx = document.getElementById('MinMaxChart').getContext('2d'); //get the context (canvas)
  
          
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    datasets: [{ 
                      data: min,
                      label: "Min",
                      borderColor: "#3cba9f",
                      backgrrunoundColor: "#71d1bd",
                      fill: false,
                      spanGaps: true,
                    }, { 
                      data: max,
                      label: "Max",
                      borderColor: "#3cba9f",
                      backgroundColor: "#7bb6dd",
                      fill: '-1',
                      spanGaps: true,
                    }, 
                  ]
                },
                options: {
                  maintainAspectRatio: false,
                  spanGaps: true,
                  elements: {
                      line: {
                          tension: 0.000001
                      }
                  },
                  plugins: {
                      filler: {
                          propagate: false
                      }
                  },
                  scales: {
                      xAxes: [{
                          ticks: {
                              
                              beginAtZero: true,
                              steps: 1,
                              stepValue: 1,
                              maxTicksLimit: 12, 
                              maxRotation: 0
                          }
                      }],
                  }
                }

              });
}
function drawType(year) {
    // ping type route
    d3.json(`/${year}/data`).then(function (myData) {
        createChart(myData)
    });
};

// initialize upon page load
function initWeather() {

    // get first value for type
    let selection = document.getElementById('MinMax').options[0].value

    // ping type route
    d3.json(`/${selection}/data`).then(function (myData) {
        createChart(myData) 
    });
    
    
}

initWeather();