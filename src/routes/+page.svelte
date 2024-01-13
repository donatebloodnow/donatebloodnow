<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
  import { onMount } from "svelte";
  import { webMap } from "./script.js";
  import { createClient } from "contentful";
  import { scrollTo } from "$lib/smoothPan.js";
  import Saos from 'saos';
  import Moment from 'moment';
  import supabase from "$lib/supabaseClient.js";

  //Styling Rizz
  const smoothScroll = (target, event) => {
    event.preventDefault();
    scrollTo(target);
  };

  //Main Functions
  const contentfulClient = createClient({
    space: "g4027mkrwnn3",
    accessToken: "1LemAsBMnTt5PAJtk846SrUCQScy-w-eynZKx5_WpuA",
  });

  let entries = [];

  onMount(() => {
    webMap();
  });

  onMount(async () => {
    try {
      const response = await contentfulClient.getEntries({
        order: "-sys.createdAt",
        limit: 3,
      });
      entries = response.items;
    } catch (error) {
      console.error("Error fetching content from Contentful:", error);
    }
  });

  function handleClick(link) {
    window.open(link, "_blank");
  }

  //appointment thingy
  
  let showAppointmentScheduler = false;

  onMount(() => {
    // You can add logic here to determine when to show the appointment scheduler
  });

  const toggleAppointmentScheduler = () => {
    showAppointmentScheduler = !showAppointmentScheduler;
  };

    // New appointment section variables
    let selectedHospital = ''; // Selected hospital from the dropdown
  let hospitalList = ['Sample Hospital 1', 'Sample Hospital 2', 'Sample Hospital 3']; // Sample hospital list
  let hospitalAddresses = [
    '123 Main St, Cityville, Country',
    '456 Oak Ave, Townsville, Country',
    '789 Pine Blvd, Villagetown, Country'
  ]; // Sample hospital addresses
  let hospitalContacts = ['123-456-7890', '234-567-8901', '345-678-9012']; // Sample hospital contact numbers

  const handleHospitalChange = (event) => {
    selectedHospital = event.target.value;
  };

  const displayHospitalInfo = () => {
    const selectedIndex = hospitalList.indexOf(selectedHospital);
    if (selectedIndex !== -1) {
      const hospitalAddress = hospitalAddresses[selectedIndex];
      const hospitalContact = hospitalContacts[selectedIndex];
      // Display the information in the read-only text boxes
      // You can use these values wherever needed in your UI
      console.log('Hospital Address:', hospitalAddress);
      console.log('Hospital Contact:', hospitalContact);
    }
  };

  //Sort Filter
  let sortColumn = "";
  let sortDirection = 1; // 1 for ascending, -1 for descending

  const sortTable = (column) => {
    if (column === sortColumn) {
      // Reverse the sort direction if the same column is clicked
      sortDirection = -sortDirection;
    } else {
      // Set the new sort column and reset the direction
      sortColumn = column;
      sortDirection = 1;
    }

    data = data.slice().sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection * valueA.localeCompare(valueB);
      } else {
        return sortDirection * (valueA - valueB);
      }
    });
  };


  //Donor History
  let data = [];
  let notification = null;
  let originalData = [];
  let searchTerm = '';

  onMount(async () => {
    const { data: records, error } = await supabase
      .from("donors_table")
      .select("*")

    if (error) {
      console.error("Error fetching data from Supabase:", error);
    } else {
      // data = records;
      originalData = records;
    }
  });

  const search = () => {
    if (searchTerm.trim() === '') {
      data = [];
      return;
    }

    const filteredData = originalData.filter(item => {
      return (
        item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchTerm.toLowerCase())
        // Add more fields as needed for your search
      );
    });

    data = filteredData;
  };

  $: search();

  let firstName = "", lastName = "", donorBirth = "", donorSex = "", donorBlood = "", donorStatus = "", donorEmail = "", donorType = "", donorVolume = "", donorNum = "", donorPulse = "", donorBP = "", donationEvent = "";

  const handleSubmit = async () => {
  // Validate the form data (replace this with your validation logic)
  if (!firstName || !lastName || !donorBirth || !donorSex || !donorBlood || !donorStatus || !donorEmail || !donorType || !donorVolume || !donorNum || !donorPulse || !donorBP) {
    setNotification({ type: "error", message: "Please fill in all fields." });
    return;
  }

  const formattedContactNum = `+63${donorNum}`;

  try {
    // Submit the form data to Supabase
    const { data, error } = await supabase.from("donors_table").upsert([
      {
        first_name: firstName,
        last_name: lastName,
        birthdate: donorBirth,
        sex: donorSex,
        blood_type: donorBlood,
        civil_status: donorStatus,
        contact_num: formattedContactNum,
        blood_pressure: donorBP,
        email:donorEmail,
        donation_type: donorType,
        donation_volume: donorVolume,
        donor_pulse: donorPulse,
        donation_event: donationEvent,
        donation_date: new Date(),
      },
    ]);
    console.log("info:", firstName, lastName, donorBP, donorBirth, donorBlood, donorEmail, donorNum, donorPulse, donorSex, donorStatus, donorType, donorVolume);

    if (error) {
      console.error("Error submitting data:", error);
      setNotification({ type: "error", message: "Error submitting data." });
    } else {
      console.log("Data submitted successfully:", data);
      setNotification({ type: "success", message: "Entry submitted successfully." });

      // Optionally, you can reload the page or fetch updated data here
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  } catch (error) {
    console.error("Error submitting data:", error);
    setNotification({ type: "error", message: "Error submitting data." });
  }
};
</script>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <meta
      name="author"
      content="Mark Otto, Jacob Thornton, and Bootstrap contributors"
    />
    <meta name="generator" content="Hugo 0.72.0" />
    <title>B.B.M.S</title>

    <link rel="stylesheet" href="/src/lib/style.css" />
    <link
      rel="canonical"
      href="https://v5.getbootstrap.com/docs/5.0/examples/carousel/"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <!--Google Maps API-->
    <!--Google Maps API-->
    <script
      src="https://cdn.rawgit.com/googlemaps/v3-utility-library/master/markerwithlabel/src/markerwithlabel.js"
    ></script>

    <!-- API KEY -->
    <!-- API KEY -->
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9hnYtw84Sg78NaJjVw8qv0gkA2-IriC8&callback=initMap"
      defer
    ></script>

    <!-- Bootstrap core CSS -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
      integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
      crossorigin="anonymous"
    />

    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
      integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
      crossorigin="anonymous"
    ></script>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    ></script>

    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"
    ></script>

<style>
  Body {
    overflow-x: hidden;
    }

  #socmed:hover{
    transform:scale(1.5);
    }

  main {
    animation: fadeIn 0.5s;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        filter: blur(5px);
        transform: translateX(-5px);
      }
      to {
        opacity: 1;
        filter: blur(0);
        transform: translateX(0);
      }
    }

  .nav-hover {
    display: inline-block;
    padding-bottom: 2px;
    background-image: linear-gradient(#ffffff 0 0);
    background-position: 0 100%; /*OR bottom left*/
    background-size: 0% 2px;
    background-repeat: no-repeat;
    transition:
      background-size 0.3s,
      background-position 0s 0.3s; /*change after the size immediately*/
    }

  .nav-hover:hover {
      background-position: 100% 100%; /*OR bottom right*/
      background-size: 100% 2px;
    }

  .splide-container {
    top: 20px; /* Set a fixed height for the slider */
  }

  .splide__slide {
    position: relative;
  }

  .splide__slide img {
    object-fit: cover; /* Preserve aspect ratio and cover the entire slide */
    width: 100%;
    height: 100%;
  }
  .color-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 0, 0.5); /* Adjust the color and opacity as needed */
  }

  .modalSplide {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    transform: translate(-50%, -50%);
    color: white;
    text-align: justify;
    padding: 20px;
  }

  /*Animations*/
  
  /*Tilt-Forward*/
  @keyframes tilt-in-fwd-tr {
  0% {
    transform: rotateY(20deg) rotateX(35deg) translate(300px, -300px) skew(-35deg, 10deg);
    opacity: 0;
  }
  100% {
    transform: rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg);
    opacity: 1;
  }
  }

  /*Roll-In-Blurred-Left*/
  @keyframes roll-in-blurred-left {
  0% {
    transform: translateX(-1000px) rotate(-720deg);
    filter: blur(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0) rotate(0deg);
    filter: blur(0);
    opacity: 1;
  }
  }

  /*Bounce-In-Top*/
  @keyframes bounce-in-top {
  0% {
    transform: translateY(-500px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateY(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateY(-65px);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateY(-28px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(-8px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  }
</style>
  
</head>
  <body class="bg-light">
    <header class="vw-100">
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-danger w-100">
        <div class="container-fluid">
          <a class="navbar-brand" href="#home" on:click={(e) => smoothScroll("#home", e)}>
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
                <a class="nav-link nav-hover text-light" href="#home" on:click={(e) => smoothScroll("#home", e)}>
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link nav-hover text-light" href="#news-panel" on:click={(e) => smoothScroll("#news-panel", e)}>
                  News
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link nav-hover text-light" href="./newsletter">
                  Newsletter
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link nav-hover text-light" href="#bank-locator" on:click={(e) => smoothScroll("#bank-locator", e)}>
                  Blood Bank Locator
                </a>
              </li>
              <!-- Add a new page link for the appointment scheduler -->
              <li class="nav-item">
                <a class="nav-link nav-hover text-light" href="./appointment_main">
                  Appointment Scheduler
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <main id="home">
      <!-- /START THE CAROUSEL|MAIN INFO -->
      <Splide
        aria-label="HomeCarousel"
        options={{ rewind: true, type: "loop", autoplay: "play" }}
      >
        <SplideSlide>
          <img style="width: 100%;" src="/src/lib/1.png" alt="" />
        </SplideSlide>
        <SplideSlide>
          <img style="width: 100%;" src="/src/lib/2.png" alt="" />
        </SplideSlide>
        <SplideSlide>
          <img style="width: 100%;" src="/src/lib/3.png" alt="" />
        </SplideSlide>
      </Splide>
      <!-- /END THE CAROUSEL|MAIN INFO -->

      <!--BDMS TITLE-->

      <div class="startup" id="news-panel">
        <h1
          class="text-center"
          style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;font-weight: bold;"
        >
          Blood Bank Management System
        </h1>
      </div>

      <!-- /START THE FEATURETTES|NEWS -->

      <div class="container marketing">
        <hr class="featurette-divider" />
          {#each entries as entry, index (entry.sys.id)}
          <div class="row featurette hidden">
            {#if index % 2 === 0}
              <div class="col-md-7">
                <Saos once={true} animation={'bounce-in-top 1.1s both'}>
                <!-- Content for even-indexed entries (image on the right) -->
                <h2 class="featurette-heading">{entry.fields.text}</h2>
                <p class="text-secondary">Published on: {Moment(entry.fields.postData).format("LL")}</p>
                <div style="white-space: pre-line;">
                  {entry.fields.dialogue}
                </div>
                <button
                  class="btn btn-danger my-2"
                  on:click={() => handleClick(entry.fields.link)}
                  target="_blank">Learn more.</button
                >
                </Saos>
              </div>
              <div class="col-md-5">
                <Saos once={true} animation={'tilt-in-fwd-tr .6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.2s both'}>
                  <img
                  class="featurette-image mx-auto"
                  width="500"
                  height="500"
                  src={entry.fields.photo.fields.file.url}
                  style="object-fit: cover;"
                  alt={entry.fields.title}
                />
                </Saos>
                
              </div>
            {:else}
              <div class="col-md-5 order-md-2">
                <Saos once={true} animation={'bounce-in-top 1.1s both'}>
                <!-- Content for odd-indexed entries (image on the left) -->
                <h2 class="featurette-heading">{entry.fields.text}</h2>
                <p class="text-secondary fw-light">Published on: {Moment(entry.fields.postData).format("LL")}</p>
                <p>{entry.fields.dialogue}</p>
                <button
                  class="btn btn-danger my-2"
                  on:click={() => handleClick(entry.fields.link)}
                  target="_blank">Learn more.</button>
                </Saos>
              </div>
              <div class="col-md-7 order-md-1">
                <Saos once={true} animation={'tilt-in-fwd-tr .6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.2s both'}>
                <img
                  class="featurette-image mx-auto"
                  width="500"
                  height="500"
                  src={entry.fields.photo.fields.file.url}
                  style="object-fit: cover;"
                  alt={entry.fields.title}
                />
                </Saos>
              </div>
            {/if}
          </div>
          <hr class="featurette-divider" />
        {/each}
      </div>
      <!-- /START THE BLOOD BANK LOCATOR -->
      
      <div class="container marketing hidden" id="bank-locator">
        <div id="bloodbank-locator">
          <div id="bloodbank-list">
            <h2>Blood Banks Near You</h2>
            <ul id="bloodbank-list-items">
              <!-- Blood bank list items will be populated dynamically -->
            </ul>
          </div>
          <div id="map-container">
            <div id="map"></div>
          </div>
        </div>
        <!-- /END THE BLOOD BANK LOCATOR -->
      </div>

      <!--Donor History-->
      <div class="container marketing hidden" id="donor-history">
        <div class="card mb-3 mx-5" id="blood-inventory">
          <div class="card-header text-light bg-danger">
            <i class="fa fa-droplet" /> Donation History
          </div>
          <div class="card-body">
            <div>
              <input type="text" class="rounded bg-light mb-2" bind:value={searchTerm} on:input={search} placeholder="Search..." />
            </div>
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr class="clearfix">
                    <th on:click={() => sortTable('last_name')}>
                      Donor Name
                      {sortColumn === 'last_name' ? (sortDirection === 1 ? ' ▲' : ' ▼') : ''}
                    </th>
                    <th on:click={() => sortTable('email')}>
                      Email
                      {sortColumn === 'email' ? (sortDirection === 1 ? ' ▲' : ' ▼') : ''}
                    </th>
                    <th on:click={() => sortTable('donation_date')}>
                      Donation Date
                      {sortColumn === 'donation_date' ? (sortDirection === 1 ? ' ▲' : ' ▼') : ''}
                    </th>
                    <th on:click={() => sortTable('donation_event')}>
                      Location
                      {sortColumn === 'donation_event' ? (sortDirection === 1 ? ' ▲' : ' ▼') : ''}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {#each data as item (item.id)}
                  <tr>
                    <td>{item.first_name} {item.last_name}</td>
                    <td>{item.email}</td>
                    <td>{Moment(item.donation_date).format("L")}</td>
                    <td>{item.donation_event}</td>
                  </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="bg-danger text-light py-4">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h2 style="font-weight:900;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-style:italic">Donate Now</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloribus repellendus hic. Aut neque error maxime laborum voluptate sed, cum eum non. Ipsum dolor placeat autem quia doloribus illo consectetur.</p>
          </div>
          <div class="col-md-3">
            <h5>Contact Us</h5>
            <p>Email: info@bloodbank.com</p>
            <p>Phone: 845-4064</p>
            <p>Address: 123 Blood Donation Street, Cityville</p>
          </div>
          <div class="col-md-3">
            <h5>Follow Us</h5>
            <ul class="list-inline">
              <li id="socmed" class="list-inline-item"><a href="https://www.facebook.com" class="text-light" target="_blank"><i class="fa-brands fa-facebook" style="font-size: 40px;"></i></a></li>
              <li id="socmed" class="list-inline-item"><a href="https://www.x.com" class="text-light fs-2" target="_blank"><i class="fa-brands fa-twitter" style="font-size: 40px;"></i></a></li>
              <li id="socmed" class="list-inline-item"><a href="https://www.instagram.com" class="text-light" target="_blank"><i class="fa-brands fa-instagram" style="font-size: 40px;"></i></a></li>
            </ul>
          </div>
        </div>
        <hr class="my-4">
        <p class="text-center">&copy; 2023 For Capstone Use Only.</p>
      </div>
    </footer>
    <!-- END FOOTER -->
  </body>
</html>
