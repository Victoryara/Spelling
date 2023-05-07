// Define an array of words
const words = [	
{ word: "advantage", audio: "Words-Audio/AdvantageSpelling.m4a" },
{ word: "goalKeeper", audio: "Words-Audio/GoalSpelling.m4a" },
{ word: "intelligent", audio: "Words-Audio/IntelligentSpelling.m4a" },
{ word: "nature", audio: "Words-Audio/NatureSpelling.m4a" },
{ word: "resilient", audio: "Words-Audio/ResilientSpelling.m4a" },
{ word: "important", audio: "Words-Audio/ImportantSpelling.m4a" },
{ word: "amateur", audio: "Words-Audio/AmateurSpelling.m4a" },
{ word: "desire", audio: "Words-Audio/DesireSpelling.m4a" },
{ word: "gentleman", audio: "Words-Audio/GentlemanSpelling.m4a" },
{ word: "disappointed", audio: "Words-Audio/DisappointedSpelling.m4a" },
{ word: "excited", audio: "Words-Audio/ExcitedSpelling.m4a" },
{ word: "nature", audio: "Words-Audio/NatureSpelling.m4a" },
{ word: "reckless", audio: "Words-Audio/RecklessSpelling.m4a" },
 
];

// Get HTML elements
const wordAudio = document.getElementById("word-audio");
const playButton = document.getElementById("play-button");
const wordInput = document.getElementById("word-input");
const submitButton = document.getElementById("submit-button");
const feedbackText = document.getElementById("feedback-text");


const scoreText = document.getElementById("score");
scoreText.style.backgroundColor = "blue";
scoreText.style.padding = "20px";
scoreText.style.textAlign = "center";
scoreText.style.marginTop = "80px"


// Initialize game variables
let currentWordIndex = 0;
let score = 0;

// Shuffle the words array
shuffle(words);

// Play the audio file when the play button is clicked
playButton.addEventListener("click", function() {
	wordAudio.src = words[currentWordIndex].audio;
	wordAudio.play();
});


function showPopup(feedbackMessage) {
	// Create the popup container element
	const popupContainer = document.createElement("div");
	popupContainer.classList.add("popup-container");
  
	// Create the popup content element
	const popupContent = document.createElement("div");
	popupContent.classList.add("popup-content");
	popupContent.innerText = feedbackMessage;
  
	// Add the popup content to the container
	popupContainer.appendChild(popupContent);
  
	// Add the popup container to the page
	document.body.appendChild(popupContainer);
  
	// Set a timeout to remove the popup after 5 seconds
	setTimeout(function() {
	  popupContainer.remove();
	}, 5000);
  }
  

// Check the answer when the submit button is clicked
submitButton.addEventListener("click", function() {
	const answer = wordInput.value.toLowerCase().trim();
	const correctAnswer = words[currentWordIndex].word.toLowerCase();

	
	if (answer === "") {
		// If the answer is empty, show feedback
		showPopup("Please, type in an answer!")
	}
	else if (answer === correctAnswer) {
		// If the answer is correct, increase the score and show feedback
		score++;
		showPopup("Correct!")
		feedbackText.innerText = " ";
		scoreText.innerText = "Score: " + score;

		// Move to the next word if the player has answered 1 words correctly
		if (score % 1 === 0) {
			currentWordIndex++;
			if (currentWordIndex >= words.length) {
				currentWordIndex = 0;
				shuffle(words);
			}
			wordAudio.src = words[currentWordIndex].audio;
		}

		// Clear the input field
		wordInput.value = "";
	}
	else {
	// If the answer is incorrect, show feedback in a popup
	const finalScore = score;
	const correctAnswerText = `The correct spelling is "${correctAnswer}".`;
	showPopup(`Your final score is ${finalScore}. ${correctAnswerText} `);

	// Reset the game
	currentWordIndex = 0;
	score = 0;
	shuffle(words);
	wordAudio.src = words[currentWordIndex].audio;
	scoreText.innerText = "Score: 0";

	
	// Clear the input field
	 wordInput.value = "";
	}
});


// Shuffle the array using Fisher-Yates algorithm
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
