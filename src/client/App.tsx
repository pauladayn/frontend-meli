import logo from "./assets/Logo_ML.png";
import searchIcon from "./assets/ic_Search.png";
import "./styles/main.scss";

function App() {
    // const handleLogin = async () => {
    //     if (process.env.NODE_ENV === "development") {
    //         const accessToken = process.env.ACCESS_TOKEN;
    //         console.log("Using hardcoded token in development:", accessToken);

    //         document.cookie = `access_token=${accessToken}; path=/; max-age=3600`;
    //         window.location.href = "/";
    //     } else {
    //         try {
    //             const response = await fetch(
    //                 "https://frontend-meli.onrender.com/auth/meli",
    //                 {
    //                     method: "GET",
    //                 }
    //             );
    //             const data = await response.json();
    //             console.log("data", data);

    //             if (data.redirectUrl) {
    //                 window.location.href = data.redirectUrl;
    //             }
    //         } catch (error) {
    //             console.error("error", error);
    //         }
    //     }
    // };

    return (
        <>
            <header className='header flex-wrap center'>
                <nav
                    className='navbar flex-wrap center'
                    aria-label='navegación principal'
                >
                    <div className='nav-content center'>
                        <a href='/' aria-label='Mercado Libre'>
                            <img src={logo} alt='Mercado Libre logo' title='Mercado Libre' />
                        </a>
                        <form action='' className='search' role='search' method="GET">
                            <label
                                htmlFor='search-input'
                                className='visually-hidden'
                            >
                                Buscar productos
                            </label>
                            <input
                              id="search-input"
                              name="search"
                              type='text'
                              placeholder='Nunca dejes de buscar'
                              autoComplete="off"
                            />
                            <button
                                className=''
                                aria-label='Buscar'
                                type='submit'
                            >
                                <img src={searchIcon} alt='' />
                            </button>
                        </form>
                    </div>
                </nav>
            </header>
            <main>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <p>columna 1</p>
                        </div>
                        <div className='col-6'>
                            <p>columna 2</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
