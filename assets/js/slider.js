document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-before-after]").forEach((slider) => {
    const after = slider.querySelector(".ba-after");
    const input = slider.querySelector("input[type='range']");
    const set = () => {
      if (after && input) after.style.width = `${input.value}%`;
    };
    input?.addEventListener("input", set);
    set();
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((node) => {
        node.classList.remove("btn-primary");
        node.classList.add("btn-secondary");
      });
      button.classList.remove("btn-secondary");
      button.classList.add("btn-primary");
      document.querySelectorAll("[data-case]").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.case !== filter;
      });
    });
  });

  const carousel = document.querySelector("[data-testimonial-carousel]");
  if (carousel) {
    const cards = [...carousel.querySelectorAll("[data-slide]")];
    let index = 0;
    const show = () => cards.forEach((card, i) => card.hidden = i !== index);
    carousel.querySelector("[data-next]")?.addEventListener("click", () => {
      index = (index + 1) % cards.length;
      show();
    });
    carousel.querySelector("[data-prev]")?.addEventListener("click", () => {
      index = (index - 1 + cards.length) % cards.length;
      show();
    });
    show();
  }
});
