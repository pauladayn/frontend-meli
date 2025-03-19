import logo from "./assets/Logo_ML.png";
import searchIcon from "./assets/ic_Search.png";
import shippingIcon from "./assets/ic_shipping.png";
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

    const emptyArray = Array.from(new Array(5).fill(0));
    return (
        <>
            <header className='header flex-wrap center'>
                <nav
                    className='navbar flex-wrap center m-auto'
                    aria-label='navegación principal'
                >
                    <div className='nav-content center m-auto'>
                        <a href='/' aria-label='Mercado Libre'>
                            <img
                                src={logo}
                                alt='Mercado Libre logo'
                                title='Mercado Libre'
                            />
                        </a>
                        <form
                            action=''
                            className='search'
                            role='search'
                            method='GET'
                        >
                            <label
                                htmlFor='search-input'
                                className='visually-hidden'
                            >
                                Buscar productos
                            </label>
                            <input
                                id='search-input'
                                name='search'
                                type='text'
                                placeholder='Nunca dejes de buscar'
                                autoComplete='off'
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
                    <div className='py-md breadcrumb'>
                        breadcrumb de categorias = tuki = tuki = tuki
                    </div>
                    <div className='row'>
                        {emptyArray.map((_, index) => (
                            <div className='col-10 my-md' key={index}>
                                <div className='d-flex'>
                                    <div className='mx-md'>
                                        imagen
                                        <img
                                            src=''
                                            alt=''
                                            style={{
                                                height: "auto",
                                                verticalAlign: "middle",
                                            }}
                                        />
                                    </div>
                                    <div
                                        className='d-flex'
                                        style={{ flexDirection: "column" }}
                                    >
                                        <div className='d-flex'>
                                            <div
                                                className='d-flex'
                                                style={{ flexGrow: 2, alignItems: 'center', gap: '.5rem' }}
                                            >
                                                <h3
                                                    className='mr-sm'
                                                    style={{
                                                        margin: 0,
                                                        lineHeight: "1.25rem",
                                                    }}
                                                >
                                                    precio y logo $1980
                                                </h3>
                                                <img
                                                    style={{
                                                        verticalAlign: "middle",
                                                        width: "16px",
                                                        height: '16px'
                                                    }}
                                                    src={shippingIcon}
                                                    alt=''
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    style={{
                                                        marginLeft: "auto",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    ubicacion
                                                </p>
                                            </div>
                                        </div>
                                        <div className='mt-xl row'>
                                            <div className='col-5'>
                                                <p style={{ fontSize: "18px" }}>
                                                    nombre de articulo Lorem
                                                    ipsum dolor sit amet
                                                    consectetur adipisicing
                                                    elit. Fugiat temporibus
                                                    perferendis, dignissimos
                                                    esse amet reprehenderit
                                                    consectetur nam culpa
                                                    recusandae, repellendus
                                                    porro. Illum aliquam ullam
                                                    praesentium repellat
                                                    quisquam hic, illo laborum?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
