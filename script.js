// --- 1. NAVIGATION ---
function changerVue(idVue) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.getElementById(idVue).style.display = 'block';
}

function afficherSection(idSection, titre) {
    document.querySelectorAll('.app-section').forEach(s => s.style.display = 'none');
    document.getElementById(idSection).style.display = 'block';
    document.getElementById('titre-section').innerText = titre;
}

// --- 2. GESTION DES TÂCHES ---
let taches = JSON.parse(localStorage.getItem("mesTaches")) || [];

function afficherTaches() {
    const liste = document.getElementById('listeTaches');
    liste.innerHTML = "";
    taches.forEach((t, i) => {
        const matiere = t.split(' : ')[0]; // On récupère le nom avant les ":"
        const li = document.createElement('li');
        li.className = "task-" + matiere; 
        li.innerHTML = `<span>${t}</span> <button onclick="supprimerTache(${i})" style="border:none; background:none; cursor:pointer;">❌</button>`;
        liste.appendChild(li);
    });
}

document.getElementById('btnAjouter').addEventListener('click', () => {
    const mat = document.getElementById('choixCours').value;
    const txt = document.getElementById('inputTache').value;
    if (txt.trim() === "") return;
    taches.push(mat + " : " + txt);
    localStorage.setItem("mesTaches", JSON.stringify(taches));
    document.getElementById('inputTache').value = "";
    afficherTaches();
});

window.supprimerTache = function(i) {
    taches.splice(i, 1);
    localStorage.setItem("mesTaches", JSON.stringify(taches));
    afficherTaches();
};

// --- 3. MINUTEUR POMODORO ---
let temps = 25 * 60;
let timerId = null;

function startTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
        document.getElementById('btn-start').innerText = "▶️ Reprendre";
    } else {
        timerId = setInterval(() => {
            temps--;
            updateTimerDisplay();
            if (temps <= 0) {
                clearInterval(timerId);
                alert("⏰ Temps écoulé ! C'est l'heure de la pause.");
                resetTimer();
            }
        }, 1000);
        document.getElementById('btn-start').innerText = "⏸️ Pause";
    }
}

function updateTimerDisplay() {
    let min = Math.floor(temps / 60);
    let sec = temps % 60;
    document.getElementById('timer').innerText = `${min}:${sec < 10 ? '0'+sec : sec}`;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    temps = 25 * 60;
    updateTimerDisplay();
    document.getElementById('btn-start').innerText = "▶️ Démarrer";
}

// --- 4. NOTES ET IA ---
document.getElementById('btnSauverNotes').addEventListener('click', () => {
    const mat = document.getElementById('selectCoursNotes').value;
    const notes = document.getElementById('zoneNotes').value;
    localStorage.setItem("notes_" + mat, notes);
    alert("🚀 Résumé de " + mat + " sauvegardé !");
});

function demanderIA() {
    const notes = document.getElementById('zoneNotes').value.toLowerCase();
    const rep = document.getElementById('ia-reponse');
    if (notes.length < 10) { rep.innerText = "Écris d'abord tes cours."; return; }

    rep.innerText = "🤖 FocusUP AI réfléchit...";
    setTimeout(() => {
        let conseil = "Ton résumé est clair. Pense à bien réviser les notions clés demain.";
        if(notes.includes("moliere") || notes.includes("litterature")) conseil = "💡 L'IA te suggère d'analyser aussi le mouvement du Classicisme pour ton cours.";
        if(notes.includes("pythagore") || notes.includes("maths")) conseil = "💡 L'IA te suggère de faire 2 exercices d'application pour maîtriser ce théorème.";
        rep.innerHTML = `<strong>Conseil IA :</strong><br>${conseil}`;
    }, 1500);
}

// Lancement au démarrage
afficherTaches();