interface SignInScreenProps {
  signIn: () => void;
}

export function SignInScreen({ signIn }: SignInScreenProps) {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-section">
          <div className="logo-icon">🎨</div>
          <h1>AI Image Generator</h1>
          <p className="tagline">Transform your ideas into stunning visuals with AI</p>
        </div>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <div>
              <h3>Lightning Fast</h3>
              <p>Generate images in seconds</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <div>
              <h3>High Quality</h3>
              <p>Professional-grade results</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">💾</span>
            <div>
              <h3>Cloud Storage</h3>
              <p>Access your images anywhere</p>
            </div>
          </div>
        </div>

        <button className="sign-in-button" onClick={signIn}>
          Sign In to Get Started
        </button>

        <p className="auth-footer">
          Free tier available • No credit card required
        </p>
      </div>
    </div>
  );
}