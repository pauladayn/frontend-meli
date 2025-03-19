import React from "react";
import ProductCard from "../organisms/ProductCardGrid";

const ProductGrid = () => {
    const emptyArray = Array.from(new Array(5).fill(0));
    const fakeProps = {
        id: "MLA232425",
        image: "",
        price: 1980,
        sellerLocation: "Mendoza",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum deserunt error officia amet aspernatur cupiditate cumque nemo! Eius sequi esse asperiores qui libero tempora? Rem nulla tempore culpa! Excepturi, sint.",
        freeShipping: true,
    };
    return (
        <section className='row list-wrapper' aria-label='listado de productos'>
            <h2 className='visually-hidden'>Resultados de la búsqueda</h2>

            <ul className='products-list col-12' role='list'>
                {emptyArray.map((_, index) => (
                    <>
                        <li className='my-md row' key={index} role='listitem'>
                            <ProductCard
                                {...fakeProps}
                                goToUrl={`/items/${fakeProps.id}`}
                            />
                        </li>
                        {index < emptyArray.length - 1 && (
                            <hr
                                className='product-divider'
                                aria-hidden='true'
                            />
                        )}
                    </>
                ))}
            </ul>
        </section>
    );
};

export default ProductGrid;
