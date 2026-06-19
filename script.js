const questions = [
  {
    "type": "grammar",
    "q": "I'll call you when I _____.",
    "options": [
      "arriving",
      "arrived",
      "arrive"
    ],
    "answer": "arrive"
  },
  {
    "type": "grammar",
    "q": "The noise was so loud _____ we could hardly hear ourselves talk.",
    "options": [
      "that",
      "than",
      "then"
    ],
    "answer": "that"
  },
  {
    "type": "grammar",
    "q": "There _____ a phone message for you.",
    "options": [
      "is",
      "be",
      "are"
    ],
    "answer": "is"
  },
  {
    "type": "grammar",
    "q": "There are lots of unanswered _____ in my inbox.",
    "options": [
      "emails",
      "email",
      "emailes"
    ],
    "answer": "emails"
  },
  {
    "type": "grammar",
    "q": "The plural of city is _____.",
    "options": [
      "citys",
      "cities",
      "cityes"
    ],
    "answer": "cities"
  },
  {
    "type": "grammar",
    "q": "The plural of company is _____.",
    "options": [
      "companys",
      "companyes",
      "companies"
    ],
    "answer": "companies"
  },
  {
    "type": "grammar",
    "q": "The plural of leaf is _____.",
    "options": [
      "leaves",
      "leafs",
      "leafes"
    ],
    "answer": "leaves"
  },
  {
    "type": "grammar",
    "q": "The plural of child is _____.",
    "options": [
      "childes",
      "childs",
      "children"
    ],
    "answer": "children"
  },
  {
    "type": "grammar",
    "q": "There isn't _____ pollution.",
    "options": [
      "many",
      "any",
      "some"
    ],
    "answer": "any"
  },
  {
    "type": "grammar",
    "q": "The windows were _____.",
    "options": [
      "break",
      "broke",
      "broken"
    ],
    "answer": "broken"
  },
  {
    "type": "grammar",
    "q": "The vase was _____.",
    "options": [
      "crack",
      "cracked",
      "cracking"
    ],
    "answer": "cracked"
  },
  {
    "type": "grammar",
    "q": "The car was _____.",
    "options": [
      "damaged",
      "damage",
      "damaging"
    ],
    "answer": "damaged"
  },
  {
    "type": "grammar",
    "q": "The shirt was _____.",
    "options": [
      "tear",
      "tearing",
      "torn"
    ],
    "answer": "torn"
  },
  {
    "type": "grammar",
    "q": "Turn _____ your cell phone.",
    "options": [
      "away",
      "up",
      "off"
    ],
    "answer": "off"
  },
  {
    "type": "grammar",
    "q": "Put your clothes _____.",
    "options": [
      "off",
      "away",
      "on"
    ],
    "answer": "away"
  },
  {
    "type": "grammar",
    "q": "When we arrived at the airport, our flight had already _____.",
    "options": [
      "leave",
      "left",
      "leaving"
    ],
    "answer": "left"
  },
  {
    "type": "grammar",
    "q": "They couldn't get in because they had _____ the key.",
    "options": [
      "forgotten",
      "forget",
      "forgot"
    ],
    "answer": "forgotten"
  },
  {
    "type": "grammar",
    "q": "If you don't leave now, you _____ be late.",
    "options": [
      "would",
      "had",
      "will"
    ],
    "answer": "will"
  },
  {
    "type": "grammar",
    "q": "I should have _____ I was sorry.",
    "options": [
      "saying",
      "say",
      "said"
    ],
    "answer": "said"
  },
  {
    "type": "grammar",
    "q": "You shouldn't have _____ that.",
    "options": [
      "did",
      "do",
      "done"
    ],
    "answer": "done"
  },
  {
    "type": "grammar",
    "q": "If I had studied harder, I would have _____ the exam.",
    "options": [
      "pass",
      "passing",
      "passed"
    ],
    "answer": "passed"
  },
  {
    "type": "grammar",
    "q": "If I hadn't found my book, I would have _____ in trouble.",
    "options": [
      "being",
      "be",
      "been"
    ],
    "answer": "been"
  },
  {
    "type": "grammar",
    "q": "We moved to Muscat three years _____.",
    "options": [
      "since",
      "ago",
      "for"
    ],
    "answer": "ago"
  },
  {
    "type": "grammar",
    "q": "He has worked as a scientist _____ many years.",
    "options": [
      "ago",
      "since",
      "for"
    ],
    "answer": "for"
  },
  {
    "type": "grammar",
    "q": "We have lived in Muscat _____ May.",
    "options": [
      "since",
      "for",
      "ago"
    ],
    "answer": "since"
  },
  {
    "type": "grammar",
    "q": "Can the robot do my homework? No, it _____.",
    "options": [
      "can't",
      "may",
      "could"
    ],
    "answer": "can't"
  },
  {
    "type": "grammar",
    "q": "Could people travel long distances before airplanes? Yes, they _____.",
    "options": [
      "can",
      "may",
      "could"
    ],
    "answer": "could"
  },
  {
    "type": "grammar",
    "q": "_____ I leave early today?",
    "options": [
      "May",
      "Did",
      "Was"
    ],
    "answer": "May"
  },
  {
    "type": "grammar",
    "q": "Could you _____ in this form, please?",
    "options": [
      "fill",
      "filled",
      "filling"
    ],
    "answer": "fill"
  },
  {
    "type": "grammar",
    "q": "Can you _____ me?",
    "options": [
      "help",
      "helping",
      "helped"
    ],
    "answer": "help"
  },
  {
    "type": "grammar",
    "q": "I _____ talking to Mary.",
    "options": [
      "is",
      "am",
      "are"
    ],
    "answer": "am"
  },
  {
    "type": "grammar",
    "q": "I haven't seen the film _____.",
    "options": [
      "yet",
      "ago",
      "for"
    ],
    "answer": "yet"
  },
  {
    "type": "grammar",
    "q": "He said that he _____ a brother and a sister.",
    "options": [
      "have",
      "has",
      "had"
    ],
    "answer": "had"
  },
  {
    "type": "grammar",
    "q": "She said she _____ talking to Mary.",
    "options": [
      "am",
      "is",
      "was"
    ],
    "answer": "was"
  },
  {
    "type": "grammar",
    "q": "He asked how old I _____.",
    "options": [
      "is",
      "was",
      "am"
    ],
    "answer": "was"
  },
  {
    "type": "grammar",
    "q": "He asked _____ Tom was a student.",
    "options": [
      "that",
      "if",
      "where"
    ],
    "answer": "if"
  },
  {
    "type": "grammar",
    "q": "Dubai is the place _____ I want to go on vacation.",
    "options": [
      "who",
      "where",
      "when"
    ],
    "answer": "where"
  },
  {
    "type": "grammar",
    "q": "Home is _____ the heart is.",
    "options": [
      "where",
      "what",
      "who"
    ],
    "answer": "where"
  },
  {
    "type": "vocabulary",
    "q": "Which word means evidence that something is true?",
    "options": [
      "Proof",
      "Dynamic",
      "Scan"
    ],
    "answer": "Proof"
  },
  {
    "type": "vocabulary",
    "q": "Which word means a person trying to be elected?",
    "options": [
      "Candidate",
      "Urban",
      "Bother"
    ],
    "answer": "Candidate"
  },
  {
    "type": "vocabulary",
    "q": "Which word means to get an image using a computer?",
    "options": [
      "Upgrade",
      "Proof",
      "Scan"
    ],
    "answer": "Scan"
  },
  {
    "type": "vocabulary",
    "q": "Which word means to make the effort?",
    "options": [
      "Urban",
      "Candidate",
      "Bother"
    ],
    "answer": "Bother"
  },
  {
    "type": "vocabulary",
    "q": "Which word means replaced by newer or better equipment?",
    "options": [
      "Proof",
      "Dynamic",
      "Upgrade"
    ],
    "answer": "Upgrade"
  },
  {
    "type": "vocabulary",
    "q": "Which word means always active, changing, or developing?",
    "options": [
      "Dynamic",
      "Bother",
      "Urban"
    ],
    "answer": "Dynamic"
  },
  {
    "type": "vocabulary",
    "q": "Which word means related to cities or towns?",
    "options": [
      "Scan",
      "Urban",
      "Candidate"
    ],
    "answer": "Urban"
  },
  {
    "type": "category",
    "q": "Which word belongs to Housing?",
    "options": [
      "leaky pipe",
      "worn tire",
      "missing button"
    ],
    "answer": "leaky pipe"
  },
  {
    "type": "category",
    "q": "Which word belongs to Housing?",
    "options": [
      "stain",
      "dead battery",
      "dripping faucet"
    ],
    "answer": "dripping faucet"
  },
  {
    "type": "category",
    "q": "Which word belongs to Housing?",
    "options": [
      "loose floorboards",
      "hole",
      "dent in the body"
    ],
    "answer": "loose floorboards"
  },
  {
    "type": "category",
    "q": "Which word belongs to Housing?",
    "options": [
      "torn",
      "no signal",
      "broken windowpane"
    ],
    "answer": "broken windowpane"
  },
  {
    "type": "category",
    "q": "Which word belongs to Car Repairs?",
    "options": [
      "missing button",
      "dead battery",
      "leaky pipe"
    ],
    "answer": "dead battery"
  },
  {
    "type": "category",
    "q": "Which word belongs to Car Repairs?",
    "options": [
      "worn tire",
      "dripping faucet",
      "stain"
    ],
    "answer": "worn tire"
  },
  {
    "type": "category",
    "q": "Which word belongs to Car Repairs?",
    "options": [
      "TV lines on the screen",
      "dent in the body",
      "torn"
    ],
    "answer": "dent in the body"
  },
  {
    "type": "category",
    "q": "Which word belongs to Clothing?",
    "options": [
      "stain",
      "leaky pipe",
      "dead battery"
    ],
    "answer": "stain"
  },
  {
    "type": "category",
    "q": "Which word belongs to Clothing?",
    "options": [
      "air conditioner does not get cold",
      "hole",
      "worn tire"
    ],
    "answer": "hole"
  },
  {
    "type": "category",
    "q": "Which word belongs to Clothing?",
    "options": [
      "loose floorboards",
      "cell phone no signal",
      "missing button"
    ],
    "answer": "missing button"
  },
  {
    "type": "category",
    "q": "Which word belongs to Clothing?",
    "options": [
      "broken windowpane",
      "dent in the body",
      "torn"
    ],
    "answer": "torn"
  },
  {
    "type": "category",
    "q": "Which word belongs to Electronic Products?",
    "options": [
      "air conditioner does not get cold",
      "leaky pipe",
      "stain"
    ],
    "answer": "air conditioner does not get cold"
  },
  {
    "type": "category",
    "q": "Which word belongs to Electronic Products?",
    "options": [
      "worn tire",
      "missing button",
      "cell phone no signal"
    ],
    "answer": "cell phone no signal"
  },
  {
    "type": "category",
    "q": "Which word belongs to Electronic Products?",
    "options": [
      "TV lines on the screen",
      "dead battery",
      "hole"
    ],
    "answer": "TV lines on the screen"
  }
];

const examForm = document.getElementById("examForm");
const resultBox = document.getElementById("result");
const answerKeyBox = document.getElementById("answerKey");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

const sectionNames = {
  grammar: "Part A: Grammar",
  vocabulary: "Part B: Vocabulary Meanings",
  category: "Part C: Vocabulary Categories"
};

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderExam() {
  examForm.innerHTML = "";
  let currentSection = "";

  questions.forEach((item, index) => {
    if (item.type !== currentSection) {
      currentSection = item.type;
      const title = document.createElement("h2");
      title.className = "section-title";
      title.textContent = sectionNames[currentSection];
      examForm.appendChild(title);
    }

    const card = document.createElement("div");
    card.className = "question-card";

    const title = document.createElement("h3");
    title.textContent = (index + 1) + ". " + item.q;
    card.appendChild(title);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";

    item.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      label.className = "option";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + index;
      input.value = option;

      const span = document.createElement("span");
      span.textContent = String.fromCharCode(65 + optionIndex) + ") " + option;

      label.appendChild(input);
      label.appendChild(span);
      optionsDiv.appendChild(label);
    });

    card.appendChild(optionsDiv);
    examForm.appendChild(card);
  });
}

function getGrade(percent) {
  if (percent >= 90) return "A - Excellent";
  if (percent >= 80) return "B - Very Good";
  if (percent >= 70) return "C - Good";
  if (percent >= 60) return "D - Pass";
  return "Needs Improvement";
}

function finishExam() {
  let score = 0;
  const studentName = document.getElementById("studentName").value.trim() || "Student";
  const total = questions.length;

  const answersHtml = questions.map((item, index) => {
    const selected = document.querySelector('input[name="q' + index + '"]:checked');
    const studentAnswer = selected ? selected.value : "No answer";
    const isCorrect = studentAnswer === item.answer;

    if (isCorrect) score++;

    return `
      <div class="answer-item">
        <strong>${index + 1}. ${escapeHtml(item.q)}</strong><br>
        Your answer: <span class="${isCorrect ? "correct" : "wrong"}">${escapeHtml(studentAnswer)}</span><br>
        Correct answer: <span class="correct">${escapeHtml(item.answer)}</span>
      </div>
    `;
  }).join("");

  const percent = Math.round((score / total) * 100);
  const grade = getGrade(percent);

  resultBox.classList.remove("hidden");
  answerKeyBox.classList.remove("hidden");

  resultBox.innerHTML = `
    <h2>Exam Result</h2>
    <p><strong>Name:</strong> ${escapeHtml(studentName)}</p>
    <p class="score">${score} / ${total} (${percent}%)</p>
    <p class="${percent >= 60 ? "pass" : "fail"}">Grade: ${grade}</p>
  `;

  answerKeyBox.innerHTML = `
    <h2>Correct Answers</h2>
    ${answersHtml}
  `;

  window.scrollTo({ top: resultBox.offsetTop - 20, behavior: "smooth" });
}

function resetExam() {
  document.getElementById("studentName").value = "";
  examForm.reset();
  resultBox.classList.add("hidden");
  answerKeyBox.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

submitBtn.addEventListener("click", finishExam);
resetBtn.addEventListener("click", resetExam);

renderExam();
