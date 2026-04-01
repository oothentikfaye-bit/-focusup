// NAVIGATION DES VUES
function changerVue(idVue) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.getElementById(idVue).style.display = 'block';
}

// NAVIGATION DES SECTIONS DANS L'APPLI
function afficherSection(idSection, titre) {
    document.querySelectorAll('.app-section').forEach(s => s.style.display = 'none');
    document.getElementById(idSection).style.display = 'block';
    document.getElementById('titre-section').innerText = titre;
}

// GESTION DES TÂCHES
let taches = JSON.parse(localStorage.getItem("mesTaches")) || [];
const listeTachesHTML = document.getElementById('listeTaches');

function afficherTaches() {
    listeTachesHTML.innerHTML = "";
    taches.forEach((t, i) => {
        listeTachesHTML.innerHTML += `
            <li>
                <span>${t}</span>
                <button onclick="supprimerTache(${i})" style="border:none; background:none;">❌</button>
            </li>`;
    });
}

document.getElementById('btnAjouter').addEventListener('click', () => {
    const matiere = document.getElementById('choixCours').value;
    const texte = document.getElementById('inputTache').value;
    if (texte.trim() === "") return;

    taches.push(matiere + " : " + texte);
    localStorage.setItem("mesTaches", JSON.stringify(taches));
    document.getElementById('inputTache').value = "";
    afficherTaches();
});

function supprimerTache(i) {
    taches.splice(i, 1);
    localStorage.setItem("mesTaches", JSON.stringify(taches));
    afficherTaches();
}

// GESTION DES NOTES
document.getElementById('btnSauverNotes').addEventListener('click', () => {
    const matiere = document.getElementById('selectCoursNotes').value;
    const notes = document.getElementById('zoneNotes').value;
    localStorage.setItem("notes_" + matiere, notes);
    alert("C'est enregistré !");
});

// IA
function demanderIA() {
    const notes = document.getElementById('zoneNotes').value;
    const rep = document.getElementById('ia-reponse');
    if (notes.length < 10) {
        rep.innerText = "Écris d'abord des notes dans l'onglet Cours !";
        return;
    }
    rep.innerText = "🤖 L'IA réfléchit...";
    setTimeout(() => {
        rep.innerHTML = "<strong>Analyse IA :</strong> Tes notes sont bien structurées. Pense à relire les définitions clés de " + document.getElementById('selectCoursNotes').value + " demain matin.";
    }, 1500);
}

// Initialisation
afficherTaches();