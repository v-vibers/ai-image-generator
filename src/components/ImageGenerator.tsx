import { useState } from 'react';
import { useSubscribeDev } from '@subscribe.dev/react';

type GenerationHistoryItem = {
  prompt: string;
  imageUrl: string;
  timestamp: number;
};

type StorageData = {
  history: GenerationHistoryItem[];
};

export function ImageGenerator() {
  const {
    client,
    usage,
    subscribe,
    subscriptionStatus,
    useStorage,
    signOut,
    user,
  } = useSubscribeDev();

  const [storageData, setStorageData, syncStatus] = useStorage!<StorageData>('image-generator-data', {
    history: [],
  });

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!client || !prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const { output } = await client.run('black-forest-labs/flux-schnell', {
        input: {
          prompt: prompt.trim(),
          width: 1024,
          height: 1024,
        },
      });

      const imageUrl = output[0] as string;
      setCurrentImage(imageUrl);

      // Save to history
      const newHistoryItem: GenerationHistoryItem = {
        prompt: prompt.trim(),
        imageUrl,
        timestamp: Date.now(),
      };

      setStorageData({
        history: [newHistoryItem, ...storageData.history].slice(0, 20), // Keep last 20
      });
    } catch (err: any) {
      if (err.type === 'insufficient_credits') {
        setError('Insufficient credits. Please upgrade your plan to continue.');
      } else if (err.type === 'rate_limit_exceeded') {
        const retryInSeconds = Math.ceil((err.retryAfter || 0) / 1000);
        setError(`Rate limit exceeded. Please try again in ${retryInSeconds} seconds.`);
      } else {
        setError('Failed to generate image. Please try again.');
      }
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading && prompt.trim()) {
      handleGenerate();
    }
  };

  return (
    <div className="generator-container">
      {/* Header */}
      <header className="generator-header">
        <div className="header-content">
          <div className="logo-section">
            <span className="logo-icon">🎨</span>
            <h1>AI Image Generator</h1>
          </div>

          <div className="user-section">
            <div className="credits-display">
              <span className="credits-label">Credits:</span>
              <span className="credits-value">{usage?.remainingCredits ?? 0}</span>
            </div>
            <div className="user-info">
              <span className="user-email">{user?.email}</span>
              <span className="plan-badge">
                {subscriptionStatus?.plan?.name ?? 'Free'}
              </span>
            </div>
            <button className="subscribe-button" onClick={subscribe!}>
              Upgrade
            </button>
            <button className="sign-out-button" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="generator-main">
        <div className="generator-workspace">
          {/* Input Section */}
          <div className="input-section">
            <div className="prompt-container">
              <input
                type="text"
                className="prompt-input"
                placeholder="Describe the image you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
              <button
                className="generate-button"
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
              >
                {loading ? 'Generating...' : 'Generate'}
              </button>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
                {error.includes('Insufficient credits') && (
                  <button className="error-action" onClick={subscribe!}>
                    Upgrade Now
                  </button>
                )}
              </div>
            )}

            <div className="sync-status">
              <span className={`sync-indicator ${syncStatus}`}>
                {syncStatus === 'syncing' && '🔄 Syncing...'}
                {syncStatus === 'synced' && '✅ Synced'}
                {syncStatus === 'local' && '💾 Local'}
                {syncStatus === 'error' && '❌ Sync Error'}
              </span>
            </div>
          </div>

          {/* Image Display */}
          <div className="image-display">
            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Creating your image...</p>
              </div>
            )}

            {!loading && currentImage && (
              <div className="image-result">
                <img src={currentImage} alt="Generated" className="generated-image" />
                <a
                  href={currentImage}
                  download="generated-image.png"
                  className="download-button"
                >
                  Download Image
                </a>
              </div>
            )}

            {!loading && !currentImage && !error && (
              <div className="empty-state">
                <div className="empty-icon">🖼️</div>
                <h3>Ready to Create</h3>
                <p>Enter a prompt above to generate your first AI image</p>
              </div>
            )}
          </div>
        </div>

        {/* History Sidebar */}
        {storageData.history.length > 0 && (
          <aside className="history-sidebar">
            <h2>Recent Generations</h2>
            <div className="history-list">
              {storageData.history.map((item, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => {
                    setCurrentImage(item.imageUrl);
                    setPrompt(item.prompt);
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.prompt}
                    className="history-thumbnail"
                  />
                  <div className="history-info">
                    <p className="history-prompt">{item.prompt}</p>
                    <span className="history-date">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}