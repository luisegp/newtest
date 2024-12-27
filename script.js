const API_URL = "https://api.example.com/patients";
const patientId = "JessicaTaylor";

const ageElement = document.getElementById("age");
const bloodTypeElement = document.getElementById("blood-type");
const ctx = document.getElementById("bloodPressureChart").getContext("2d");

async function fetchPatientData() {
    try {
        const response = await fetch(`${API_URL}?id=${patientId}`);
        const data = await response.json();

        ageElement.textContent = data.age;
        bloodTypeElement.textContent = data.bloodType;

        const chartData = {
            labels: data.bloodPressure.map(bp => bp.year),
            datasets: [{
                label: "Blood Pressure",
                data: data.bloodPressure.map(bp => bp.value),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        };

        new Chart(ctx, {
            type: "line",
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top"
                    }
                }
            }
        });
    } catch (error) {
        console.error("Erro ao buscar dados do paciente:", error);
    }
}

fetchPatientData();
