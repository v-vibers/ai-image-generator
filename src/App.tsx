import { useSubscribeDev } from '@subscribe.dev/react';
import { SignInScreen } from './components/SignInScreen';
import { ImageGenerator } from './components/ImageGenerator';
import './App.css';

function App() {
  const { isSignedIn, signIn } = useSubscribeDev();

  if (!isSignedIn) {
    return <SignInScreen signIn={signIn} />;
  }

  return <ImageGenerator />;
}

export default App;
