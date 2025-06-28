<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Student Dropout Report</title>
  <!-- Include Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 2rem;
    }
    #dropoutChart {
      max-width: 400px;
      max-height: 400px;
      margin: auto;
    }
    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      margin-bottom: 1rem;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Student Dropout Report</h1>
  <button id="showReport">Show Report</button>
  <div style="position: relative; height: 400px; width: 400px; margin: auto;">
    <canvas id="dropoutChart"></canvas>
  </div>

  <script>
    // When the "Show Report" button is clicked, load the CSV data.
    document.getElementById("showReport").addEventListener("click", function () {
      fetch("data/student_dropout_dataset.csv")
        .then(response => response.text())
        .then(csvData => {
          processCSVData(csvData);
        })
        .catch(error => console.error("Error loading CSV:", error));
    });

    // Process CSV data to count dropouts and non-dropouts.
    function processCSVData(csvData) {
      // Split the CSV into rows and remove the header row.
      const rows = csvData.split("\n").slice(1);
      let dropoutCount = 0;
      let nonDropoutCount = 0;

      rows.forEach(row => {
        if (!row.trim()) return; // Skip empty rows
        const cols = row.split(",");
        // Use the last column as the dropout status.
        const dropoutStatus = cols[cols.length - 1].trim().toLowerCase();

        if (dropoutStatus === "yes") {
          dropoutCount++;
        } else if (dropoutStatus === "no") {
          nonDropoutCount++;
        }
      });

      console.log("Dropout Count:", dropoutCount);
      console.log("Non-Dropout Count:", nonDropoutCount);

      renderPieChart(dropoutCount, nonDropoutCount);
    }

    // Render the pie chart using Chart.js.
    function renderPieChart(dropoutCount, nonDropoutCount) {
      const ctx = document.getElementById("dropoutChart").getContext("2d");

      // Destroy previous chart instance if it exists.
      if (window.myPieChart) {
        window.myPieChart.destroy();
      }

      window.myPieChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Dropout", "Non-Dropout"],
          datasets: [{
            data: [dropoutCount, nonDropoutCount],
            backgroundColor: ["#ff4d4d", "#4dff4d"], // Red for Dropout, Green for Non-Dropout
            borderColor: ["#ff0000", "#00ff00"],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend:{
              position: "top",
              labels: {
                font: {
                  size: 14
                }
              }
            }
          }
        }
      });
    }
  </script>
</body>
</html>
