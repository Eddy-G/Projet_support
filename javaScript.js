const root = document.documentElement;
root.style.setProperty('--couleur-principale', '#fffff'); // Changez la couleur principale

$(document).ready(function() {
    $("#searchInput").keyup(function(event) {
        if (event.which === 13) {
            $("#submit").click();
            const searchInput = document.getElementById('searchInput');
            const query = searchInput.value.trim();
            if (query !== '') {
              // Rediriger l'utilisateur vers Google avec la recherche.
              window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            }
        }
    });
});


var phrasesMotivation = [
    "La persévérance est la clé du succès.",
    "Chaque jour est une nouvelle opportunité.",
    "Rien n'est impossible si vous y croyez.",
    "La positivité mène au progrès.",
    // Ajoutez autant de phrases que vous le souhaitez
];

function phraseMotivationAleatoire() {
    var index = Math.floor(Math.random() * phrasesMotivation.length);
    return phrasesMotivation[index];
}
function WallpaperAleatoire() {
    return index = Math.floor(Math.random() * 2);
}
// Récupérez l'élément HTML où vous souhaitez afficher la phrase de motivation
var elementMotivation = document.getElementById("motivation");

// Appel de la fonction pour obtenir une phrase de motivation aléatoire
var phraseDuJour = phraseMotivationAleatoire();

// Insérez la phrase de motivation dans l'élément HTML
elementMotivation.textContent = phraseDuJour;

var elementWallpaper = document.getElementById("wallpaper");
var wallPaperDuJour = WallpaperAleatoire();
console.log(wallPaperDuJour);
elementWallpaper.style.backgroundImage = "url('Images/WallPaper/"+wallPaperDuJour+".jpg')"


function eclaircirCouleur(hex, pourcentage) {
    // Assurez-vous que la valeur du pourcentage est dans la plage de 0 à 100
    pourcentage = Math.min(100, Math.max(0, pourcentage));

    // Convertissez la valeur hexadécimale en composants RVB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Calculez les nouvelles valeurs RVB en fonction du pourcentage d'éclaircissement
    r = r + (255 - r) * (pourcentage / 100);
    g = g + (255 - g) * (pourcentage / 100);
    b = b + (255 - b) * (pourcentage / 100);

    // Convertissez les composants RVB modifiés en une valeur hexadécimale
    let nouvelleCouleur = `#${Math.round(r).toString(16)}${Math.round(g).toString(16)}${Math.round(b).toString(16)}`;

    return nouvelleCouleur;
}
function extraireCouleurPrincipale(imageURL) {
    const image = new Image();
    image.crossOrigin = "Anonymous"; // Assurez-vous que l'image peut être chargée en mode CORS
    image.src = imageURL;

    image.onload = function() {
        const colorThief = new ColorThief();
        const couleurDominante = colorThief.getColor(image);

        function rgbToHex(r, g, b) {
            // Ensure that the RGB values are within the valid range (0-255)
            r = Math.min(255, Math.max(0, r));
            g = Math.min(255, Math.max(0, g));
            b = Math.min(255, Math.max(0, b));
        
            // Convert each component to its hexadecimal representation and concatenate them
            const hexR = r.toString(16).padStart(2, '0'); // Convert to hex and ensure two characters
            const hexG = g.toString(16).padStart(2, '0');
            const hexB = b.toString(16).padStart(2, '0');
        
            // Combine the hexadecimal values
            return `#${hexR}${hexG}${hexB}`;
        }
        const root = document.documentElement;
        var exaColorPrimary = rgbToHex(couleurDominante[0],couleurDominante[1],couleurDominante[2])
        root.style.setProperty('--primarycolor', exaColorPrimary); // Changez la couleur principale

        var exaColorSecondary = eclaircirCouleur(exaColorPrimary,15);
        root.style.setProperty('--secondarycolor', exaColorSecondary); // Changez la couleur principale
    };
}

// Utilisation de la fonction
extraireCouleurPrincipale("Images/WallPaper/"+wallPaperDuJour+".jpg");

document.addEventListener('DOMContentLoaded', () =>
  requestAnimationFrame(updateTime)
)

function updateTime() {
    moment.locale('fr');
    document.documentElement.style.setProperty('--timer-day', "'" + moment().format("dd") + "'");
    document.documentElement.style.setProperty('--timer-hours', "'" + moment().format("k") + "'");
    document.documentElement.style.setProperty('--timer-minutes', "'" + moment().format("mm") + "'");
    requestAnimationFrame(updateTime);
}

function updateMaxHeightOfStickyNote()
{
    var maDivGauche = document.getElementById("sticky-note-Gauche");
    var maDivDroite = document.getElementById("sticky-note-Droite");

    if(maDivGauche.offsetHeight < maDivDroite.offsetHeight){
        var newSize = maDivDroite.offsetHeight - 40;
        maDivGauche.style.height = newSize+"px";
    }else{
        var newSize = maDivGauche.offsetHeight - 40;
        maDivDroite.style.height = newSize+"px";
    }
}

updateMaxHeightOfStickyNote()

$(window).resize(function() {
    updateMaxHeightOfStickyNote()
});