const tempCtx = document.getElementById('tempChart').getContext('2d');
const soundCtx = document.getElementById('soundChart').getContext('2d');
const heartCtx = document.getElementById('heartChart').getContext('2d');


let tempData = {
    labels: [],
    datasets: [{
        label: 'Temperature (°C)',
        data: [],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 1
    }]
};

let soundData = {
    labels: [],
    datasets: [{
        label: 'Sound Level (dB)',
        data: [],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 1
    }]
};

let heartData = {
    labels: [],
    datasets: [{
        label: 'Heart Rate (bpm)',
        data: [],
        fill: false,
        borderColor: 'rgb(255, 206, 86)',
        tension: 1
    }]
};



let tempchart = new Chart(tempCtx, {
    type: 'line',
    data: tempData,
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Temperature (°C)' },
        min: 0,
        max: 50 }
        }
    }
});

let soundchart = new Chart(soundCtx, {
    type: 'line',
    data: soundData,
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Sound Level (dB)' }, 
            min: 10,
            max: 50}
        }
    }
});

let heartchart = new Chart(heartCtx, {
    type: 'line',
    data: heartData,
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Heart Rate (bpm)' },
                 min: 40, max: 180 }
        }
    }
});


function fetchData() {
    fetch('/get-latest-data')
        .then(response => response.json())
        .then(data => {
            const currentTime = new Date().toLocaleTimeString();

            if (data && data.payload && !isNaN(data.payload)) {
                const payloadStr = data.payload.toString().padStart(6, '0'); // Ensure 6 digits
                const tempVal = parseFloat(payloadStr.slice(0, 4)) / 100; // Example: "1234" -> 12.34°C
                const soundVal = parseInt(payloadStr.slice(4, 6)); // Example: "56" -> 56 dB
                const heartVal = parseInt(payloadStr.slice(6, 8)); // Adjust this if needed 

                // Update temperature chart
                tempchart.data.labels.push(currentTime);
                tempchart.data.datasets[0].data.push(tempVal);
                if (tempchart.data.labels.length > 20) {
                    tempchart.data.labels.shift();
                    tempchart.data.datasets[0].data.shift();
                }

                // Update sound chart
                soundchart.data.labels.push(currentTime);
                soundchart.data.datasets[0].data.push(soundVal);
                if (soundchart.data.labels.length > 20) {
                    soundchart.data.labels.shift();
                    soundchart.data.datasets[0].data.shift();
                }

                // Update heart chart
                heartchart.data.labels.push(currentTime);
                heartchart.data.datasets[0].data.push(heartVal);
                if (heartchart.data.labels.length > 20) {
                    heartchart.data.labels.shift();
                    heartchart.data.datasets[0].data.shift();
                }
                


                tempchart.update();
                soundchart.update();
                heartchart.update();
                
            } else {
                console.error('Invalid payload received:', data.payload);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}


// Fetch data every 30 second
setInterval(fetchData, 1000);
