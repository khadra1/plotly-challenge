//1. Use the D3 library to read in data from samples.json 
// Read in the JSON data 

// const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function buildPlot() {
    console.log("funtion started")
    //1. Use the D3 library to read in data from samples.json 
    // Read in the JSON data 
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    ).then((samplesData) => {
        let data = samplesData.samples;
        console.log(data);

        //2. Create a horizontal bar chart with dropdown menu to display top 10 OTUs found 

        // Get the top 10 

        // Create variables for the otu_ids, otu_labels sample_values and the text for the bar chart
        let otuIDS = data[0].otu_ids;
        let otuLabels = data[0].otu_labels;
        let sampleValues = data[0].sample_values;
        // let text = otuLabels.slice(0, 10).reverse;

        // Use sample_values as values for the bar chart
        // Use otu_ids as labels for the bar chart
        // Use otu_labels as the hovertext for the charts
        let traceBar = {
            type: "bar",
            x: sampleValues.slice(0, 10).reverse(),
            y: otuIDS.slice(0, 10).map(item => `OTU${item}`).reverse(),
            text: otuLabels.slice(0, 10).reverse(),
            orientation: "h"
        };
        // Store the data under a variable
        let dataBar = [traceBar];

        // Store the layout under a variable
        let layoutBar = {
            title: "Top 10 OTUs",
            xaxis: { title: "OTU ID" },
            showlegend: false

        };

        // Render the plot to the div tag with id "bar"
        Plotly.newPlot('bar', dataBar, layoutBar);




        // 3. Create a bubble chart that displays each sample

        // Store the plot for the bubble chart under a variable 
        let traceBubble = {
            // Use otu_ids for the x values.
            x: otuIDS,

            // Use sample_values for the y values.
            y: sampleValues,
            // Use otu_labels for the text values.
            text: otuLabels,

            // Use sample_values for the marker size.
            mode: "markers",
            marker: {
                size: sampleValues,

                // Use otu_ids for the marker colors.
                color: otuIDS,
                colorscale: "Earth"
            },
        }

        // Store the data under a variable

        let dataBubble = [traceBubble];

        // Use otu_labels for the text values.
        let layoutBubble = {
            x: { title: "OTU ID" }
        };

        // Render the plot to the div tag with id "bubble"
        Plotly.newPlot('bubble', dataBubble, layoutBubble)
    })
};



function buildMetadata() {
    console.log("metadata started")

    // //4. Display the sample metadata: an individual demographic information
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    ).then((getMeta) => {
        let metadata = getMeta.names;
        result = metadata;

        console.log(result);

        // //5. Display each key-value pair from the metadata JSON object somewhere on the page 
        // Render the plot to the div tag with id "sample-metadata"
        let sampleMetadata = d3.select("#selDataset");

        sampleMetadata.html("");
        

        Object.entries(result).forEach(([key, value]) => {
            sampleMetadata.append("h5").text(`${key}: ${value}`);
            console.log(key, value);

        })
    })
}
// 6. Update all the plots when a new sample is selected
function selectData() {
    console.log("selection started")
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
    ).then((selectData) => {
        let select = d3.select("#selDataset");
        let names = selectData.names;
        names.forEach((sample) => {
            select
                .append("optionChanged")
                .text(sample)
                .property("value");

        });


    })
    // // Bonus:
    // // Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
    // washFreq = samplesData.metadata.map(item => item.wfreq);
    // console.log(washFreq);

    // You will need to modify the example gauge code to account for values ranging from 0 through 9.

    // Update the chart whenever a new sample is selected.
}
