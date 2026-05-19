document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-item");
  timelineItems.forEach((item) => {
    item.addEventListener("click", () => {
      const content = item.querySelector(".timeline-description");
      content.classList.toggle("active");
    });
  });
});
