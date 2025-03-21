import React from "react";
import { useSearch } from "../../hooks/useSearch";

const Header = ({ query }: { query: string }) => {
    const { search, setSearch, handleSearch } = useSearch({ delay: 300, query });
console.log('query', query)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <header className='header flex-wrap center'>
            <nav
                className='navbar flex-wrap center m-auto'
                aria-label='navegacion principal'
            >
                <div className='nav-content center m-auto'>
                    <a href='/' aria-label='Mercado Libre'>
                        <img
                            src='/public/assets/Logo_ML.png'
                            alt='Mercado Libre logo'
                            title='Mercado Libre'
                        />
                    </a>
                    <form
                        action='/items'
                        className='search'
                        role='search'
                        method='GET'
                        onSubmit={handleSubmit}
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
                            type='search'
                            autoFocus
                            placeholder='Nunca dejes de buscar'
                            autoComplete='off'
                            onChange={(event) => setSearch(event.target.value)}
                            value={search}
                        />
                        <button
                            className=''
                            aria-label='boton de busqueda'
                            type='submit'
                        >
                            <img
                                src='/public/assets/ic_Search.png'
                                alt='icono de busqueda'
                            />
                        </button>
                    </form>
                </div>
            </nav>
        </header>
    );
};

export default Header;
