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
        // Object.values(dataRow) accesses just the values of the dataRow
        // object.
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
}

// 1. Create a variable to keep track of all the filters as an object.
let filters = {};

// 3. Use this function to update the filters.
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    selection = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    value = selection.property("value").toLowerCase();
    // 4c. Save the id of the filter that was changed as a variable.
    id = selection.attr("id");

    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters
    // object.
    if (value) {
        filters[id] = value;
    } else {
        delete filters[id]
    };

    // 6. Call function to apply all filters and rebuild the table
    filterTable();
}

// 7. Use this function to filter the table when data is entered.
function filterTable() {

    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;

    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(([id, value]) => {
        filteredData = filteredData.filter((row) => row[id] === value);
    });

    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
}

// 2. Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);

// Build initial table.
buildTable(tableData);
