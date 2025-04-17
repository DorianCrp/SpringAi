import React, { useState } from 'react';
import './App.css';
import ChatComponent from './components/ChatComponent';
import RecipeGenerator from './components/RecipeGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>🧠 AI Playground</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          className={activeTab === 'chat' ? 'active' : ''}
          onClick={() => handleTabChange('chat')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: activeTab === 'chat' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'chat' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          💬 Chat with AI
        </button>

        <button
          className={activeTab === 'recipe-generator' ? 'active' : ''}
          onClick={() => handleTabChange('recipe-generator')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'recipe-generator' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'recipe-generator' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🍲 Generate a Recipe
        </button>
      </div>

      <div>
        {activeTab === 'chat' && <ChatComponent />}
        {activeTab === 'recipe-generator' && <RecipeGenerator />}
      </div>
    </div>
  );
}

export default App;
