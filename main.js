const piano = document.getElementById("piano");


let instrument;
let pianoSample;

async function loadPianoSample() {
	pianoSample = await new Tone.Sampler({
		'C4': 'sounds/c4.mp3',	
		'E4': 'sounds/e4.mp3',	
		'A4': 'sounds/a4.mp3',
		'B4': 'sounds/b4.mp3',
		'C5': 'sounds/c5.mp3',	
		'E5': 'sounds/e5.mp3',	
		'G5': 'sounds/g5.mp3',
		'A5': 'sounds/a5.mp3',
	});
	instrument = pianoSample;
	instrument.toMaster();
	piano.style.display = 'flex';
	document.querySelector('.loading').style.display = 'none';
};

// const synth = new Tone.Synth();
// synth.oscillator.type = "sine";

loadPianoSample();


const keyHoldingList = {
	'z': false,
	's': false,
	'x': false,
	'd': false,
	'c': false,
	'v': false,
	'g': false,
	'b': false,
	'h': false,
	'n': false,
	'j': false,
	'm': false,
	'q': false,
	'2': false,
	'w': false,
	'3': false,
	'e': false,
	'r': false,
	'5': false,
	't': false,
	'6': false,
	'y': false,
	'7': false,
	'u': false,
	'i': false
};

const keyPitch = {
	'z': 'C4',
	's': 'C#4',
	'x': 'D4',
	'd': 'D#4',
	'c': 'E4',
	'v': 'F4',
	'g': 'F#4',
	'b': 'G4',
	'h': 'G#4',
	'n': 'A4',
	'j': 'A#4',
	'm': 'B4',
	'q': 'C5',
	'2': 'C#5',
	'w': 'D5',
	'3': 'D#5',
	'e': 'E5',
	'r': 'F5',
	'5': 'F#5',
	't': 'G5',
	'6': 'G#5',
	'y': 'A5',
	'7': 'A#5',
	'u': 'B5',
	'i': 'C6'
}

piano.addEventListener("mousedown", e => {
  // fires off a note continously until trigger is released
  instrument.triggerAttack(e.target.dataset.note);
  e.target.style.backgroundColor = e.target.nodeName === 'LI' ? '#ccc' : '#aaa';
});

piano.addEventListener("mouseup", e => {
  // stops the trigger
  instrument.triggerRelease(e.target.dataset.note);
  e.target.style.backgroundColor = e.target.nodeName === 'LI' ? '#fff' : '#000';
});

piano.addEventListener("mouseout", e => {
  // stops the trigger
  instrument.triggerRelease(e.target.dataset.note);
  e.target.style.backgroundColor = e.target.nodeName === 'LI' ? '#fff' : '#000';
});

// sustain pedal
const pedal = document.querySelector('#pedal');
let sustain = pedal.checked;

pedal.addEventListener('click', () => {
	sustain = pedal.checked;
});

// handles keyboard events
document.addEventListener("keydown", e => {
  // e object has the key property to tell which key was pressed
	let notePitch = keyPitch[e.key];

	if (!notePitch)
		return;

	// only trigger attack if it is not already holding
	if (!keyHoldingList[e.key]) {
		keyHoldingList[e.key] = true;
		instrument.triggerAttack(notePitch);
		const pressedKey = document.querySelector(`[data-note='${notePitch}']`);
		pressedKey.style.backgroundColor = pressedKey.nodeName === 'LI' ? '#ccc' : '#aaa';
	}
});
// when the key is released, audio is released as well
document.addEventListener("keyup", e => {
	let notePitch = keyPitch[e.key];
	if (notePitch) {
		keyHoldingList[e.key] = false;
		
		const pressedKey = document.querySelector(`[data-note='${notePitch}']`);
		pressedKey.style.backgroundColor = pressedKey.nodeName === 'LI' ? '#fff' : '#000';

		if (!sustain) {
			instrument.triggerRelease(notePitch);
		}
	}
  }
);
