function parseText() {
    const inputText = document.getElementById('inputText').value;

    // Регулярные выражения для поиска
    const regex = /Рассмотрено\s([A-Za-zА-Яа-я]+)\s\|?\s(\d{1,2}\.\d{1,2}\.\d{4})\s(?:\d{2}:\d{2})?\s\|?\s(.+?)\s(?:Изменить|Выделить для модерации)/g;

    let match;
    let output = "<h2>Найденные темы:</h2>";
    const topics = [];

    // Массив для замены "ESB" на "Ballas"
    const organizationMapping = {
        "esb": "Ballas"
    };

    // Прокачаем все найденные темы
    while ((match = regex.exec(inputText)) !== null) {
        let org = match[1];
        let date = match[2];
        let title = match[3];

        // Заменяем ESB на Ballas
        if (organizationMapping[org.toLowerCase()]) {
            org = organizationMapping[org.toLowerCase()];
        }

        // Добавляем тему в список
        topics.push({ org, date, title });
    }

    // Если нет найденных тем
    if (topics.length === 0) {
        output = "<p>Нет подходящих данных.</p>";
        document.getElementById('output').innerHTML = output;
        return;
    }

    // Выводим найденные темы
    topics.forEach((topic, index) => {
        output += `
            <div class="topic">
                <p>Тема ${index + 1}: <strong>${topic.title}</strong></p>
                <p>Организация: <strong>${topic.org}</strong></p>
                <p>Дата: <strong>${topic.date}</strong></p>
                <label for="points${index}">Введите баллы для этой темы:</label>
                <input type="number" id="points${index}" min="0" value="0"><br><br>
            </div>
        `;
    });

    output += `<button onclick="calculatePoints()">Подсчитать баллы</button>`;

    // Выводим на страницу
    document.getElementById('output').innerHTML = output;
}

function calculatePoints() {
    let output = "<h2>Результаты:</h2>";
    const topics = document.querySelectorAll('.topic');

    topics.forEach((topic, index) => {
        const points = document.getElementById(`points${index}`).value;
        const org = topic.querySelector('strong').innerText;
        const title = topic.querySelector('p').innerText.split(':')[1].trim();
        const date = topic.querySelectorAll('p')[1].innerText.split(':')[1].trim();

        output += `
            <p>+1 балл лидеру **${org}** | <@id> | ${date} | Организация мероприятия "${title}" | Баллы: **${parseInt(points) + 1}**</p>
        `;
    });

    document.getElementById('output').innerHTML = output;
}
