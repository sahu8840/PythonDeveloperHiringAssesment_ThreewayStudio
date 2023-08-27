
const fileInput = document.getElementById('fileInput');
const fileTableBody = document.getElementById('fileTableBody');
let currentlyPlayingAudio;

fileInput.addEventListener('change', handleFileUpload);


// main function for requirements 1, 2, and 3
function handleFileUpload(event) {
    const files = event.target.files;
    fileTableBody.innerHTML = '';

    for (const file of files) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = file.name;
        row.appendChild(nameCell);

        const actionCell = document.createElement('td');
        const playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.className = 'playButton';
        playButton.addEventListener('click', () => playAudio(file));
        actionCell.appendChild(playButton);

        const stopButton = document.createElement('button');
        stopButton.textContent = 'Stop';
        stopButton.className = 'stopButton';
        stopButton.addEventListener('click', stopAudio);
        actionCell.appendChild(stopButton);

        row.appendChild(actionCell);
        fileTableBody.appendChild(row);
        checkDuration(file);
    }
}

// function to play Audio
function playAudio(file) {
    stopAudio();
    currentlyPlayingAudio = new Audio(URL.createObjectURL(file));
    currentlyPlayingAudio.play();
}

//function to stop audio
function stopAudio() {
    if (currentlyPlayingAudio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
    }
}

// function for requirements four to check if duration of audio is more than 10mins than it pop out warning
function checkDuration(file) {
    const audio = new Audio(URL.createObjectURL(file));
    audio.addEventListener('loadedmetadata', () => {
        if (audio.duration > 600) { // 600 seconds = 10 minutes
            warningContainer.style.display = 'block';
            setTimeout(() => {
                warningContainer.style.display = 'none';
            }, 3000);
        }
    });
}
