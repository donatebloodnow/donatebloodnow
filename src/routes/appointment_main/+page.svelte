<script>
  import { goto } from '$app/navigation';
</script>

<style>
  /* Your existing styles */

  main {
    text-align: center;
    margin-top: 50px;
  }

  h1 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bold;
    font-size: 2em;
    margin-bottom: 20px;
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  a {
    text-decoration: none;
  }

  .custom-button {
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

  .custom-button:hover {
    background-color: #c82333;
  }
</style>

<html lang=en>
  <body>
    <header class="vw-100">
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-danger w-100">
        <div class="container-fluid">
          <a class="navbar-brand" href="/" on:click={() => goto('/')}>
            B.D.M.S <i class="fa-solid fa-droplet"></i>
          </a>
  
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mb-2 mb-md-0">
              <li class="nav-item active">
                <a class="nav-link" href="/" on:click={() => goto('/')}>
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/news" on:click={() => goto('/news')}>
                  News
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/newsletter" on:click={() => goto('/newsletter')}>
                  Newsletter
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/blood-bank-locator" on:click={() => goto('/blood-bank-locator')}>
                  Blood Bank Locator
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/appointment_main" on:click={() => goto('/appointment_main')}>
                  Appointment Scheduler
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!-- end of HEADER -->

    <!-- start of MAIN -->
    <main>
      <h1>Welcome to the Blood Donation Appointment App</h1>
      <div class="button-container">
        <a href="/appointment_main/schedule-appointment">
          <button class="custom-button">Create New Appointment</button>
        </a>
        <a href="/appointment_main/manage-appointment">
          <button class="custom-button">Update Existing Appointment</button>
        </a>
      </div>
      <br>
    </main>

    <!-- start of FOOTER -->
    <footer class="bg-danger text-light py-4">
      For Capstone Use Only.
    </footer>
    <!-- end of FOOTER -->
    
  </body>
</html>
