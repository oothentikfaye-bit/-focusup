// NAVIGATION
function changerVue(idVue) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.getElementById(idVue).style.display = 'block';
}

function afficherSection(idSection) {
    document.querySelectorAll('.app-section').forEach(s => s.style.display = 'none');
    document.getElementById(idSection).style.display = 'block';
}

// GESTION DES TÂCHES (Ton code précédent amélioré)
const boutonAjouter = document.getElementById('btnAjouter');
let taches = JSON.parse(localStorage.getItem("mesTaches")) || [];

boutonAjouter.addEventListener('click', () => {
    const cours = document.getElementById('choixCours').value;
    const texte = document.getElementById('inputTache').value;
    if(!texte) return;
    
    taches.push(`${cours} : ${texte}`);
    localStorage.setItem("mesTaches", JSON.stringify(taches));
    document.getElementById('inputTache').value = "";
    afficherTaches();
});

function afficherTaches() {
    const liste = document.getElementById('listeTaches');
    const compteur = document.getElementById('messageCompteur');
    liste.innerHTML = "";
    taches.forEach((t, i) => {
        liste.innerHTML += `<li>${t} <button onclick="supprimer(${i})">❌</button></li>`;
    });
    compteur.innerText = taches.length + " révision(s) à faire";
}

function supprimer(i) {
    taches.splice(i, 1);
    localStorage.setItem("mesTaches", JSON.stringify(taches));
    afficherTaches();
}

// GESTION DES NOTES ET IA
const zoneNotes = document.getElementById('zoneNotes');
const selectCoursNotes = document.getElementById('selectCoursNotes');

document.getElementById('btnSauverNotes').addEventListener('click', () => {
    localStorage.setItem("notes_" + selectCoursNotes.value, zoneNotes.value);
    alert("Résumé sauvegardé !");
});

function demanderIA() {
    const notes = zoneNotes.value;
    const box = document.getElementById('ia-reponse');
    if(notes.length < 10) {
        box.innerText = "⚠️ Écris d'abord un résumé pour que l'IA puisse l'analyser.";
        return;
    }
    box.innerText = "🤖 L'IA analyse ton résumé de " + selectCoursNotes.value + "...";
    
    // Simulation d'une réponse IA
    setTimeout(() => {
        box.innerHTML = "<strong>Conseil de l'IA :</strong> Ton résumé sur " + selectCoursNotes.value + " est bon. Pour approfondir, essaie de relier ce concept aux chapitres précédents.";
    }, 2000);
}

// Initialisation
afficherTaches();