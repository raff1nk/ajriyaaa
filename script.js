document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("backsound");
  var audioSource = document.getElementById("audio-source");
  var musicTitle = document.getElementById("music-title");

  // List of songs
  var songs = [
    { title: "Lifeline", src: "Lifeline.mp3" },
    { title: "Take Me On", src: "TakeMeOn.mp3" },
  ];
  var currentSongIndex = 0;

  // Function to change to the next song
  function changeSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0; // Go back to the first song if the list ends
    }
    audioSource.src = songs[currentSongIndex].src;
    musicTitle.innerHTML = songs[currentSongIndex].title + ' <button id="skip-button" onclick="skipMusic()">Skip Music</button>';
    audio.load(); // Load the new audio source
    audio.play(); // Start playing the new song
  }

  // Change song when the current one ends
  audio.addEventListener("ended", changeSong);

  // Function to skip music manually
  window.skipMusic = function () {
    changeSong();
  };

  document.body.addEventListener("click", function () {
    if (audio.paused) {
      audio.play().catch(function (error) {
        console.log("Autoplay prevented:", error);
      });
    }
    audio.muted = false;
  });

  // Function to handle login
  window.login = function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "teh ajriya c" && password === "c") {
      document.getElementById("login-section").classList.remove("active");
      document.getElementById("main-content").style.display = "block";
      updateBackground(1); // Set background for section 1
      audio.play(); // Ensure the music starts playing
    } else {
      document.getElementById("error-message").textContent = "Login salah!";
    }
  };

  // Function to navigate between sections
  window.navigate = function (direction, currentSection) {
    const sections = document.querySelectorAll(".section");
    sections[currentSection - 1].classList.remove("active"); // Hide the current section

    if (direction === "next") {
      currentSection++; // Move to the next section
    } else if (direction === "prev") {
      currentSection--; // Move to the previous section
    }

    // Check bounds
    if (currentSection < 1) {
      currentSection = 1; // Go to the first section
    } else if (currentSection > sections.length) {
      currentSection = sections.length; // Go to the last section
    }

    sections[currentSection - 1].classList.add("active"); // Show the new current section
    updateBackground(currentSection); // Update background for the new section
  };

  // Function to update background based on section
  function updateBackground(sectionNumber) {
    // You can customize the background for each section here
    // For example:
    document.body.style.backgroundColor = sectionNumber % 2 === 0 ? "#f0f0f0" : "#ffffff"; // Just an example
  }
});
