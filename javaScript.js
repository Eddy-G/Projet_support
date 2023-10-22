const root = document.documentElement;
var exaColorPrimary;
var exaColorSecondary;
const themeFilePath = 'themes.csv';
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


$(document).ready(function() {
    
    // Charge un theme aléatoir en fonction du fichier csv
    $.get(themeFilePath, function(data) {
        var lines = data.split('\n');
        var arrValues = [];
        lines.forEach(function(line) {
            arrValues.push(line.split(','));                                                        
        });
        var index = Math.floor(Math.random() * 7);
        //var elementWallpaper = document.getElementById("wallpaper");
        //elementWallpaper.style.backgroundImage = "url('Images/WallPaper/"+arrValues[index][0]+".webp')"
        root.style.setProperty('--imgBackGround', 'url("Images/WallPaper/'+arrValues[index][0]+'.webp")');
        root.style.setProperty('--primarycolor', arrValues[index][1]); 
        root.style.setProperty('--secondarycolor', arrValues[index][2]); 
    });

    // Détect la touche "Enter" du clavier, qui lance ensuite une recherche google en fonction de la saisie dans la search bar
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

    // Animation sur les icones au passage de la sourie
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

    // Action click sur les icones
    $(".LogoAndToolTip").on( "click", function() {
        window.location.href = this.childNodes[3].href;
    });

    // Action click molette sur les icones
    $(".LogoAndToolTip").mousedown(function(event) {
        // Vérifiez si le bouton de la souris est le bouton du milieu (bouton 2)
        if (event.which === 2) {
            e.preventDefault();
            window.open(this.childNodes[3].href,"_blank");        
        }
    });
});

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

    function phraseMotivationAleatoire() {
        var index = Math.floor(Math.random() * phrasesMotivation.length);
        return phrasesMotivation[index];
    }
    // Récupérez l'élément HTML où vous souhaitez afficher la phrase de motivation
    var elementMotivation = document.getElementById("motivation");
    // Appel de la fonction pour obtenir une phrase de motivation aléatoire
    var phraseDuJour = phraseMotivationAleatoire();
    
    // Insérez la phrase de motivation dans l'élément HTML
    elementMotivation.textContent = phraseDuJour;
});





