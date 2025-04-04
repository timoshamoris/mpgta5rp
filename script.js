document.getElementById("processButton").addEventListener("click", function() {
    const scoreInput = document.getElementById("inputScores").value;
    const textInput = document.getElementById("inputText").value;
    const output = document.getElementById("output");

    if (!scoreInput.trim() || !textInput.trim()) {
        alert("Введите баллы и список тем!");
        return;
    }

    console.log("Полученные баллы:", scoreInput);
    console.log("Полученный текст:", textInput);

    // Разбираем баллы
    let scores = {};
    scoreInput.split(",").forEach(pair => {
        let [org, points] = pair.trim().split("-");
        if (org && points) scores[org.trim()] = parseInt(points.trim());
    });

    console.log("Обработанные баллы:", scores);

    // Обрабатываем текст
    let result = "";
    const regex = /Рассмотрено (\w+) \| ([\d.]+)[^|]*\| ["“](.*?)["”]/g;
    let match;

    while ((match = regex.exec(textInput)) !== null) {
        let [_, org, date, eventName] = match;
        if (org === "ESB") org = "Ballas"; // Заменяем ESB на Ballas
        if (!scores[org] || scores[org] >= 70) continue; // Пропускаем, если баллы >= 70

        console.log("Найдено:", { org, date, eventName });

        scores[org] += 1;
        result += `+**1** балл лидеру **${org}** | <@id> | ${date} | Организация мероприятия "${eventName}" | Баллы: **${scores[org]}**\n\n`;
    }

    console.log("Результат:", result);
    output.textContent = result || "Нет подходящих данных.";
});
