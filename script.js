function calculate() {
    var year = parseInt(document.getElementById('year').value);
    var week = parseInt(document.getElementById('week').value);
    var day = parseInt(document.getElementById('day').value);
    var fs = parseFloat(document.getElementById('sampling_frequency').value);
    var kilometers = parseFloat(document.getElementById('kilometers').value);
    var gauge = parseFloat(document.getElementById('gauge').value);
    var c = parseInt(document.querySelector('input[name="type"]:checked').value);

    // Vérifier si les valeurs sont négatives
    if (year < 0 || week < 0 || day < 0 || fs < 0 || kilometers < 0 || gauge < 0) {
        // Remettre les valeurs négatives à zéro
        document.getElementById('year').value = Math.max(0, year);
        document.getElementById('week').value = Math.max(0, week);
        document.getElementById('day').value = Math.max(0, day);
        document.getElementById('sampling_frequency').value = Math.max(0, fs);
        document.getElementById('kilometers').value = Math.max(0, kilometers);
        document.getElementById('meters').value = Math.max(0, meters);
        document.getElementById('gauge').value = Math.max(0, gauge);

        // Afficher une alerte à l'utilisateur
        alert("Les valeurs ne peuvent pas être négatives. Elles ont été réinitialisées à 0.");
        return;
    }

    // Continuer le calcul si aucune valeur n'est négative
    // Convertir les années en secondes (1 année = 365 jours = 86400 secondes)
    var totalSeconds = year * 365 * 24 * 60 * 60;
    // Supprimer les mois
    // Convertir les semaines en secondes (1 semaine = 7 jours = 604800 secondes)
    totalSeconds += week * 7 * 24 * 60 * 60;
    // Convertir les jours en secondes (1 jour = 24 heures = 86400 secondes)
    totalSeconds += day * 24 * 60 * 60;

    // Conversion de la somme des kilomètres et des mètres en mètres
    var distanceInMeters = kilometers * 1000;

    var result = distanceInMeters / gauge * fs * totalSeconds * c;

    var resultContainer = document.getElementById('result');
    resultContainer.innerHTML = formatBytes(result);
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Byte';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Sélection des champs de saisie
const yearInput = document.getElementById('year');
const weekInput = document.getElementById('week');
const dayInput = document.getElementById('day');
const samplingFrequencyInput = document.getElementById('sampling_frequency');
const kilometersInput = document.getElementById('kilometers');
const gaugeInput = document.getElementById('gauge');
const typeInputs = document.querySelectorAll('input[name="type"]');

// Ajout d'un écouteur d'événement input à chaque champ de saisie
yearInput.addEventListener('input', calculate);
weekInput.addEventListener('input', calculate);
dayInput.addEventListener('input', calculate);
samplingFrequencyInput.addEventListener('input', calculate);
kilometersInput.addEventListener('input', calculate);
gaugeInput.addEventListener('input', calculate);
typeInputs.forEach(input => {
    input.addEventListener('input', calculate);
});

