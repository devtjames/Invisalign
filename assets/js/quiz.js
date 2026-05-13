document.addEventListener("DOMContentLoaded", () => {
  const quiz = document.querySelector("[data-quiz]");
  if (!quiz) return;

  const steps = [...quiz.querySelectorAll(".quiz-step")];
  const progress = quiz.querySelector("[data-quiz-progress]");
  const result = quiz.querySelector("[data-quiz-result]");
  const next = quiz.querySelector("[data-quiz-next]");
  const prev = quiz.querySelector("[data-quiz-prev]");
  let index = 0;
  const answers = {};

  const show = () => {
    steps.forEach((step, i) => step.classList.toggle("is-active", i === index));
    if (progress) progress.style.width = `${((index + 1) / steps.length) * 100}%`;
    if (prev) prev.disabled = index === 0;
    if (next) next.textContent = index === steps.length - 1 ? "See my result" : "Continue";
  };

  quiz.querySelectorAll("[data-choice]").forEach((choice) => {
    choice.addEventListener("click", () => {
      const step = choice.closest(".quiz-step");
      step?.querySelectorAll("[data-choice]").forEach((node) => node.classList.remove("is-selected"));
      choice.classList.add("is-selected");
      answers[step?.dataset.step || "step"] = choice.dataset.choice;
    });
  });

  next?.addEventListener("click", () => {
    if (index < steps.length - 1) {
      index += 1;
      show();
      return;
    }
    const complexity = [answers.crowding, answers.bite, answers.timeline].filter(Boolean).length;
    const headline = complexity >= 2 ? "You look like a strong Invisalign candidate." : "You may qualify for a light or express plan.";
    result.innerHTML = `
      <div class="rounded-3xl bg-cyan-50 p-5">
        <p class="text-sm font-black uppercase tracking-[0.16em] text-teal-700">Assessment result</p>
        <h3 class="mt-2 text-2xl font-black">${headline}</h3>
        <p class="mt-2 text-slate-600">A clinician can confirm with a scan, photos, and bite evaluation. Your next best step is a no-pressure consult with a digital preview.</p>
        <a class="btn btn-primary mt-5" href="book-consultation.html">Book my scan</a>
      </div>`;
  });

  prev?.addEventListener("click", () => {
    index = Math.max(0, index - 1);
    show();
  });

  show();
});
