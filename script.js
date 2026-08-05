const pages = document.querySelectorAll(".page");
const homePage = document.getElementById("homePage");
const moodPage = document.getElementById("moodPage");
const activityPage = document.getElementById("activityPage");
const foodPage = document.getElementById("foodPage");
const princessPage = document.getElementById("princessPage");
const summaryPage = document.getElementById("summaryPage");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const toActivities = document.getElementById("toActivities");
const toFood = document.getElementById("toFood");
const toPrincess = document.getElementById("toPrincess");
const toSummary = document.getElementById("toSummary");

const funnyText = document.getElementById("funnyText");

const state = {
    mood: "",
    activities: [],
    food: "",
    princess: [],
    notes: ""
};

let noClicks = 0;

const funnyMessages = [
    "Tem certeza? 🥺",
    "Alerta de resposta errada! ⚠️",
    "Eu até treinei para te chamar para sair 😭",
    "O botão de não deve estar com vergonha..",
    "My Melody acharia isso errado 💖",
    "Você clicou no botão errado?",
    "Vou comprar seus docinhos favoritos 🥹",
    "Vou carregar suas sacolas e sua bolsa 🛍",
    "Você vai poder escolher o que quiser.",
    "Missão fracassada com sucesso.",
];

function showPage(page) {
    pages.forEach(p => p.classList.remove("active"));
    page.classList.add("active");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function launchConfetti() {
    const canvas = document.getElementById("confetti");
    if (!canvas) return;
    canvas.style.display = "block";
    setTimeout(() => {
        canvas.style.display = "none";
    }, 2500);
}

yesBtn.addEventListener("click", () => {
    launchConfetti();
    showPage(moodPage);
});

function moveNoButton() {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 100;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    noBtn.style.position = "fixed";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

function updateNoButton() {
    noClicks++;
    funnyText.innerText = funnyMessages[noClicks % funnyMessages.length];
    const scale = Math.max(0.2, 1 - noClicks * 0.08);
    noBtn.style.transform =
        `scale(${scale})`;
    const yesScale = 1 + noClicks * 0.08;
    yesBtn.style.transform = `scale(${yesScale})`;
    moveNoButton();
    if (noClicks >= 12) {
        noBtn.innerText = "🥲";
    }
    if (noClicks >= 18) {
        noBtn.style.width = "18px";
        noBtn.style.height = "18px";
        noBtn.style.fontSize = "8px";
    }
}

noBtn.addEventListener("mouseenter", updateNoButton);
noBtn.addEventListener("click", updateNoButton);

// ---------- MOODS ----------
const moodButtons =
    document.querySelectorAll(".mood");

const moodSuggestions = {

    Good: [
        "Cafe ☕",
        "Shopping 🛍",
        "Ice Cream 🍦",
        "Walk 🌸"
    ],

    Stressed: [
        "Massage 💆",
        "Stay Home 🛋",
        "Netflix 📺",
        "Boba 🧋"
    ],

    Emotional: [
        "Sushi 🍣",
        "Sunset 🌇",
        "Cuddles 🧸",
        "Movie 🎬"
    ],

    Excited: [
        "Arcade 🕹",
        "Karaoke 🎤",
        "Mall 🛍",
        "Random Adventure 🚗"
    ],

    Sleepy: [
        "Coffee ☕",
        "Blanket Burrito 🥹",
        "Netflix",
        "Nap Together 😴"
    ],

    Chaos: [
        "Spin a Wheel 😂",
        "Road Trip 🚗",
        "Buy Random Things 🛒",
        "Whatever Happens Happens 😈"
    ]
};

moodButtons.forEach(button => {
    button.addEventListener("click", () => {
        moodButtons.forEach(btn =>
            btn.classList.remove("selected")
        );
        button.classList.add("selected");
        state.mood = button.dataset.mood;
        const suggestions = moodSuggestions[state.mood];
        funnyText.innerHTML = "<strong>Recommended:</strong><br>" + suggestions.join("<br>");
    });
});

toActivities.addEventListener("click", () => {
    if (!state.mood) {
        alert("Me diga como você está 💖");
        return;
    }
    showPage(activityPage);
});

const activityCheckboxes = document.querySelectorAll( "#activityPage input[type='checkbox']");
toFood.addEventListener("click", () => {
    state.activities = [];
    activityCheckboxes.forEach(box => {
        if (box.checked) {
            state.activities.push(box.value);
        }
    });
    showPage(foodPage);
});

const foodButtons = document.querySelectorAll(".food");
const otherFood = document.getElementById("otherFood");
foodButtons.forEach(button => {
    button.addEventListener("click", () => {
        foodButtons.forEach(btn => btn.classList.remove("selected")
        );
        button.classList.add("selected");
        state.food = button.innerText;
        otherFood.value = "";
    });
});

toPrincess.addEventListener("click", () => {
    if (otherFood.value.trim() !== "") {
        state.food = otherFood.value.trim();
    }
    if (!state.food) {
        alert("Você  precisa comer princesa 🍣");
        return;
    }
    showPage(princessPage);
});

const princessCheckboxes = document.querySelectorAll("#princessPage input[type='checkbox']");
const notes = document.getElementById("notes");
const summary = document.getElementById("summary");
const calendarBtn = document.getElementById("calendarBtn");

toSummary.addEventListener("click", () => {
    state.princess = [];
    princessCheckboxes.forEach(box => {
        if (box.checked) {
            state.princess.push(box.value);
        }
    });
    state.notes = notes.value.trim();
    buildSummary();
    showPage(summaryPage);
});

function buildSummary() {
    summary.innerHTML = `
        <div class="summary-card">
            <h2>💖 Nosso Encontro 💖</h2>
            <p>
                <strong>Se Sentindo</strong><br>
                ${state.mood}
            </p>
            <p>
                <strong>Atividades</strong><br>
                ${
                    state.activities.length
                        ? state.activities.join(", ")
                        : "Você decide 😌"
                }
            </p>
            <p>
                <strong>Comida</strong><br>
                ${state.food}
            </p>
            <p>
                <strong>Pedidos da Princesa</strong><br>
                ${
                    state.princess.length
                        ? state.princess.join(", ")
                        : "Apenas ficar juntos 💕"
                }
            </p>
            <p>
                <strong>Notas</strong><br>
                ${
                    state.notes.length
                        ? state.notes
                        : "Sem notas adicionais."
                }
            </p>
        </div>`;
}

calendarBtn.addEventListener("click", exportCalendar);
function exportCalendar() {
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;
    if (!date || !time) {
        alert("Choose a date and time 💖");
        return;
    }
    const start = new Date(`${date}T${time}`);
    const end = new Date(start);
    end.setHours(end.getHours() + 3);
    function formatICS(d) {
        return d.toISOString()
            .replace(/[-:]/g, "")
            .split(".")[0] + "Z";
    }
    const description = ` Mood: ${state.mood}
Activities:
${state.activities.join(", ")}
Food:
${state.food}
Princess Requests:
${state.princess.join(", ")}
Notes:
${state.notes}
`;
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:💕 Date with My Favorite Person
DESCRIPTION:${description.replace(/\n/g,"\\n")}
LOCATION:${location}
DTSTART:${formatICS(start)}
DTEND:${formatICS(end)}
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob(
        [ics],
        {
            type: "text/calendar"
        }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DateMission.ics";
    a.click();
    URL.revokeObjectURL(url);
    alert("Calendar file downloaded! 💖");
}

const hearts = document.getElementById("hearts");
function createHeart() {
    if (!hearts) return;
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = [
        "💖",
        "💜",
        "💕",
        "✨",
        "🌸",
        "🎀"
    ][
        Math.floor(Math.random() * 6)
    ];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (18 + Math.random() * 22) + "px";
    heart.style.animationDuration = (5 + Math.random() * 6) + "s";
    hearts.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 11000);
}
setInterval(createHeart, 500);

const popup = document.getElementById("popup");
setTimeout(() => {
    if (popup) {
        popup.classList.add("show");
        setTimeout(() => {
            popup.classList.remove("show");
        }, 3500);
    }
}, 1800);
let buffer = "";
document.addEventListener("keydown", e => {
    buffer += e.key.toLowerCase();
    if (buffer.length > 15) {
        buffer = buffer.slice(-15);
    }
    if (buffer.includes("iloveyou")) {
        launchConfetti();
        alert(
`💖 SECRET UNLOCKED 💖
I love you too 🥹
Achievement:
Best Girlfriend Ever 🏆`
        );
        buffer = "";
    }
});

document.addEventListener("dblclick", e => {
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "💖";
        heart.style.position = "fixed";
        heart.style.left = e.clientX + "px";
        heart.style.top = e.clientY + "px";
        heart.style.pointerEvents = "none";
        heart.style.transform = `translate(
                ${(Math.random()-0.5)*200}px,
                ${-Math.random()*200}px
            )`; heart.style.transition = "all 1.2s ease";
        document.body.appendChild(heart);
        setTimeout(() => {
            heart.style.opacity = "0";
        }, 50);
        setTimeout(() => {
            heart.remove();
        }, 1300);
    }
});

console.log(`
💖 DATE QUEST LOADED 💖

Mission:
Make Princess Smile ✔

Have Fun ✔

Bring Candies ✔

Forget Hugs ❌ NEVER
`);

async function sendDateRequest() {
    const data = {
        mood: state.mood,
        activities: state.activities.join(", "),
        food: state.food,
        princessRequests: state.princess.join(", "),
        notes: state.notes,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        location: document.getElementById("location").value
    };
    try {
        const response = await fetch("https://formspree.io/f/mqpzzyej", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            alert("💖 Your date request has been sent!");
            window.location.reload();
        } else {
            alert("Something went wrong sending the request.");
        }
    } catch (error) {
        alert("Couldn't connect. Please try again.");
        console.error(error);
    }
}
const sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", async () => {
    await sendDateRequest();
});