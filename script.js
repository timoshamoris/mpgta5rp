document.getElementById("processButton").addEventListener("click", function() {
    let inputText = document.getElementById("inputText").value;
    let themesList = document.getElementById("themesList");
    let resultsDiv = document.getElementById("results");

    themesList.innerHTML = "";  
    resultsDiv.style.display = "none";  

    // Улучшенное регулярное выражение
    let regex = /Рассмотрено\s+([A-ZА-ЯЁ]+)\s*\|\s*([\d]{1,2}[.\d]{2,4})[^|]*\|\s*["«](.+?)["»]/gi;
    let matches = [...inputText.matchAll(regex)];

    if (matches.length === 0) {
        alert("Не найдено ни одной темы!");
        return;
    }

    let foundThemes = [];

    matches.forEach(match => {
        let [_, faction, date, title] = match;
        faction = faction.toUpperCase();
        if (faction === "ESB") faction = "Ballas";
        
        foundThemes.push({ faction, date, title });

        let li = document.createElement("li");
        li.textContent = `${faction} | ${date} | ${title}`;
        themesList.appendChild(li);
    });

    resultsDiv.style.display = "block";

    document.getElementById("calculateButton").addEventListener("click", function() {
        let scoresInput = document.getElementById("scoresInput").value;
        let scores = {};
        
        scoresInput.split(",").forEach(entry => {
            let parts = entry.trim().split(" - ");
            if (parts.length === 2) scores[parts[0].toUpperCase()] = parseInt(parts[1]);
        });

        let outputDiv = document.getElementById("output");
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
