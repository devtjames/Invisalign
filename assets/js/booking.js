document.addEventListener("DOMContentLoaded", () => {
  const booking = document.querySelector("[data-booking]");
  if (!booking) return;

  const summary = booking.querySelector("[data-booking-summary]");
  const dentist = booking.querySelector("[data-dentist]");
  const date = booking.querySelector("[data-date]");
  const type = booking.querySelector("[data-visit-type]");
  let selectedSlot = "9:00 AM";

  const update = () => {
    if (!summary) return;
    summary.innerHTML = `
      <p class="text-sm font-black uppercase tracking-[0.16em] text-teal-700">Consultation summary</p>
      <h3 class="mt-2 text-2xl font-black">${type?.value || "In-studio scan"}</h3>
      <p class="mt-2 text-slate-600">${date?.value || "Select a date"} at ${selectedSlot} with ${dentist?.value || "Dr. Elena Park"}.</p>
      <p class="mt-3 text-sm font-bold text-slate-500">Refundable deposit: $49, credited toward treatment.</p>`;
  };

  booking.querySelectorAll("[data-slot]").forEach((slot) => {
    slot.addEventListener("click", () => {
      booking.querySelectorAll("[data-slot]").forEach((node) => node.classList.remove("is-selected"));
      slot.classList.add("is-selected");
      selectedSlot = slot.dataset.slot || slot.textContent.trim();
      update();
    });
  });

  [dentist, date, type].forEach((input) => input?.addEventListener("change", update));
  update();
});
