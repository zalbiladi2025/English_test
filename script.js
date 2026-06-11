const grammarQuestions = [
  { q: "I'll call you when I ________.", options: ["arrive", "arrived"], answer: "arrive" },
  { q: "The noise was so loud ________ we could hardly hear ourselves talk.", options: ["that", "than"], answer: "that" },
  { q: "There ________ a phone message for you.", options: ["is", "are"], answer: "is" },
  { q: "There are lots of unanswered ________ in my inbox.", options: ["emails", "email"], answer: "emails" },
  { q: "The plural of city is ________.", options: ["cities", "citys"], answer: "cities" },
  { q: "The plural of company is ________.", options: ["companies", "companys"], answer: "companies" },
  { q: "The plural of leaf is ________.", options: ["leaves", "leafs"], answer: "leaves" },
  { q: "The plural of child is ________.", options: ["children", "childs"], answer: "children" },
  { q: "There isn't ________ pollution.", options: ["any", "some"], answer: "any" },
  { q: "The windows were ________.", options: ["broken", "broke"], answer: "broken" },
  { q: "The vase was ________.", options: ["cracked", "crack"], answer: "cracked" },
  { q: "The car was ________.", options: ["damaged", "damage"], answer: "damaged" },
  { q: "The shirt was ________.", options: ["torn", "tear"], answer: "torn" },
  { q: "Turn ________ your cell phone.", options: ["off", "on"], answer: "off" },
  { q: "Put your clothes ________.", options: ["away", "off"], answer: "away" },
  { q: "When we arrived at the airport, our flight had already ________.", options: ["left", "leave"], answer: "left" },
  { q: "They couldn't get in because they had ________ the key.", options: ["forgotten", "forgot"], answer: "forgotten" },
  { q: "If you don't leave now, you ________ be late.", options: ["will", "would"], answer: "will" },
  { q: "I should have ________ I was sorry.", options: ["said", "say"], answer: "said" },
  { q: "You shouldn't have ________ that.", options: ["done", "do"], answer: "done" },
  { q: "If I had studied harder, I would have ________ the exam.", options: ["passed", "pass"], answer: "passed" },
  { q: "If I hadn't found my book, I would have ________ in trouble.", options: ["been", "be"], answer: "been" },
  { q: "We moved to Muscat three years ________.", options: ["ago", "since"], answer: "ago" },
  { q: "He has worked as a scientist ________ many years.", options: ["for", "since"], answer: "for" },
  { q: "We have lived in Muscat ________ May.", options: ["since", "for"], answer: "since" },
  { q: "We haven't used our car for a long ________.", options: ["time", "times"], answer: "time" },
  { q: "Can the robot do my homework? No, it ________.", options: ["can't", "couldn't"], answer: "can't" },
  { q: "Could people travel long distances before airplanes? Yes, they ________.", options: ["could", "can"], answer: "could" },
  { q: "________ I leave early today?", options: ["May", "Did"], answer: "May" },
  { q: "Could you ________ in this form, please?", options: ["fill", "filled"], answer: "fill" },
  { q: "Can you ________ me?", options: ["help", "helped"], answer: "help" },
  { q: "I ________ talking to Mary.", options: ["am", "was"], answer: "am" },
  { q: "I ________ English in Canada.", options: ["learned", "learn"], answer: "learned" },
  { q: "I haven't seen the film ________.", options: ["yet", "already"], answer: "yet" },
  { q: "He said that he ________ a brother and a sister.", options: ["had", "has"], answer: "had" },
  { q: "She said she ________ talking to Mary.", options: ["was", "is"], answer: "was" },
  { q: "He said he had ________ English in Canada.", options: ["learned", "learn"], answer: "learned" },
  { q: "She said she hadn't seen the film ________.", options: ["yet", "still"], answer: "yet" },
  { q: "He said he ________ come to the meeting.", options: ["couldn't", "can't"], answer: "couldn't" },
  { q: "She said she ________ to go to the doctor.", options: ["had", "has"], answer: "had" },
  { q: "He asked how old I ________.", options: ["was", "am"], answer: "was" },
  { q: "She wanted to know where we had been the night ________.", options: ["before", "after"], answer: "before" },
  { q: "He asked ________ Tom was a student.", options: ["if", "that"], answer: "if" },
  { q: "She asked ________ they had enjoyed the dinner party.", options: ["if", "where"], answer: "if" },
  { q: "That's the school ________ I attended as a child.", options: ["where", "who"], answer: "where" },
  { q: "Dubai is the place ________ I want to go on vacation.", options: ["where", "which"], answer: "where" },
  { q: "That's the place ________ I grew up.", options: ["where", "when"], answer: "where" },
  { q: "Home is ________ the heart is.", options: ["where", "what"], answer: "where" }
];

const wordBank = [
  "Upgrade", "Dynamic", "Urban", "Proof", "Candidate", "Scan", "Bother",
  "dripping faucet", "leaky pipe", "loose floorboards", "broken windowpane",
  "stain", "hole", "missing button", "torn", "dead battery", "worn tire", "dent"
];

const vocabularyQuestions = [
  { q: "A ________ is evidence that something is true.", answer: "Proof" },
  { q: "A ________ is a person trying to be elected.", answer: "Candidate" },
  { q: "To ________ means to get an image using a computer.", answer: "Scan" },
  { q: "To ________ means to make the effort.", answer: "Bother" },
  { q: "________ means replaced by newer or better equipment.", answer: "Upgrade" },
  { q: "________ means always active and changing.", answer: "Dynamic" },
  { q: "________ relates to cities or towns.", answer: "Urban" },
  { q: "There is a water mark on my shirt. It is a ________.", answer: "stain" },
  { q: "My sock has a ________ in it.", answer: "hole" },
  { q: "My shirt is ________ and needs sewing.", answer: "torn" },
  { q: "My car won't start because of a ________.", answer: "dead battery" },
  { q: "The plumber fixed the ________ under the sink.", answer: "leaky pipe" },
  { q: "The kitchen sink has a ________.", answer: "dripping faucet" },
  { q: "The old house has ________ that make noise.", answer: "loose floorboards" },
  { q: "The storm broke the ________.", answer: "broken windowpane" },
  { q: "My coat has a ________ and I need to sew it on.", answer: "missing button" },
  { q: "The car needs a new ________.", answer: "worn tire" },
  { q: "There is a ________ in the side of the car.", answer: "dent" }
];

function renderGrammar() {
  const container = document.getElementById("grammarQuestions");
  grammarQuestions.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "question-card";
    const optionsHtml = item.options.map(option => `
      <label class="option-label">
        <input type="radio" name="grammar-${index}" value="${option}"> ${option}
      </label>
    `).join("");
    card.innerHTML = `
      <div class="question-title">${index + 1}. ${item.q}</div>
      <div class="options">${optionsHtml}</div>
    `;
    container.appendChild(card);
  });
}

function renderVocabulary() {
  document.getElementById("wordBank").textContent = wordBank.join(" | ");
  const container = document.getElementById("vocabularyQuestions");
  vocabularyQuestions.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "question-card";
    const optionsHtml = wordBank.map(word => `<option value="${word}">${word}</option>`).join("");
    card.innerHTML = `
      <div class="question-title">${index + 1}. ${item.q}</div>
      <select name="vocab-${index}">
        <option value="">Choose the correct word</option>
        ${optionsHtml}
      </select>
    `;
    container.appendChild(card);
  });
}

function getGrammarAnswer(index) {
  const selected = document.querySelector(`input[name="grammar-${index}"]:checked`);
  return selected ? selected.value : "";
}

function getVocabularyAnswer(index) {
  const selected = document.querySelector(`select[name="vocab-${index}"]`);
  return selected ? selected.value : "";
}

function finishExam() {
  let score = 0;
  const total = grammarQuestions.length + vocabularyQuestions.length;
  let answerHtml = "<h2>Correct Answers After Finishing the Exam</h2>";

  answerHtml += "<h3>Grammar</h3>";
  grammarQuestions.forEach((item, index) => {
    const studentAnswer = getGrammarAnswer(index);
    const isCorrect = studentAnswer === item.answer;
    if (isCorrect) score++;
    answerHtml += `
      <div class="answer-row">
        <strong>${index + 1}. ${item.q}</strong><br>
        Your answer: ${studentAnswer || "No answer"}<br>
        Correct answer: <strong>${item.answer}</strong><br>
        <span class="badge ${isCorrect ? "badge-correct" : "badge-wrong"}">${isCorrect ? "Correct" : "Wrong"}</span>
      </div>
    `;
  });

  answerHtml += "<h3>Vocabulary</h3>";
  vocabularyQuestions.forEach((item, index) => {
    const studentAnswer = getVocabularyAnswer(index);
    const isCorrect = studentAnswer === item.answer;
    if (isCorrect) score++;
    answerHtml += `
      <div class="answer-row">
        <strong>${index + 1}. ${item.q}</strong><br>
        Your answer: ${studentAnswer || "No answer"}<br>
        Correct answer: <strong>${item.answer}</strong><br>
        <span class="badge ${isCorrect ? "badge-correct" : "badge-wrong"}">${isCorrect ? "Correct" : "Wrong"}</span>
      </div>
    `;
  });

  const percentage = Math.round((score / total) * 100);
  let grade = "Needs Improvement";
  if (percentage >= 90) grade = "A - Excellent";
  else if (percentage >= 80) grade = "B - Very Good";
  else if (percentage >= 70) grade = "C - Good";
  else if (percentage >= 60) grade = "D - Pass";

  const name = document.getElementById("studentName").value || "Student";
  const studentClass = document.getElementById("studentClass").value || "Not written";

  const resultBox = document.getElementById("resultBox");
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    <h2>Exam Result</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Class:</strong> ${studentClass}</p>
    <p><strong>Score:</strong> ${score} / ${total}</p>
    <p><strong>Percentage:</strong> ${percentage}%</p>
    <p><strong>Grade:</strong> ${grade}</p>
  `;

  const answerKeyBox = document.getElementById("answerKeyBox");
  answerKeyBox.classList.remove("hidden");
  answerKeyBox.innerHTML = answerHtml;

  document.getElementById("finishBtn").disabled = true;
  document.getElementById("finishBtn").textContent = "Exam Finished";
  window.scrollTo({ top: resultBox.offsetTop, behavior: "smooth" });
}

renderGrammar();
renderVocabulary();
document.getElementById("finishBtn").addEventListener("click", finishExam);
