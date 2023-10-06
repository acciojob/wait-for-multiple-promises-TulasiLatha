const table = document.getElementById("table");

function createPromise() {
  const randomTime = Math.floor(Math.random() * 3000) + 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomTime);
    }, randomTime);
  });
}

const promises = [createPromise(), createPromise(), createPromise()];

const loadingRow = table.insertRow();
const loadingCell = loadingRow.insertCell();
loadingCell.colSpan = 2;
loadingCell.textContent = "Loading...";

Promise.all(promises)
  .then((results) => {
    table.deleteRow(0);

    const row1 = table.insertRow();
    row1.insertCell().textContent = "Promise 1";
    row1.insertCell().textContent = `${(results[0] / 1000).toFixed(3)}`;

    const row2 = table.insertRow();
    row2.insertCell().textContent = "Promise 2";
    row2.insertCell().textContent = `${(results[1] / 1000).toFixed(3)}`;

    const row3 = table.insertRow();
    row3.insertCell().textContent = "Promise 3";
    row3.insertCell().textContent = `${(results[2] / 1000).toFixed(3)}`;

    const totalTime = results.reduce((acc, time) => acc + time, 0);
    const totalRow = table.insertRow();
    totalRow.insertCell().textContent = "Total";
    totalRow.insertCell().textContent = `${(totalTime / 1000).toFixed(3)}`;
  })
  .catch((error) => console.error(error));
