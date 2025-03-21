import React from "react";
import ProductCard from "../molecules/ProductCardForList";
import { Item } from "../../../DTOtypes";

export default function ProductList({
    items,
    query,
}: {
    items: Array<Item>;
    query: string;
}) {

    return (
        <section className='row card' aria-label='listado de productos'>
            <h2 className='visually-hidden'>Resultados de la búsqueda</h2>
            <ul className='products-list col-12' role='list'>
                {items.map((item, index) => (
                    <li
                        className='row product-item'
                        role='listitem'
                        key={index}
                    >
                        <div className='col-2 product-image-col'>
                            <img
                                src={item.picture}
                                alt={item.title}
                                className='product-image'
                            />
                        </div>
                        <div className='col-10 product-info-col'>
                            <ProductCard
                                {...item}
                                goToUrl={`/items/${
                                    item.id
                                }?search=${encodeURIComponent(query)}`}
                            />
                        </div>
                        {index < items.length - 1 && (
                            <hr
                                className='product-divider col-12'
                                aria-hidden='true'
                            />
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
