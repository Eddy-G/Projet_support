const root = document.documentElement;
var exaColorPrimary;
var exaColorSecondary;
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

    $('.LogoAndToolTip').hover(
        function() {
            // Code exécuté lorsqu'on survole l'image
            $(this).css('background-color', exaColorPrimary);   
            $(this).css('border-width', 'thick');
            $(this).css('border-radius', '20px');  
            $(this).css('cursor', 'pointer'); 
        },
        function() {
            // Code exécuté lorsque l'on quitte le survol de l'image
            $(this).css('background-color', '');
            $(this).css('border-width', '');
            $(this).css('border-radius', '');
            $(this).css('cursor', ''); 
        }
    );
    $(".LogoAndToolTip").on( "click", function() {
        window.location.href = this.childNodes[3].href;
    });
    $(".LogoAndToolTip").mousedown(function(event) {
        // Vérifiez si le bouton de la souris est le bouton du milieu (bouton 2)
        if (event.which === 2) {
            e.preventDefault();
            window.open(this.childNodes[3].href,"_blank");        
        }
    });
});


var phrasesMotivation = [
    "La persévérance est la clé du succès.",
    "Chaque jour est une nouvelle opportunité.",
    "Rien n'est impossible si vous y croyez.",
    "La positivité mène au progrès.",
    "Le meilleur moyen de prévoir le futur, c’est de le créer.",
    "J’aime l’impossible. La concurrence y est moins rude.",
    "Les erreurs sont les portes de la découverte.",
    // Ajoutez autant de phrases que vous le souhaitez
];

function phraseMotivationAleatoire() {
    var index = Math.floor(Math.random() * phrasesMotivation.length);
    return phrasesMotivation[index];
}
function WallpaperAleatoire() {
    return index = Math.floor(Math.random() * 7);
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
elementWallpaper.style.backgroundImage = "url('Images/WallPaper/"+wallPaperDuJour+".webp')"


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
        exaColorPrimary = rgbToHex(couleurDominante[0],couleurDominante[1],couleurDominante[2])
        root.style.setProperty('--primarycolor', exaColorPrimary); // Changez la couleur principale

        exaColorSecondary = eclaircirCouleur(exaColorPrimary,15);
        root.style.setProperty('--secondarycolor', exaColorSecondary); // Changez la couleur principale
    };
}

// Utilisation de la fonction
extraireCouleurPrincipale("Images/WallPaper/"+wallPaperDuJour+".webp");

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


document.addEventListener('DOMContentLoaded', () => {
const table = document.getElementById('TableToExport');

// Chemin relatif vers votre fichier Excel
const excelFilePath = 'Excel.xlsx';

// Charger le fichier Excel à partir du chemin
fetch(excelFilePath)
    .then(response => response.blob())
    .then(blob => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const dataArr = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Créez le tableau HTML et affichez les données
            const headerRow = dataArr[0];
            let htmlTable = '<thead><tr class="row100 head">';
            let count = 1;
            for (let header of headerRow) {
                if(header == null){header = ""}
                if(count == 1){
                    htmlTable += `<th class="column100 column`+count+`" data-column="column`+count+`" style="border-radius:25px 0 0 0">${header}</th>`;
                }else if (count == headerRow.length){
                    htmlTable += `<th class="column100 column`+count+`" data-column="column`+count+`" style="border-radius:0 25px 0 0">${header}</th>`;
                }else{
                    htmlTable += `<th class="column100 column`+count+`" data-column="column`+count+`">${header}</th>`;
                }                
                count++;
            }
            htmlTable += '</tr></thead><tbody>';            
            for (let i = 1; i < dataArr.length; i++) {
                count = 1;
                htmlTable += '<tr class="row100">';
                for (let cell of dataArr[i]) {
                    if(i+1 == dataArr.length){
                        if(count==1){
                            htmlTable += `<td class="column100 column`+count+`" data-column="column`+count+`" style="border-radius:0 0 0 25px">${cell}</td>`;
                        }else if(count == dataArr[i].length){
                            htmlTable += `<td class="column100 column`+count+`" data-column="column`+count+`" style="border-radius:0 0 25px 0">${cell}</td>`;
                        }else{
                            htmlTable += `<td class="column100 column`+count+`" data-column="column`+count+`">${cell}</td>`;
                        }
                    }else{
                        htmlTable += `<td class="column100 column`+count+`" data-column="column`+count+`">${cell}</td>`;
                    }                    
                    count++;
                }
                htmlTable += '</tr>';
            }
            htmlTable += '</tbody>';

            table.innerHTML = htmlTable;
        };
        reader.readAsBinaryString(blob);
    })
    .catch(error => {
        console.error('Erreur de chargement du fichier Excel :', error);
    });
});