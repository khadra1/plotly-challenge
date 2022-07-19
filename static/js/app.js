//1. Use the D3 library to read in data from samples.json 
// Read in the JSON data 

// Chain the getD3 function with async function and await the data to catch any errors
const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
async function getD3 () {
    let data = false;
    try{
        data = await d3.json(dataURL)
    }catch(err){
        console.error(err)
    }
    return data;
   
}

//  window.onload triggers when the HTML is loaded
let sampleData;
window.onload =async ()=>{
    //when the page has loaded
    sampleData = await getD3();
    // console.log("sampleData =" + typeof sampleData)
    let selectedMeta = sampleData.metadata.find(each=>each.id==940);
    // console.log("selectedMeta =" + selectedMeta)
    let washData = selectedMeta.wfreq;
    // console.log("washData =" + washData);
    // functions used on this page with the relevant data 
    selectData(selectedMeta);
    buildMetadata(sampleData.names);
    buildPlot(sampleData.samples[0]);
    buildGauge(washData);
 
}

//  function builPlot to plot the bar and bubble charts
function buildPlot(samples) {
    // console.log("function started")
   
     let data = samples;
     
        //2. Create a horizontal bar chart with dropdown menu to display top 10 OTUs found 
        // Get the top 10 

        // Create variables for the otu_ids, otu_labels sample_values and the text for the bar chart
        let otuIDS = data.otu_ids;
        let otuLabels = data.otu_labels;
        let sampleValues = data.sample_values;
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
        Plotly.newPlot("bar", dataBar, layoutBar);




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
        Plotly.newPlot("bubble", dataBubble, layoutBubble)
}

//  metadata function
function buildMetadata(names) {
    // console.log("metadata started")

    // //4. Display the sample metadata: an individual demographic information
    let metadata = names;
        result = metadata;

        // //5. Display each key-value pair from the metadata JSON object somewhere on the page 
        // Render the plot to the div tag with id "sample-metadata"
        let sampleMetadata = d3.select("#selDataset");
      
        sampleMetadata.html("");

        Object.entries(result).forEach(([key, value]) => {
            sampleMetadata.append("option").text(`${value}`);
            // console.log(key, value);

        })
}


//  function for the demographic change event option button which will change all plots automatically
function optionChanged(event) {
    let selectedSample = sampleData.samples.find(each=>each.id==event);
    buildPlot(selectedSample)
    // console.log(event)

    let sampleMeta  =sampleData.metadata.find(each=>each.id==event);
    selectData(sampleMeta);
    let washFreq = sampleData.metadata.find(each=>each.id==event)
    buildGauge(washFreq.wfreq)
    // console.log(washFreq)

}
// 6. Update all the plots when a new sample is selected
function selectData(names) {
    // console.log("selection started",names)
    let select = d3.select("#sample-metadata");
    select.html("")

    let keys = Object.keys(names);
    let values= Object.values(names);
    let length =keys.length;
    for(let i=0;i<length;i++){
        select.append("p").text(keys[i]+" : "+values[i]);
    }
}

// Bonus:
// Wash Frequency Gauge
// You will need to modify the example gauge code to account for values ranging from 0 through 9.
    function buildGauge(washData){
        // console.log("washData =" + washData);


    let steps = [];
    let colors = ["#7fb485", "#83bb8a","#86bf7f","#b6cb8a", "#d4e494", "#e4e8af", 
    "#e8e5c8", "#f3f0e4", "#f7f2eb"]
    for(let i=0;i<=8;i++){
        steps.push({range:[i,i+1],color:colors})
    }

    // console.log("steps =" + steps);
    let washingData = [
        {
          domain: { x: [0, 5], y: [0, 1] },
          value: washData,
          title:'<b>Belly Button Washing Frequency</b> <br> Scrubs Per Week',
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
                { range: [0, 1], color: "#f7f2eb"},
                { range: [1, 2], color: "#f3f0e4" },
                { range: [2, 3], color: "#e8e5c8" },
                { range: [3, 4], color: "#e4e8af" },
                { range: [4, 5], color: "#d4e494"},
                { range: [5, 6], color: "#b6cb8a" },
                { range: [6, 7], color: "#86bf7f" },
                { range: [7, 8], color: "#83bb8a" },
                { range: [8, 9], color: "#7fb485" },

              ],
            threshold: {
              line: { color: colors, width: 4 },
              thickness: 0.75,
              value: 9
            }
          }
        }
      ];
      
      let washingLayout = { 
          width: 600, 
          height: 450, 
          margin: { t: 0, b: 0 } };


      Plotly.newPlot("gauge", washingData, washingLayout);
      
    
}

