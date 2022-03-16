// Import the data from data.js.
const tableData = data;

// Reference the HTML table using d3.
let tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data.
    tbody.html("");
    // Next, loop through each object in the data and append a row and cells for
    // each value in the row.
    data.forEach((dataRow) => {
        // Append a row to the table body.
        let row = tbody.append("tr");
        // Object.values(dataRow) accesses just the values of the dataRow object.
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
}

function handleClick() {
    // Grab the datetime value from the filter (if one was entered).
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;

    if (date) {
        filteredData = filteredData.filter((row) => row.datetime === date);
    };

    // Rebuild the table using the filtered data. If no date was entered, then
    // filteredData will just be the original tableData.
    buildTable(filteredData);
}

// Set up event listener
d3.selectAll("#filter-btn").on("click", handleClick);

// Build initial table.
buildTable(tableData);
