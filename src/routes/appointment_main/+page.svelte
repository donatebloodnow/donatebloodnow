<script>
  import { goto } from '$app/navigation';

  const handleScheduleClick = () => {
    goto('/schedule-appointment');
  };

  const handleManageClick = () => {
    goto('/manage-appointment');
  };
</script>

<main>
  <h1>Welcome to the Blood Donation Appointment App</h1>
  <div>
    <a href="/appointment_main/schedule-appointment">
      <button>Create New Appointment</button>
    </a>
    <a href="/appointment_main/manage-appointment">
      <button>Update Existing Appointment</button>
    </a>
  </div>
</main>


<style>
  main {
    text-align: center;
    margin-top: 50px;
  }

  button {
    margin: 10px;
    padding: 10px;
    font-size: 16px;
  }
</style>
