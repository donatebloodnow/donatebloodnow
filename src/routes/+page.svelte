<script>
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css";
  import { onMount } from "svelte";
  import { webMap } from "./script.js";
  import { createClient } from "contentful";
  import { scrollTo } from "$lib/smoothPan.js";
  import Saos from 'saos';
  import Moment from 'moment';

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
      <nav
        class="navbar navbar-expand-md navbar-dark fixed-top bg-danger w-100"
      >
        <div class="container-fluid">
          <a
            class="navbar-brand"
            href="#home"
            on:click={(e) => smoothScroll("#home", e)}
            style="font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;font-weight: bold;"
            >B.D.M.S <i class="fa-solid fa-droplet"></i></a
          >

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
                <a
                  class="nav-link nav-hover text-light"
                  href="#home"
                  on:click={(e) => smoothScroll("#home", e)}>Home</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link nav-hover text-light"
                  href="#news-panel"
                  on:click={(e) => smoothScroll("#news-panel", e)}>News</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link nav-hover text-light" href="./newsletter"
                  >Newsletter</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link nav-hover text-light"
                  href="#bank-locator"
                  on:click={(e) => smoothScroll("#bank-locator", e)}
                  >Blood Bank Locator</a
                >
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
