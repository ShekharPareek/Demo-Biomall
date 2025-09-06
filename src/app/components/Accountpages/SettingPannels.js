import { useState } from 'react';
import { Switch } from '@headlessui/react';

const Toggle = ({ enabled, setEnabled }) => (
  <Switch
    checked={enabled}
    onChange={setEnabled}
    className={`${enabled ? 'bg-indigo-600' : 'bg-gray-300'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
  >
    <span
      className={`${enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
    />
  </Switch>
);

export default function SettingsPanels() {
  const [theme, setTheme] = useState('light');
  const [newMessages, setNewMessages] = useState(true);
  const [sounds, setSounds] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [smartReplies, setSmartReplies] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="flex flex-wrap gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Appearances Panel */}
      <div className="bg-white w-80 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Appearances</h2>
        <p className="mb-4 text-sm text-gray-600">Choose your display mode preference</p>
        {['light', 'dark', 'auto'].map(mode => (
          <label key={mode} className="flex items-center gap-3 mb-3 cursor-pointer">
            <input
              type="radio"
              name="theme"
              value={mode}
              checked={theme === mode}
              onChange={() => setTheme(mode)}
              className="accent-indigo-600"
            />
            <span className="capitalize text-gray-700">
              {mode === 'light' && '🌞 Light'}
              {mode === 'dark' && '🌙 Dark'}
              {mode === 'auto' && '🌓 Auto (sync with system)'}
            </span>
          </label>
        ))}
        <button className="mt-4 w-full bg-indigo-600 text-white rounded-lg py-2 font-medium hover:bg-indigo-700 transition">Apply</button>
      </div>

      {/* Chat Preferences Panel */}
      <div className="bg-white w-80 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Chat Preferences</h2>

        <div className="flex justify-between items-center mb-4">
          <span>Always open new messages</span>
          <Toggle enabled={newMessages} setEnabled={setNewMessages} />
        </div>

        <div className="flex justify-between items-center mb-4">
          <span>Sounds</span>
          <Toggle enabled={sounds} setEnabled={setSounds} />
        </div>

        <div className="flex justify-between items-center mb-4">
          <span>Show typing indicator</span>
          <Toggle enabled={typingIndicator} setEnabled={setTypingIndicator} />
        </div>

        <div className="flex justify-between items-center mb-4">
          <span>Enable smart replies</span>
          <Toggle enabled={smartReplies} setEnabled={setSmartReplies} />
        </div>

        <div className="flex justify-between items-center mt-6">
          <span>Font size</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setFontSize(f => Math.max(12, f - 1))} className="px-2 bg-gray-200 rounded">-</button>
            <span>{fontSize}px</span>
            <button onClick={() => setFontSize(f => f + 1)} className="px-2 bg-gray-200 rounded">+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
