<!-- Create Appointment Schedule (Version 1.0) 2:30AM -->

<script>
    import { writable } from 'svelte/store';
  
    // Define store to hold appointments
    const appointments = writable([]);
    
    // References for form elements
    let dateInput, timeInput, descriptionInput;
    let appointment = '';
  
    // Function to add a new appointment
    const addAppointment = (date, time, description) => {
      const newAppointment = {
        date,
        time,
        description,
      };
  
      appointments.update((prevAppointments) => [...prevAppointments, newAppointment]);
    };
  </script>
  
  
  <style>
    /* Add your styling here */
  </style>
  
  <main>
    <h1>Appointment Scheduler</h1>
  
    <form
        on:submit|preventDefault={function() {
            const date = dateInput.value;
            const time = timeInput.value;
            const description = descriptionInput.value;

            addAppointment(date, time, description);

            // Clear form fields
            dateInput.value = '';
            timeInput.value = '';
            descriptionInput.value = '';
        }}
        >
        <!-- Form content -->
        <label for="date">Date:</label>
        <input type="date" id="date" bind:this={dateInput} required />

        <label for="time">Time:</label>
        <input type="time" id="time" bind:this={timeInput} required />

        <label for="description">Description:</label>
        <textarea id="description" bind:this={descriptionInput} rows="4" required></textarea>

        <button type="submit">Schedule Appointment</button>
    </form>

  
    {#if $appointments.length > 0}
    <section>
      <h2>Appointments:</h2>
      <ul>
        {#each $appointments as { date, time, description } (appointment)}
        <li>
          <strong>Date:</strong> {date}, <strong>Time:</strong> {time}, <strong>Description:</strong> {description}
        </li>
      {/each}
      </ul>
    </section>
    {:else}
        <section>
        <p>No appointments scheduled.</p>
        </section>
    {/if}
  
  </main>
  