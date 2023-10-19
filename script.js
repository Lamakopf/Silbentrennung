const Separator = "•";

const Hyphenopoly = {
    "require": {
        "de": "FORCEHYPHENOPOLY"
    },
    "setup": {
        "exceptions": {
            "global": ""
        },
        "selectors": {
            ".hyphenate": {
                "hyphen": Separator,
                "minWordLength": 3
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const inputTextElement = document.getElementById('inputText');
    const outputElement = document.getElementById('output');
    const splitButtonElement = document.getElementById('splitButton');
    const colorSchemeElement = document.getElementById('colorScheme');

    splitButtonElement.addEventListener('click', function() {
        const inputText = inputTextElement.value;

        fetch('/split-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: inputText
            })
        })
        .then(response => response.json())
        .then(data => {
            let output = '';
            let colorToggle = true; // Start with blue
            const splitWords = data.splitWords;
            const colorScheme = colorSchemeElement.value;
            const colors = {
                highContrast: {
                    blue: 'blue',
                    red: 'red'
                },
                classicColors: {
                    blue: '#1A4B83',
                    red: '#C34D47'
                }
            };
            const currentColors = colors[colorScheme];

            for (const word of splitWords) {
                const syllables = word.split('-');
                for (let i = 0; i < syllables.length; i++) {
                    const colorClass = colorToggle ? currentColors.blue : currentColors.red;
                    output += `<span style="color:${colorClass}">${syllables[i]}</span>`;
                    if (i < syllables.length - 1 || /[.,!?;:]$/.test(syllables[i])) {
                        colorToggle = !colorToggle;
                    }
                }
                colorToggle = true;
                output += ' ';
            }

            outputElement.innerHTML = output;
        });
    });
});
