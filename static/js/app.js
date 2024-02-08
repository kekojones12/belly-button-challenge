//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
const url = "samples.json";
d3.json(url).then(function(data) {
    console.log(data);
    var names = data.names;
    console.log(names);
    var metadata = data.metadata;
    console.log(metadata);
    var samples = data.samples;
    console.log(samples);
    var otu_ids = samples[0].otu_ids;
    console.log(otu_ids);
    var sample_values = samples[0].sample_values;
    console.log(sample_values);
    var otu_labels = samples[0].otu_labels;
    console.log(otu_labels);
    var otu_ids_10 = otu_ids.slice(0, 10);
    console.log(otu_ids_10);
    var sample_values_10 = sample_values.slice(0, 10);
    console.log(sample_values_10);
    var otu_labels_10 = otu_labels.slice(0, 10);
    console.log(otu_labels_10);
    var trace1 = {
        x: sample_values_10,
        y: otu_ids_10,
        type: "bar",
        orientation: "h"
    };
    var data = [trace1];
    var layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
    };
    Plotly.newPlot("bar", data, layout);
});


// Create a bubble chart that displays each sample.

// Use otu_ids for the x values.

// Use sample_values for the y values.

// Use sample_values for the marker size.

// Use otu_ids for the marker colors.

// Use otu_labels for the text values.
d3.json(url).then(function(data) {
    var otu_ids = data.samples[0].otu_ids;
    console.log(otu_ids);
    var sample_values = data.samples[0].sample_values;
    console.log(sample_values);
    var otu_labels = data.samples[0].otu_labels;
    console.log(otu_labels);
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids
        }
    };
    var data = [trace1];
    var layout = {
        title: "OTU IDs",
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
    };
    Plotly.newPlot("bubble", data, layout);
});

//Display the sample metadata, i.e., an individual's demographic information
d3.json(url).then(function(data) {
    var metadata = data.metadata[0];
    console.log(metadata);
    var metadata_keys = Object.keys(metadata);
    console.log(metadata_keys);
    var metadata_values = Object.values(metadata);
    console.log(metadata_values);
    var metadata_list = d3.select("#sample-metadata");
    metadata_list.html("");
    for (var i = 0; i < metadata_keys.length; i++) {
        metadata_list.append("li").text(`${metadata_keys[i]}: ${metadata_values[i]}`);
    }
});

//Update all the plots when a new sample is selected
d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly() {
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");

    d3.json(url).then(function(data) {
        var samples = data.samples;
        var metadata = data.metadata;

        for (var i = 0; i < samples.length; i++) {
            if (samples[i].id === dataset) {
                var otu_ids = samples[i].otu_ids;
                var sample_values = samples[i].sample_values;
                var otu_labels = samples[i].otu_labels;
                var otu_ids_10 = otu_ids.slice(0, 10);
                var sample_values_10 = sample_values.slice(0, 10);
                var otu_labels_10 = otu_labels.slice(0, 10);

                var trace1 = {
                    x: sample_values_10,
                    y: otu_ids_10,
                    type: "bar",
                    orientation: "h"
                };
                var dataBar = [trace1];
                var layoutBar = {
                    title: "Top 10 OTUs",
                    xaxis: { title: "Sample Values" },
                    yaxis: { title: "OTU IDs" }
                };
                Plotly.newPlot("bar", dataBar, layoutBar);

                var trace2 = {
                    x: otu_ids,
                    y: sample_values,
                    mode: "markers",
                    marker: {
                        size: sample_values,
                        color: otu_ids
                    }
                };
                var dataBubble = [trace2];
                var layoutBubble = {
                    title: "OTU IDs",
                    xaxis: { title: "OTU IDs" },
                    yaxis: { title: "Sample Values" }
                };
                Plotly.newPlot("bubble", dataBubble, layoutBubble);
            }
        }

        for (var i = 0; i < metadata.length; i++) {
            if (metadata[i].id == dataset) {
                var matchedMetadata = metadata[i];
                var metadataKeys = Object.keys(matchedMetadata);
                var metadataValues = Object.values(matchedMetadata);
                console.log(matchedMetadata);
                console.log(metadataKeys);
                console.log(metadataValues);
            }
        }
    });
}
