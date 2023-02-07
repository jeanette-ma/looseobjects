window.addEventListener("load", function () {

    displayAllEvents();
    onSelectEvent();

});

async function onSelectEvent() {
    const selectBox = document.getElementById("events-select");
    selectBox.addEventListener("change", async function () {
        const response = await fetch(`./getInfo?eventId=${selectBox.value}`);
        const event = await response.json();
        displayEventInfo(event);
        updateFormSubmit(selectBox.value);
    });
};

async function displayAllEvents() {
    const eventsBox = document.getElementById("events-select");

    const response = await fetch(`./getNewEvents`);
    const jsonArray = await response.json();

    jsonArray.forEach(data => {
        eventsBox.innerHTML +=
            `<option value="${data.id}"> ${data.wfCode} ${data.wtgId} - ${data.time} - ${data.soundType}</option>`;
    });

};

async function displayEventInfo(event) {
    const infoTable = document.getElementById("info");

    infoTable.innerHTML =
        `<tr>
            <th scope="row">Wind Farm</th>
            <td>${event.wfCode} - ${event.wfName}</td>
        </tr>
        <tr>
            <th scope="row">Turbine</th>
            <td>${event.wtgId}</td>
        </tr>
        <tr>
            <th scope="row">Date and Time</th>
            <td>${event.datetime}</td>
        </tr>
        <tr>
            <th scope="row">Duration (seconds)</th>
            <td>${event.durationSec}</td>
        </tr>
        <tr>
            <th scope="row">Classified as</th>
            <td>${event.soundType}</td>
        </tr>
        <tr>
            <th scope="row">Accuracy of Classfication (%)</th>
            <td>${event.accuracyPC}</td>
        </tr>`
};

async function updateFormSubmit(selectedEventId) {
    const eventIdInput = document.getElementById("eventId");
    eventIdInput.setAttribute("value", selectedEventId);
    eventIdInput.getAttribute("disabled");

    const decisionButtons = document.querySelectorAll(".process");

    decisionButtons.forEach(button => {
        button.removeAttribute("disabled");
    });
};


