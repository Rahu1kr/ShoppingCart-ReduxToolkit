import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/app/store'
import { ToggleProvider, useTheme } from "./context/ThemeConvert"



const BodyThemeStyles = () => {
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [currentTheme]);

  // return null; 
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToggleProvider>
        <Provider store={store}>
        <BodyThemeStyles/>
          <App />
        </Provider>
      </ToggleProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
