<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Layout</title>
  <!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
    integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous" />
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
    integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"></script>
  <style>
    body,
    html {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
    }

    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000; /* Ensure it's above other content */
    }

    .navbar {
      z-index: 1001; /* Ensure the navbar is above other content */
    }

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  </style>
</head>

<body>
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

  <iframe title="newsletter" src="https://mailchi.mp/c82d8b251039/signup-form" frameborder="0" allowfullscreen></iframe>

</body>