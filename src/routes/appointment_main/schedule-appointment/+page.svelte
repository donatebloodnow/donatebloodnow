<!-- Create Appointment Schedule (Version 1.1) 3:45PM -->

<script>
  import { writable } from "svelte/store";

  // Define store to hold appointments
  const appointments = writable([]);

  // Define time options
  let timeOptions = [
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
  ]; // Sample time options

  // Filter time options based on the current time
  const today = new Date();
  const currentTime = today.getHours(); // Get the current hour

  timeOptions = timeOptions.filter((timeSlot) => {
    const timeSlotStart = parseInt(timeSlot.split(":")[0]);
    return timeSlotStart > currentTime;
  });

  // Function to add a new appointment
  const addAppointment = (date, time, description) => {
    const newAppointment = { date, time, description };
    appointments.update((prevAppointments) => [
      ...prevAppointments,
      newAppointment,
    ]);
  };

  // Handle hospital selection change
  let selectedHospital = "";
  let hospitalList = [
    "Sample Hospital 1",
    "Sample Hospital 2",
    "Sample Hospital 3",
  ];
  let hospitalAddresses = [
    "123 Main St, Cityville, Country",
    "456 Oak Ave, Townsville, Country",
    "789 Pine Blvd, Villagetown, Country",
  ];
  let hospitalContacts = ["123-456-7890", "234-567-8901", "345-678-9012"];

  const handleHospitalChange = (event) => {
    selectedHospital = event.target.value;
  };

  // New appointment section variables
  const formattedToday = today.toISOString().split("T")[0]; // Format today's date as YYYY-MM-DD
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Calculate last day of the current month
  const lastDayOfMonthDate = lastDayOfMonth.getDate(); // Get the day component of the last day
  const formattedLastDayOfMonth =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    lastDayOfMonthDate; // Format last day of the month as YYYY-MM-DD

  let selectedDate = formattedToday; // Set initial value to today
  let selectedTime = ""; // Selected appointment time

  // New user information section variables
  let firstName = "";
  let lastName = "";
  let email = "";
  let mobile = "";

  // Schedule appointment logic
  const scheduleAppointment = () => {
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    console.log("User Information:");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    // Add logic to handle the scheduled appointment
    addAppointment(selectedDate, selectedTime, `${firstName} ${lastName}`);
  };

  // New variable for user summary
  let userSummary = "";

  // Validation and scheduling logic
  let missingInfo = {
    site: false,
    date: false,
    time: false,
    firstName: false,
    lastName: false,
  };

  const validateAndProceed = () => {
    // Check if site, date, time, first name, and last name are selected
    if (!selectedHospital) {
      missingInfo.site = true;
    } else {
      missingInfo.site = false;
    }

    if (!selectedDate) {
      missingInfo.date = true;
    } else {
      missingInfo.date = false;
    }

    if (!selectedTime) {
      missingInfo.time = true;
    } else {
      missingInfo.time = false;
    }

    if (!firstName) {
      missingInfo.firstName = true;
    } else {
      missingInfo.firstName = false;
    }

    if (!lastName) {
      missingInfo.lastName = true;
    } else {
      missingInfo.lastName = false;
    }

    // Check if any field is missing
    if (
      missingInfo.site ||
      missingInfo.date ||
      missingInfo.time ||
      missingInfo.firstName ||
      missingInfo.lastName
    ) {
      // Missing information, do not proceed
    } else {
      // Proceed with scheduling logic or show confirmation
      showAppointmentDetails();
    }
  };

  // Function to show appointment details
  const showAppointmentDetails = () => {
    // Check if date and time are selected
    if (
      !selectedDate ||
      !selectedTime ||
      !firstName ||
      !lastName ||
      !email ||
      !mobile
    ) {
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

  // Confirmation and scheduling functions
  const showConfirmation = () => {
    if (confirm("Are you sure you want to schedule the appointment?")) {
      // Implement scheduling logic here
      scheduleAppointment();
    }
  };

  const confirmAppointment = () => {
    console.log("Appointment Scheduled!");
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
    `;
    // Display the summary in a popup window
    alert(summaryMessage);
  };

  // Display user summary
  const showUserSummary = () => {
    // Build the summary message for user information and all scheduled appointments
    const userSummaryMessage = `
      User Information:
      First Name: ${firstName}
      Last Name: ${lastName}
      
      Scheduled Appointments:
      ${appointments
        .subscribe()
        .map(
          (appointment) =>
            `Date: ${appointment.date}, Time: ${appointment.time}, Description: ${appointment.description}`
        )
        .join("\n")}
    `;

    // Display the user information summary in a div
    userSummary = userSummaryMessage;
  };
</script>

<main>
  <h1>Welcome to the Appointment App</h1>
  <hr />
  <div>
    <!-- Card body for Site Selection -->
    <h2>Site Selection</h2>
    <div class="card">
      <label for="hospitalDropdown">Select Site:</label>
      <select
        id="hospitalDropdown"
        bind:value={selectedHospital}
        on:change={handleHospitalChange}
      >
        {#each hospitalList as hospital (hospital)}
          <option value={hospital}>{hospital}</option>
        {/each}
      </select>
      <br />
      <br />
      <div>
        <label for="hospitalAddress">Site Address:</label>
        <input
          type="text"
          id="hospitalAddress"
          bind:value={hospitalAddresses[hospitalList.indexOf(selectedHospital)]}
          readonly
        />
      </div>
      <br />
      <div>
        <label for="hospitalContact">Site Details:</label>
        <input
          type="text"
          id="hospitalContact"
          bind:value={hospitalContacts[hospitalList.indexOf(selectedHospital)]}
          readonly
        />
        <br />
      </div>
    </div>
    <hr />

    <!-- start of DATE AND TIME -->
    <h2>Choose Appointment Date and Time</h2>

    <div class="card">
      <div class="date-time-section">
        <div class="date-section">
          <label for="appointmentDate">Select Date:</label>
          <input
            type="date"
            id="appointmentDate"
            bind:value={selectedDate}
            min={formattedToday}
            max={formattedLastDayOfMonth}
          />
        </div>
        <div class="time-section">
          <br />
          Select Time:
          {#each timeOptions as time (time)}
            <div>
              <input
                type="radio"
                id={time}
                name="appointmentTime"
                bind:group={selectedTime}
                value={time}
              />
              <label for={time}>{time}</label>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <hr />
    <!-- end of DATE AND TIME -->

    <h2>Enter Your Information</h2>
    <!-- Card body for user information -->
    <div class="card">
      <div class="user-info-section">
        <!-- column 1 -->
        <div class="user-info-column">
          <form>
            <label for="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              bind:value={firstName}
              class:missing={missingInfo && !firstName}
            />
          </form>
        </div>

        <!-- column 2 -->
        <div class="user-info-column">
          <form>
            <label for="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              bind:value={lastName}
              class:missing={missingInfo && !lastName}
            />
          </form>
        </div>
      </div>
      <br />

      <form>
        <label for="email">Email:</label>
        <input
          type="text"
          id="email"
          bind:value={email}
          placeholder="Enter your email"
          class:missing={missingInfo && !email}
        />
      </form>
      <form>
        <label for="mobile">Mobile:</label>
        <input
          type="text"
          id="mobile"
          bind:value={mobile}
          placeholder="Enter your contact number"
          class:missing={missingInfo && !mobile}
        />
      </form>
    </div>
    <!-- Final buttons -->
    <div class="button-section">
      <button on:click={showUserSummary}>Show Appointment Summary</button>
      <button on:click={validateAndProceed}>Schedule Appointment</button>
      {#if missingInfo.site || missingInfo.date || missingInfo.time || missingInfo.firstName || missingInfo.lastName}
        <p style="color: red;">Fill out all fields before scheduling.</p>
      {/if}
    </div>
  </div>
</main>

<style>
  .time-section {
    display: flex;
    flex-direction: column;
  }

  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    margin-top: 50px;
  }

  h1 {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    font-size: 2em;
    margin-bottom: 20px;
  }

  hr {
    border: 0;
    height: 1px;
    background: #ccc;
    margin: 20px 0;
  }

  label {
    font-weight: bold;
  }

  select,
  input[type="date"],
  input[type="text"],
  input[type="radio"],
  select {
    margin: 5px 0;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  .date-time-section {
    display: flex;
    justify-content: space-between;
  }

  .time-section,
  .date-section {
    width: 48%; /* Adjust as needed */
  }

  .time-section {
    margin-left: 4%; /* Adjust as needed */
  }

  .card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    margin: 10px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .user-info-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .user-info-column {
    width: 48%; /* Adjust as needed */
  }

  .button-section {
    margin-top: 20px;
  }

  button {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 15px 30px;
    margin: 10px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #c82333;
  }

  p {
    margin: 10px 0;
  }

  .missing {
    border: 1px solid red;
  }
</style>
