import "./App.css";
import { useState } from "react";
import reactLogo from "./assets/react.svg";

function App() {
    const [count, setCount] = useState(0);

    const handleLogin = async () => {
      if (process.env.NODE_ENV === "development") {
          const accessToken = process.env.ACCESS_TOKEN;
          console.log('Using hardcoded token in development:', accessToken);
  
          document.cookie = `access_token=${accessToken}; path=/; max-age=3600`;
          window.location.href = '/';
      } else {
          try {
              const response = await fetch('https://frontend-meli.onrender.com/auth/meli', {
                  method: 'GET',
              });
              const data = await response.json();
              console.log('data', data);
  
              if (data.redirectUrl) {
                  window.location.href = data.redirectUrl;
              }
          } catch (error) {
              console.error('error', error);
          }
      }
  };

    return (
        <>
            <div>
                <a href='https://vite.dev' target='_blank'>
                    <img src='/vite.svg' className='logo' alt='Vite logo' />
                </a>
                <a href='https://reactjs.org' target='_blank'>
                    <img
                        src={reactLogo}
                        className='logo react'
                        alt='React logo'
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs'>
                Click on the Vite and React logos to learn more
            </p>
            <button onClick={handleLogin}>Login with Mercado Libre</button>
        </>
    );
}

export default App;
