let patientID = 0;
const patients = [];
const patientTable = document.getElementById('patientTable');
const totalPatients = document.getElementById('totalPatients');
const upcomingAppointments = document.getElementById('upcomingAppointments');

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function addPatient() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const diagnosis = document.getElementById('diagnosis').value;
    const appointment = document.getElementById('appointment').value;

    if (name && age && gender && diagnosis && appointment) {
        patientID += 1;
        const newPatient = {
            id: patientID,
            name,
            age,
            gender,
            diagnosis,
            appointment
        };

        patients.push(newPatient);
        updatePatientTable();
        updateDashboard();
        document.getElementById('patientForm').reset();
    } else {
        alert('Please fill in all fields');
    }
}

function updatePatientTable() {
    patientTable.innerHTML = '';
    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.diagnosis}</td>
            <td>${patient.appointment}</td>
        `;
        patientTable.appendChild(row);
    });
}

function updateDashboard() {
    totalPatients.textContent = patients.length;
    const upcoming = patients.filter(patient => new Date(patient.appointment) >= new Date());
    upcomingAppointments.textContent = upcoming.length;
}

function filterPatients() {
    const query = document.getElementById('search').value.toLowerCase();
    const filtered = patients.filter(patient => 
        patient.name.toLowerCase().includes(query) || 
        String(patient.id).includes(query)
    );

    patientTable.innerHTML = '';
    filtered.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.diagnosis}</td>
            <td>${patient.appointment}</td>
        `;
        patientTable.appendChild(row);
    });
}
