

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
    "Le travail acharné porte ses fruits.",
    "La positivité mène au progrès.",
    // Ajoutez autant de phrases que vous le souhaitez
];

function phraseMotivationAleatoire() {
    var index = Math.floor(Math.random() * phrasesMotivation.length);
    return phrasesMotivation[index];
}
function WallpaperAleatoire() {
    return index = Math.floor(Math.random() * 3);
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
        var exaColor = rgbToHex(couleurDominante[0],couleurDominante[1],couleurDominante[2])
        root.style.setProperty('--primarycolor', exaColor); // Changez la couleur principale
        console.log('Couleur principale :', couleurDominante);
    };
}

// Utilisation de la fonction
extraireCouleurPrincipale("Images/WallPaper/"+wallPaperDuJour+".jpg");

document.addEventListener('DOMContentLoaded', () =>
  requestAnimationFrame(updateTime)
)

function updateTime() {
  document.documentElement.style.setProperty('--timer-day', "'" + moment().format("dd") + "'");
  document.documentElement.style.setProperty('--timer-hours', "'" + moment().format("k") + "'");
  document.documentElement.style.setProperty('--timer-minutes', "'" + moment().format("mm") + "'");
  document.documentElement.style.setProperty('--timer-seconds', "'" + moment().format("ss") + "'");
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