Hyphenopoly.config({
    require: {
        "de": "FORCEHYPHENOPOLY"
    },
    exceptions: {
        "de": "Deutsch-lern-ende"
    },
    hyphen: "•",
    minWordLength: 3
});

var Separator = "•";

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
    });
}
