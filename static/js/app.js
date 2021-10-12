// type plot
function drawType(fruit) {

  // ping type route
  d3.json(`/${fruit}/data`).then(function (myData) {

      // map values
      let newX = myData.map(x => x.type);
      let newY = myData.map(x => x.cost);

      // restyle existing type plot
      Plotly.restyle('fruitBar', 'x', [newX]);
      Plotly.restyle('fruitBar', 'y', [newY]);

  });
};

// cost plot
function drawVal(fruitVal) {

  // ping cost route
  d3.json(`/cost-gt/${fruitVal}`).then(function (myData) {

      // map values
      let newX = myData.map(x => x.type);
      let newY = myData.map(x => x.cost);

      // restyle existing cost plot
      Plotly.restyle('fruitVal', 'x', [newX]);
      Plotly.restyle('fruitVal', 'y', [newY]);

  });
};

// initialize upon page load
function initFruit() {

  // get first value for type
  let selection = document.getElementById('fruit').options[0].value;

  // ping type route
  d3.json(`/${selection}/data`).then(function (myData) {

      console.log(selection)
      let data = [
          {
              x: myData.map(x => x.type),
              y: myData.map(x => x.cost),
              type: 'bar'
          }
      ]
      // draw plot
      Plotly.newPlot('fruitBar', data);
  });

  // get first value for cost
  let selectionVal = document.getElementById('fruitValue').options[0].value

  // ping cost route
  d3.json(`/cost-gt/${selectionVal}`).then(function (myData) {

      console.log(selectionVal);
      let data = [
          {
              x: myData.map(x => x.type),
              y: myData.map(x => x.cost),
              type: 'bar'
          }
      ]
      // draw plot
      Plotly.newPlot('fruitVal', data);
  });
}

initFruit();