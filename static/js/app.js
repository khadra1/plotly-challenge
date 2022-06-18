//1. Use the D3 library to read in data from samples.json 
 // Read in the JSON data 

d3.json("../data/samples.json").then(funtion(samplesData);
//  let samplesData = d3.json("data/samples.json");
// // let sampleData = d3.
console.log(samplesData));
  


//2. Create a horizontal bar chart with dropdown menu to display top 10 OTUs found 

// Get top 10 
let sample = samplesData.samples.filter(item => item.id == value);
console.log(sample);

// Use sample_values as values for the bar chart
let trace = {
    type: "bar",
    x: x,
    y: y,
    text: text,
    orientation: "h"
};
// Store the data under a variable
let data = [trace];

// Store the layout under a variable
let layout = {
    title: "Top 10 OTUs",
    margin:{
        l:100,
        r:100,
        t:100,
        b:100
     };

};


Plotly.newPlot('bar', data, layout);


 
// Use otu_ids as labels for th bar chart
 
// Use otu_labels as the hovertext for the charts



//3. Create a bubble chart that displays each sample

let trace1 = {
// Use otu_ids for the x values.
    x: x,

// Use sample_values for the y values.
    y: y,

// Use sample_values for the marker size.
    mode: markers,

// Use otu_ids for the marker colors.
    
    };

// Store the data for the bubble chart under a variable 
let data1 = [trace1]

// Use otu_labels for the text values.

let layout1 = {
    title: "OTU Values",
    xaxis:{
        title: "OTU ID",
    }
};
Plotly.newPlot('bubble', trace1, layout1);
//4. Display the sample metadata: an individual demographic information

var metadata = samplesData.metadata.filter( item => item.id ==value);
console.log(metadata);

//5. Display each key-value pair from the metadata JSON object somewhere on the page 


// Bonus:
// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.


// You will need to modify the example gauge code to account for values ranging from 0 through 9.

// Update the chart whenever a new sample is selected.
init();
