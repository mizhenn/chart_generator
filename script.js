let chartData = {
    labels: [],
    datasets: [{
        label: '# of Values',
        data: [],
        backgroundColor: [
            'rgba(99, 124, 255, 0.5)',
            'rgba(99, 208, 255, 0.5)',
            'rgba(99, 255, 182, 0.5)',
            'rgba(224, 255, 99, 0.5)',
            'rgba(255, 195, 99, 0.5)',
            'rgba(255, 114, 99, 0.5)'
        ],
        borderColor: [
            'rgba(99, 124, 255, 0.5)',
            'rgba(99, 208, 255, 0.5)',
            'rgba(99, 255, 182, 0.5)',
            'rgba(224, 255, 99, 0.5)',
            'rgba(255, 195, 99, 0.5)',
            'rgba(255, 114, 99, 0.5)'
        ],
        borderWidth: 1
    }]
};

//Function to create a new chart
function createChart(type, height = 400){
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.innerHTML = `<canvas id="myChart"></canvas>`;
    canvasContainer.style.height = `${height}px`;

    const ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, { 
        type: type,
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: (event, activeElements) => {
                if(activeElements.length > 0){
                    const { datasetIndex, index } = activeElements[0];
                    removeData(datasetIndex, index);
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            }
        }
    });

}

let myChart = createChart('bar'); // Create initial chart with default height = 400

function addData(){
    const labelInput = document.getElementById('labelInput');
    const dataInput = document.getElementById('dataInput');

    if(labelInput.value && dataInput.value){//checking if both label and data inputs are filled
        chartData.labels.push(labelInput.value);
        chartData.datasets.forEach((dataset) =>{
            dataset.data.push(dataInput.value);
        });
        myChart.update();
        labelInput.value = '';
        dataInput.value = '';
    }
}

//Function to update the chart type
function updateChartType() {
    const selectedType = document.getElementById('chartType').value;
    myChart.destroy(); // Destroy the old chart
    myChart = createChart(selectedType); // Corrected line
}

//Function to remove data from the chart
function removeData(datasetIndex, index) {
    if (chartData.labels.length > index) {
        chartData.labels.splice(index, 1);
        chartData.datasets[datasetIndex].data.splice(index, 1);
        myChart.update();
    }
}