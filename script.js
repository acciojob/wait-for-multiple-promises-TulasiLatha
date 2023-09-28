
// Function to create a promise with a random delay between 1 and 3 seconds
function createPromise(id) {
  const delay = Math.floor(Math.random() * 3000) + 1000; // Random delay between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `Promise ${id}`,
        delay: delay / 1000, // Convert milliseconds to seconds
      });
    }, delay);
  });
}

// Function to update the table with promise results
function updateTableWithPromises() {
  // Select the table body
  const tableBody = document.getElementById("output");

  // Remove any existing rows
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

  // Create an array to store the promises
  const promises = [];

  // Create three promises and add them to the array
  for (let i = 1; i <= 3; i++) {
    promises.push(createPromise(i));
  }

  // Wait for all promises to resolve
  Promise.all(promises)
    .then((results) => {
      // Create rows for each promise result
      results.forEach((result) => {
        const newRow = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");

        col1.textContent = result.id;
        col2.textContent = result.delay.toFixed(3); // Format delay as a decimal number with 3 decimal places

        newRow.appendChild(col1);
        newRow.appendChild(col2);

        tableBody.appendChild(newRow);
      });

      // Calculate and add the total row
      const totalRow = document.createElement("tr");
      const totalCol1 = document.createElement("td");
      const totalCol2 = document.createElement("td");

      totalCol1.textContent = "Total";
      const totalTime = results.reduce((total, result) => total + result.delay, 0);
      totalCol2.textContent = totalTime.toFixed(3); // Format total time as a decimal number with 3 decimal places

      totalRow.appendChild(totalCol1);
      totalRow.appendChild(totalCol2);

      tableBody.appendChild(totalRow);
    })
    .catch((error) => {
      console.error("At least one promise rejected:", error);
    });
}

// Call the function to update the table with promises
updateTableWithPromises();
