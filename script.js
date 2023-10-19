
    Hyphenopoly.config({
        require: {
            "de": "FORCEHYPHENOPOLY"
        },
        hyphen: "•",
        minWordLength: 3
    });


var Separator = "•";

var Hyphenopoly = {
    "require": {
        "de": "FORCEHYPHENOPOLY"
    },
    "setup": {
        "exceptions": {
            "global": "Deutsch-ler-nen-de"
        },
        "selectors": {
            ".hyphenate": {
                "hyphen": Separator,
                "minWordLength": 3
            }
        }
    }
}

function splitAndDisplay() {
    const inputText = document.getElementById('inputText').value;
    const colorScheme = document.getElementById('colorScheme').value;

    // Define color mappings
    const colorMappings = {
        "highContrast": {
            "blue": "#0000FF",
            "red": "#FF0000"
        },
        "classicColors": {
            "blue": "#005996",
            "red": "#96000e"
        }
    };

    // Get the selected colors
    const selectedColors = colorMappings[colorScheme];

    Hyphenopoly.hyphenators["de"].then((hyphenator) => {
        let output = '';
        let colorToggle = true;  // Always start with blue

        const splitWords = inputText.split(' ');

        for (const word of splitWords) {
            const syllables = hyphenator(word, { hyphen: Separator }).split(Separator);
            for (let i = 0; i < syllables.length; i++) {
                // If the syllable is a punctuation mark, make it blue
                if (/[.,!?;:]/.test(syllables[i])) {
                    output += `<span style="color:${selectedColors.blue}">${syllables[i]}</span>`;
                } else {
                    const color = colorToggle ? selectedColors.blue : selectedColors.red;
                    output += `<span style="color:${color}">${syllables[i]}</span>`;
                    // Toggle the color if there's another syllable after the current one
                    if (i < syllables.length - 1) {
                        colorToggle = !colorToggle;
                    }
                }
            }

            // Reset color toggle to always start the next word with blue
            colorToggle = true;
            // output += ' ';  // Add a space after each word
        }

        document.getElementById('output').innerHTML = output.trim();  // Remove trailing space
    });
}


function splitAndDisplay() {
    const inputText = document.getElementById('inputText').value;
    fetch('/split-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText })
    })
    .then(response => response.json())
    .then(data => {
        let output = '';
        let colorToggle = true;  // Always start with blue

        const splitWords = data.splitWords;

        for (const word of splitWords) {
            const syllables = word.split('-');
            for (let i = 0; i < syllables.length; i++) {
                // If the syllable is a punctuation mark, make it blue
                if (/[.,!?;:]/.test(syllables[i])) {
                    output += `<span class="blue">${syllables[i]}</span>`;
                } else {
                    const colorClass = colorToggle ? 'blue' : 'red';
                    output += `<span class="${colorClass}">${syllables[i]}</span>`;
                    // Toggle the color if there's another syllable after the current one
                    if (i < syllables.length - 1) {
                        colorToggle = !colorToggle;
                    }
                }
            }

            // Reset color toggle to always start the next word with blue
            colorToggle = true;

            output += ' ';
        }

        document.getElementById('output').innerHTML = output;
    });
}



