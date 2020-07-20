const display = document.querySelector('.spoken');

let listening = false;
const recognitionDelay = 150;

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const commands = ['left', 'right', 'up', 'down'];

const grammar = `#JSGF V1.0; grammar phrase;`;
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.start();
listening = true;

recognition.onresult = (event) => {
  recognition.stop();
  listening = false;

  const text = event.results[0][0].transcript;
  display.innerHTML += `${text} `;

  console.log('SpeechRecognition.onresult');
  console.log(event.results[0][0]);

  setTimeout(startRecognition, recognitionDelay);
};

recognition.onspeechend = () => {
  recognition.stop();
  //   testBtn.disabled = false;
  //   testBtn.textContent = 'Start new test';
};

recognition.onerror = (event) => {
  //   testBtn.disabled = false;
  //   testBtn.textContent = 'Start new test';
  //   diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
};

recognition.onaudiostart = (event) => {
  //Fired when the user agent has started to capture audio.
  console.log('SpeechRecognition.onaudiostart');
};

recognition.onaudioend = (event) => {
  //Fired when the user agent has finished capturing audio.
  console.log('SpeechRecognition.onaudioend');
};

recognition.onend = (event) => {
  //Fired when the speech recognition service has disconnected.
  console.log('SpeechRecognition.onend');
  listening = false;
  setTimeout(startRecognition, recognitionDelay);
};

recognition.onnomatch = (event) => {
  //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
  console.log('SpeechRecognition.onnomatch');
};

recognition.onsoundstart = (event) => {
  //Fired when any sound — recognisable speech or not — has been detected.
  console.log('SpeechRecognition.onsoundstart');
};

recognition.onsoundend = (event) => {
  //Fired when any sound — recognisable speech or not — has stopped being detected.
  console.log('SpeechRecognition.onsoundend');
};

recognition.onspeechstart = (event) => {
  //Fired when sound that is recognised by the speech recognition service as speech has been detected.
  console.log('SpeechRecognition.onspeechstart');
};
recognition.onstart = (event) => {
  //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
  console.log('SpeechRecognition.onstart');
};

// recognition.onspeechend = () => {
//   recognition.stop();

//   setTimeout(startRecognition, recognitionDelay);
// };

function startRecognition() {
  if (listening == false) {
    recognition.start();
    listening = true;
  }
}

// code loop
setInterval(() => {
  startRecognition();
}, recognitionDelay);
