<!-- Create Appointment Schedule (Version 1.0) 2:30AM -->

<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  
  // Define store to hold appointments
  const appointments = writable([]);
    
  // Function to add a new appointment
  const addAppointment = (date, time, description) => {
    const newAppointment = { date, time, description };
    appointments.update(prevAppointments => [...prevAppointments, newAppointment]);
  };
  
  let selectedHospital = '';
  let hospitalList = ['Sample Hospital 1', 'Sample Hospital 2', 'Sample Hospital 3'];
  let hospitalAddresses = ['123 Main St, Cityville, Country', '456 Oak Ave, Townsville, Country', '789 Pine Blvd, Villagetown, Country'];
  let hospitalContacts = ['123-456-7890', '234-567-8901', '345-678-9012'];

  const handleHospitalChange = event => {
    selectedHospital = event.target.value;
  };

  const displayHospitalInfo = () => {
    const selectedIndex = hospitalList.indexOf(selectedHospital);
    if (selectedIndex !== -1) {
      const hospitalAddress = hospitalAddresses[selectedIndex];
      const hospitalContact = hospitalContacts[selectedIndex];
      console.log('Hospital Address:', hospitalAddress);
      console.log('Hospital Contact:', hospitalContact);
    }
  };
  
  // New appointment section variables
  let selectedDate = ''; // Selected appointment date
  let selectedTime = ''; // Selected appointment time
  let timeOptions = ['10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00']; // Sample time options

  // New user information section variables
  let firstName = '';
  let lastName = '';
  let birthdate = '';
  let sexOptions = ['Male', 'Female'];
  let selectedSex = '';
  let bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  let selectedBloodType = '';

  const scheduleAppointment = () => {
    console.log('Selected Date:', selectedDate);
    console.log('Selected Time:', selectedTime);
    console.log('User Information:');
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Birthdate:', birthdate);
    console.log('Sex:', selectedSex);
    console.log('Blood Type:', selectedBloodType);
    // Add logic to handle the scheduled appointment
    addAppointment(selectedDate, selectedTime, `${firstName} ${lastName}`);
  };

  // New variable for user summary
  let userSummary = '';

  let missingInfo = false;

  const validateAndProceed = () => {
    // Check if date and time are selected
    if (!selectedDate || !selectedTime) {
      missingInfo = true;
    } else {
      // Reset the missingInfo flag
      missingInfo = false;
      // Proceed with scheduling logic or show confirmation
      showAppointmentDetails();
    }
  };

  // Function to show appointment details
  const showAppointmentDetails = () => {
    // Check if date and time are selected
    if (!selectedDate || !selectedTime) {
      missingInfo = true;
    } else {
      // Reset the missingInfo flag
      missingInfo = false;
      // Show the appointment details
      showAppointmentSummary();
    }
  };

  // Function to show appointment summary
  const showAppointmentSummary = () => {
    // Build the summary message
    const summaryMessage = `
      Appointment Details:
      Date: ${selectedDate}
      Time: ${selectedTime}
      Hospital: ${selectedHospital}
    `;

    // Display the summary in a div
    appointmentSummary = summaryMessage;
  };

  const showConfirmation = () => {
    if (confirm('Are you sure you want to schedule the appointment?')) {
      // Implement scheduling logic here
      scheduleAppointment();
    }
  };

  const confirmAppointment = () => {
    console.log('Appointment Scheduled!');
    // Add logic to handle the scheduled appointment
    showSummaryPopup();
  };

  const showSummaryPopup = () => {
    // Build the summary message
    const summaryMessage = `
      Appointment Summary:
      Date: ${selectedDate}
      Time: ${selectedTime}
      Hospital: ${selectedHospital}
      First Name: ${firstName}
      Last Name: ${lastName}
      Birthdate: ${birthdate}
      Sex: ${selectedSex}
      Blood Type: ${selectedBloodType}
    `;
    // Display the summary in a popup window
    alert(summaryMessage);
  };

  const showUserSummary = () => {
    // Build the summary message for user information and all scheduled appointments
    const userSummaryMessage = `
      User Information:
      First Name: ${firstName}
      Last Name: ${lastName}
      Birthdate: ${birthdate}
      Sex: ${selectedSex}
      Blood Type: ${selectedBloodType}
      
      Scheduled Appointments:
      ${appointments.subscribe().map(appointment => `Date: ${appointment.date}, Time: ${appointment.time}, Description: ${appointment.description}`).join('\n')}
    `;

    // Display the user information summary in a div
    userSummary = userSummaryMessage;
  };
</script>
  
<style>
  .time-section {
    display: flex;
    flex-direction: column;
  }

  .last-buttons {
    display: flex;
    flex-direction: row;
  }
</style>

<main>
  <h1>Welcome to the Appointment App</h1>
  <hr>
  <div>
    <div>
      <h2>Schedule an Appointment</h2>
      <label for="hospitalDropdown">Select Site:</label>
      <select id="hospitalDropdown" bind:value={selectedHospital} on:change={handleHospitalChange}>
        {#each hospitalList as hospital (hospital)}
          <option value={hospital}>{hospital}</option>
        {/each}
      </select>
      <br>
      <br>
      <div>
        <label for="hospitalAddress">Site Address:</label>
        <input type="text" id="hospitalAddress" bind:value={hospitalAddresses[hospitalList.indexOf(selectedHospital)]} readonly>
      </div>
      <br>
      <div>
        <label for="hospitalContact">Site Details:</label>
        <input type="text" id="hospitalContact" bind:value={hospitalContacts[hospitalList.indexOf(selectedHospital)]} readonly>
        <br>
      </div>
    </div>
    <hr>
    <h2>Choose Appointment Date and Time</h2>
    <div class="date-section">
      <label for="appointmentDate">Select Date:</label>
      <input type="date" id="appointmentDate" bind:value={selectedDate}>
    </div>
    <div class="time-section">
      <br>
      Select Time:
      {#each timeOptions as time (time)}
        <div>
          <input type="radio" id={time} name="appointmentTime" bind:group={selectedTime} value={time}>
          <label for={time}>{time}</label>
        </div>
      {/each}
    </div>

    <!-- New user information section -->
    <div class="user-info-section">
      <div>
        <hr>
        <h2>User Information</h2>
        <form>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" bind:value={firstName}>
          
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" bind:value={lastName}>
        </form>
      </div>
      <div>
        <br>
        <form>
          <label for="birthdate">Birthdate:</label>
          <input type="date" id="birthdate" bind:value={birthdate}>
          <label for="sex">Sex:</label>
          <select id="sex" bind:value={selectedSex}>
            {#each sexOptions as sex (sex)}
              <option value={sex}>{sex}</option>
            {/each}
          </select>
          <label for="bloodType">Blood Type:</label>
          <select id="bloodType" bind:value={selectedBloodType}>
            {#each bloodTypeOptions as bloodType (bloodType)}
              <option value={bloodType}>{bloodType}</option>
            {/each}
          </select>
        </form>
      </div>
      <hr><br>

      <!-- Final buttons -->
      <div class="last-buttons">
        <button on:click={showUserSummary}>Show Appointment Summary</button>
        {#if userSummary}
          <div>
            <br>
            <h3>User Information Summary:</h3>
            <p>{userSummary}</p>
          </div>
        {/if}
      </div>
    </div>
    <br>
    <div class="button-section">
      <button on:click={validateAndProceed}>Schedule Appointment</button>
      {#if missingInfo}
        <p style="color: red;">Please select both date and time before scheduling.</p>
      {/if}
    </div>
  </div>
</main>
