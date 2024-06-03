console.log('Hallo')

const progressBar = document.querySelector('#progressBar')
const progressBar2 = document.querySelector('#progressBar2')
const etenKnop = document.querySelector('#eten-knop')
const trainenKnop = document.querySelector('#trainen-knop')
const steroidsKnop = document.querySelector('#steroids-knop')
const afbeeldingSkinny = document.querySelector('#skinny')
const koptekstUpdate = document.querySelector('#koptekst')
const steroidsAfbeelding = document.querySelector('#steroids-knop')
const meldingUpdate = document.querySelector('#melding')
const trainenAudio = document.querySelector('#trainen-audio')
const etenAudio = document.querySelector('#eten-audio')
const legendAudio = document.querySelector('#legend-audio')
// het selecteren van de elementen ^

//PROGRESSBAR voor functie 'trainen'
let health = 0
let energy = 0
let steroidsGebruikt = false

//hier onder: PROGRESSBAR voor functie 'trainen' 

function trainen() {
    if (progressBar2.value >= 50) {
        health = health + 5
        progressBar.value = health

        if (health > 100) {
            health = 100
        }
        trainenAudio.play()

        updateImage()
    } else {
        console.log('Energy moet minimaal 50 zijn om te trainen')

        if (progressBar2.value < 50) {
            meldingUpdate.textContent = 'Jack heeft niet genoeg energie om te trainen...'

            const delay = 1000
            setTimeout(function () {
                meldingUpdate.textContent = '.'

            }, delay)
            // Bron setTimeout: (Sitepoint, 2023): https://www.sitepoint.com/delay-sleep-pause-wait/
        }
    }
}

//Functie voor het leeglopen van de progressbar van 'trainen'
function leegHealthbar() {
    progressBar.value = health

    if (health > 0 && health < 100) {
        health = health - 1
    }

    updateImage()

}

//PROGRESSBAR voor functie 'eten'
function eten() {
    energy = energy + 15
    progressBar2.value = energy
    etenAudio.play()

    if (energy > 100) {
        energy = 100
    }
}

//functie voor het leeglopen van de progressbar van 'eten'
function leegEnergybar() {
    energy = energy - 1
    progressBar2.value = energy

    if (energy < 0) {
        energy = 0
    }
}
//Met deze functie wordt het poppetje aangepast per verschillende waarde van de progressbar van 'trainen'
function updateImage() {
    if (!steroidsGebruikt) { //Bron: docent
        if (health <= 33) {
            afbeeldingSkinny.src = 'images/skinny.png'
            console.log('health is 25 of minder. Toon skinny.png')
        }

        else if (health > 33 && health <= 66) {
            afbeeldingSkinny.src = 'images/gespierd.png'
            console.log('health is tussen 25 en 50. Toon gespierd.png')
        }
        else if (health > 66) {
            afbeeldingSkinny.src = 'images/huge.png'
            console.log('health is tussen 50 en 75. Toon huge.png')
        }
    }

    if (health === 100) {
        steroidsKnop.classList.add('enabled');
    } else {
        steroidsKnop.classList.remove('enabled');
    }

    veranderTekst();
}

//Functie van het veranderen van de weergegeven tekst bij verschillende acties in het spel
function veranderTekst() {
    if (steroidsGebruikt) {
        koptekstUpdate.textContent = 'Gefeliciteerd, je hebt gewonnen! Jack is jacked!'
        koptekstUpdate.classList.add('win-tekst')
    }
    else if (health === 100) {
        koptekstUpdate.textContent = 'Natuurlijke limiet is bereikt. Het is tijd voor steroids!'
        console.log('Health is 100. Verander koptekst')
    }
    else {
        koptekstUpdate.textContent = 'Dit is Jack, kan jij Jack jacked maken?'
    }
}

//Functie die gaat over het klikken van de steroids knop en alle veranderingen die optreden bij het winnen van de game.
function gebruikSteroids() {
    // alleen als health 100 en energie 100
    if (health === 100) {
        afbeeldingSkinny.src = 'images/monster.png'
        steroidsGebruikt = true
        console.log('Health is 100. Het is tijd voor steroids')
        koptekstUpdate.textContent = 'Gefeliciteerd, je hebt gewonnen! Jack is jacked!'


        legendAudio.play()
        legendAudio.currentTime = 59.75
        // Bron voor audio: (ChatGPT 3.5, 2024): https://chatgpt.com/share/03581425-6c86-4f32-940c-eb1333c9c0eb 

        trainenKnop.src = 'images/restart.png'
        trainenKnop.removeEventListener('click', trainen)
        trainenKnop.addEventListener('click', restartGame)
        // door de remove en add eventlistener verander je het gedrag van de knop, waardoor de pagina herlaad wanneer de trainen-knop wordt ingedrukt
    }

}

function restartGame() {
    location.reload()
}
// ^ Met deze functie wordt de pagina herladen, bron: https://www.w3schools.com/jsref/met_loc_reload.asp 

setInterval(leegHealthbar, 125)
setInterval(leegEnergybar, 75)
//de 100 staat voor miliseconde, per 100ms wordt dus de functie leeghealthbar uitgevoerd

trainenKnop.addEventListener('click', trainen)
etenKnop.addEventListener('click', eten)
steroidsKnop.addEventListener('click', gebruikSteroids)
restartKnop.addEventListener('click', restartGame)








