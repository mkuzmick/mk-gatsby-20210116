import React from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

import SoundfontProvider from './SoundfontProvider';
import './styles.css';



const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
  first: MidiNumbers.fromNote('c3'),
  last: MidiNumbers.fromNote('c6'),
};

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});


const SimpleKeyboard = (props) => {
  let audioContext
  if (typeof window !== `undefined`) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return (
    <div style={{
      marginBottom: "20px"
    }}>
      <SoundfontProvider
    instrumentName="acoustic_grand_piano"
    audioContext={audioContext}
    hostname={soundfontHostname}
    render={({ isLoading, playNote, stopNote }) => (
      <Piano
        noteRange={noteRange}
        width={600}
        playNote={playNote}
        stopNote={stopNote}
        disabled={isLoading}
        keyboardShortcuts={keyboardShortcuts}
      />
    )}
  />
    </div>
  );
}

export default SimpleKeyboard


