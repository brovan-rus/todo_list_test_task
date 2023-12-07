import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import { MainPage } from './pages/MainPage';
import { TodoContextProvider } from './contexts/TodoContext';

function App() {
  return (
    <TodoContextProvider>
      <MainPage />
    </TodoContextProvider>
  );
}

export default App;
