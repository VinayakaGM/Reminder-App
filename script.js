function setReminder() {
  const day = document.getElementById("day").value;
  const time = document.getElementById("time").value;
  const activity = document.getElementById("activity").value;

  if (time) {
    const reminderTime = new Date();
    const [hours, minutes] = time.split(":");
    reminderTime.setHours(hours);
    reminderTime.setMinutes(minutes);
    reminderTime.setSeconds(0);

    const now = new Date();
    const currentDayIndex = now.getDay();
    const selectedDayIndex = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(day);

    let daysUntilReminder = (selectedDayIndex - currentDayIndex + 7) % 7;
    if (daysUntilReminder === 0 && reminderTime <= now) {
      daysUntilReminder = 7;
    }
    reminderTime.setDate(now.getDate() + daysUntilReminder);

    const timeToReminder = reminderTime - now;

    if (timeToReminder > 0) {
      setTimeout(function () {
        const chime = document.getElementById("chime");
        chime
          .play()
          .then(() => {
            alert(`Time for ${activity}`);
          })
          .catch((error) => {
            console.error("Failed to play sound:", error);
            alert(`Time for ${activity}`);
          });
      }, timeToReminder);
      alert(`Reminder set for ${activity} on ${day} at ${time}`);
    } else {
      alert("Please set a future time for the reminder.");
    }
  } else {
    alert("Please set a valid time.");
  }
}
