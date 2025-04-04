document.getElementById("findThemes").addEventListener("click", function() {
    let inputText = document.getElementById("inputText").value;
    let themesListDiv = document.getElementById("themesList");
    let themeItems = document.getElementById("themeItems");
    let outputDiv = document.getElementById("output");

    themeItems.innerHTML = "";
    outputDiv.innerHTML = "";
    themesListDiv.style.display = "none";

    // Улучшенное регулярное выражение
    let regex = /Рассмотрено\s+([A-ZА-ЯЁ]+)\s*\|\s*([\d]{1,2}[.\d]{1,2}[.\d]{2,4})[^|]*\|\s*["«](.+?)["»]/gi;
    let matches = [...inputText.matchAll(regex)];

    if (matches.length === 0) {
        alert("Не найдено ни одной темы!");
        return;
    }

    let foundThemes = [];
    
    matches.forEach(match => {
        let [_, faction, date, title] = match;
        faction = faction.toUpperCase();
        if (faction === "ESB") faction = "Ballas"; // Заменяем ESB на Ballas

        foundThemes.push({ faction, date, title });

        let li = document.createElement("li");
        li.textContent = `${faction} | ${date} | ${title}`;
        themeItems.appendChild(li);
    });

    themesListDiv.style.display = "block";

    document.getElementById("calculateScores").addEventListener("click", function() {
        let scoresInput = document.getElementById("scoresInput").value;
        let scores = {};
        
        scoresInput.split(",").forEach(entry => {
            let parts = entry.trim().split(" - ");
            if (parts.length === 2) scores[parts[0].toUpperCase()] = parseInt(parts[1]);
        });

        outputDiv.innerHTML = "<h2>Результаты:</h2>";

        foundThemes.forEach(theme => {
            if (!scores.hasOwnProperty(theme.faction) || scores[theme.faction] >= 70) return;

            scores[theme.faction] += 1;

            let result = `+**1** балл лидеру **${theme.faction}** | | ${theme.date} | Организация мероприятия "${theme.title}" | Баллы: **${scores[theme.faction]}**`;

            let p = document.createElement("p");
            p.innerHTML = result;
            outputDiv.appendChild(p);
        });
    });
});
