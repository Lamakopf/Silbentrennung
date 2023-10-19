Hyphenopoly.config({
    require: {
        "de": "FORCEHYPHENOPOLY"
    },
    exceptions: {
        "de": "Deutsch-lern-ende"
    },
    hyphen: "•",
    minWordLength: 3,
    setup: {
        hide: "none"  // Deaktiviert das automatische Verstecken von Elementen beim Laden
    }
});

var Separator = "•";

function splitAndDisplay() {
    const inputText = document.getElementById('inputText').value;
    let output = '';
    let colorToggle = true;  // Always start with blue

    const words = inputText.split(' ');

    for (const word of words) {
        const syllables = word.split('•');  // Trennzeichen von Hyphenopoly
        for (let i = 0; i < syllables.length; i++) {
            if (/[.,!?;:]/.test(syllables[i])) {
                output += `<span class="blue">${syllables[i]}</span>`;
            } else {
                const colorClass = colorToggle ? 'blue' : 'red';
                output += `<span class="${colorClass}">${syllables[i]}</span>`;
                if (i < syllables.length - 1) {
                    colorToggle = !colorToggle;
                }
            }
        }
        output += ' ';  // Add a space after each word
        colorToggle = true;  // Reset color toggle to always start the next word with blue
    }
    document.getElementById('output').innerHTML = output.trim();
}
