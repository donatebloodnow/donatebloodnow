export function scrollTo(target) {
  const element = document.querySelector(target);

  if (element) {
    // Adjust the offset based on the height of your sticky header
    const offset = 80; // Adjust this value based on the height of your sticky header
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;

    // Add a delay for the smooth transition
    setTimeout(() => {
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }, 100); // Adjust the delay based on your needs
  }
}