function clock() {
    const dateDiv = document.getElementById('date');
    const clockDiv = document.getElementById('clock');

    const now = new Date();
    const date = now.toLocaleDateString("sv-SE", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    const time = now.toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit"
    });

    if (dateDiv) {
    dateDiv.textContent = date.charAt(0).toUpperCase() + date.slice(1);
    }
    
    clockDiv.textContent = time;
    
}
clock();
setInterval(clock, 1000);