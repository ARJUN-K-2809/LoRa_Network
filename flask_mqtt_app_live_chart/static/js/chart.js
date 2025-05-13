const tempCtx = document.getElementById('tempChart').getContext('2d');
const soundCtx = document.getElementById('soundChart').getContext('2d');
const heartCtx = document.getElementById('heartChart').getContext('2d');
const heartAlert = document.getElementById('heartAlert');
const tempAlert = document.getElementById('tempAlert');

// Chart initialization
const soundChart = new Chart(document.getElementById('soundChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Sound Level',
            borderColor: 'blue',
            data: [],
            fill: false,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Sound Level (dB)' },
        min: 45,
        max: 55,
        ticks: {
            stepSize: 5 // <-- Step size added here
         }
        
        }
        }
    }

});

const heartChart = new Chart(document.getElementById('heartChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Heart Rate',
            borderColor: 'red',
            data: [],
            fill: false,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Heart Rate (BPM)' },
        min: 0,
        max: 300,
        ticks: {
            stepSize: 5 // <-- Step size added here
         }
         }
         
        }
    }

});

const tempChart = new Chart(document.getElementById('tempChart'), {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature (°C)',
            borderColor: 'green',
            data: [],
            fill: false,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Temperature (°C)' },
        min: 0,
        max:80,
        ticks: {
            stepSize: 5 // <-- Step size added here
         }
         }
        }
    }

});



function extractValue(raw, prefix) {
    const match = raw.match(new RegExp(prefix + "(\\d+)"));
    return match ? parseInt(match[1]) : 0;
}

function updateCharts() {
    fetch('/get-latest-data')
        .then(res => res.json())
        .then(data => {
            // Extract and parse values
            console.log(data)
            const sound = extractValue(data['end-node-3'] || '', 'M');
            const heart = extractValue(data['end-node-4'] || '', 'H');
            const temp = extractValue(data['end-node-5'] || '', 'T');

            console.log("Sound:", sound, "Heart:", heart, "Temp:", temp);

            // Update charts (example below)
            addChartData(soundChart, sound);
            addChartData(heartChart, heart);
            addChartData(tempChart, temp);

            // Optional alert
            const heartAlert = document.getElementById('heartAlert');
            if (heart > 100) {
                heartAlert.classList.remove('hidden');
            } else {
                heartAlert.classList.add('hidden');
            }

            // temp Alert
            const tempAlert = document.getElementById('tempAlert');
            if (temp > 33) {
                tempAlert.classList.remove('hidden');
            } else {
                tempAlert.classList.add('hidden');
            }
        });
}

function addChartData(chart, value) {
    const now = new Date().toLocaleTimeString();
    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(value);
    if (chart.data.labels.length > 20) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    chart.update();
}

// Fetch data every second
setInterval(updateCharts, 3000);
