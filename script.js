// ==========================================
// 1. NAVIGATION (Changer de page/onglet)
// ==========================================

// Pour passer de l'Accueil à l'Appli
function changerVue(idVue) {
    // On cache toutes les vues
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    // On affiche la vue demandée
    document.getElementById(idVue).style.display = 'block';
}

// Pour changer de section à l'intérieur de l'appli (Tâches, Cours, IA)
function afficherSection(idSection) {
    document.querySelectorAll('.app-section').forEach(s => s.style.display = 'none');
    document.getElementById(idSection).style.display = 'block';
}


// ==========================================
// 2. GESTION DES TÂCHES (Révisions)
// ==========================================

let taches = JSON.parse(localStorage.getItem("mesTaches")) || [];

const btnAjouter = document.getElementById('btnAjouter');
const inputTache = document.getElementById('inputTache');
const choixCours = document.getElementById('choixCours');
const listeTachesHTML = document.getElementById('listeTaches');
const messageCompteur = document.getElementById('messageCompteur');

function afficherTaches() {
    listeTachesHTML.innerHTML = "";
    taches.forEach((tache, index) => {
        const li = document.createElement('li');
        li.className = "tache-item";
        li.innerHTML = `
            <span>${tache}</span>
            <button class="btn-suppr" onclick="supprimerTache(${index})">❌</button>
        `;
        listeTachesHTML.appendChild(li);
    });

    // Mise à jour du compteur
    if (taches.length === 0) {
        messageCompteur.innerText = "Aucune révision prévue 🚀";
    } else {
        messageCompteur.innerText = "Il te reste " + taches.length + " tâche(s)";
    }
}

btnAjouter.addEventListener('click', () => {
    const texte = inputTache.value.trim();
    const matiere = choixCours.value;

    if (texte === "") return;

    taches.push(matiere + " : " + texte);
    localStorage.setItem("mesTaches", JSON.stringify(taches));
    inputTache.value = "";
    afficherTaches();
});

window.supprimerTache = function(index) {
    taches.splice(index, 1);
    localStorage.setItem("mesTaches", JSON.stringify(taches));
    afficherTaches();
};


// ==========================================
// 3. MÉMOIRE DE STOCKAGE (Résumés)
// ==========================================

const zoneNotes = document.getElementById('zoneNotes');
const selectCoursNotes = document.getElementById('selectCoursNotes');
const btnSauverNotes = document.getElementById('btnSauverNotes');

// Charger les notes quand on change de matière
selectCoursNotes.addEventListener('change', () => {
    const notesSaves = localStorage.getItem("notes_" + selectCoursNotes.value) || "";
    zoneNotes.value = notesSaves;
});

// Sauvegarder les notes
btnSauverNotes.addEventListener('click', () => {
    localStorage.setItem("notes_" + selectCoursNotes.value, zoneNotes.value);
    alert("🚀 Résumé de " + selectCoursNotes.value + " bien enregistré dans ta mémoire !");
});


// ==========================================
// 4. L'INTELLIGENCE ARTIFICIELLE (IA)
// ==========================================

function demanderIA() {
    const notes = zoneNotes.value;
    const iaBox = document.getElementById('ia-reponse');

    if (notes.length < 20) {
        iaBox.innerText = "⚠️ Ton résumé est trop court pour que l'IA puisse l'analyser. Écris au moins deux phrases !";
        return;
    }

    iaBox.innerText = "🤖 Analyse de l'IA en cours...";

    // On simule une réflexion de l'IA (2 secondes)
    setTimeout(() => {
        const motsCles = notes.split(' ').length;
        iaBox.innerHTML = `
            <strong>Analyse de FocusUP AI :</strong><br>
            Ton résumé contient environ ${motsCles} mots. <br><br>
            💡 <em>Conseil :</em> Pour mieux retenir ce cours de <strong>${selectCoursNotes.value}</strong>, essaie de créer un schéma visuel ou de l'expliquer à voix haute à un ami.
        `;
    }, 2000);
}

// ==========================================
// 5. LANCEMENT AU DÉMARRAGE
// ==========================================
afficherTaches();
// On charge les notes de la première matière par défaut
const notesInitiales = localStorage.getItem("notes_" + selectCoursNotes.value) || "";
zoneNotes.value = notesInitiales;