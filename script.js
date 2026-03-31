// 1. ON ATTRAPE LES ÉLÉMENTS HTML
const boutonAjouter = document.getElementById('btnAjouter');
const champSaisie = document.getElementById('inputTache');
const listeTachesHTML = document.getElementById('listeTaches');
const menuCours = document.getElementById('choixCours');
const messageCompteur = document.getElementById('messageCompteur'); // Le nouveau compteur

// 2. ON CHARGE LES DONNÉES SAUVEGARDÉES
let taches = JSON.parse(localStorage.getItem("mesTaches")) || [];

// 3. ON LANCE L'AFFICHAGE AU DÉMARRAGE
afficherTaches();

// 4. FONCTION POUR AJOUTER UNE TÂCHE
boutonAjouter.addEventListener('click', function() {
    const cours = menuCours.value; 
    const texte = champSaisie.value;

    if (texte === "") {
        alert("Tu as oublié d'écrire la tâche !");
        return;
    }

    const tacheComplete = cours + " : " + texte;
    taches.push(tacheComplete);

    sauvegarder();
    afficherTaches();
    champSaisie.value = ""; // On vide le champ après l'ajout
});

// 5. FONCTION POUR AFFICHER LA LISTE ET LE COMPTEUR
function afficherTaches() {
    // A. On vide la liste actuelle pour ne pas doubler les éléments
    listeTachesHTML.innerHTML = ""; 

    // B. On crée chaque élément de la liste
    taches.forEach((tache, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${tache} 
            <button class="btn-suppr" onclick="supprimerTache(${index})">❌</button>
        `;
        listeTachesHTML.appendChild(li);
    });

    // C. MISE À JOUR DU COMPTEUR
    const nbTaches = taches.length;
    if (nbTaches === 0) {
        messageCompteur.innerText = "Bravo ! Aucune tâche en attente.";
    } else if (nbTaches === 1) {
        messageCompteur.innerText = "Il te reste 1 tâche à faire.";
    } else {
        messageCompteur.innerText = "Il te reste " + nbTaches + " tâches à faire.";
    }
}

// 6. FONCTION POUR SAUVEGARDER DANS LE NAVIGATEUR
function sauvegarder() {
    localStorage.setItem("mesTaches", JSON.stringify(taches));
}

// 7. FONCTION POUR SUPPRIMER UNE TÂCHE
function supprimerTache(index) {
    taches.splice(index, 1);
    sauvegarder();
    afficherTaches();
}