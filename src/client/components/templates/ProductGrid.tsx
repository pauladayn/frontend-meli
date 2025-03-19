import React from "react";
import ProductCard from "@/components/molecules/ProductCardGrid";
import { log } from "node:console";

const ProductGrid = ({
    data,
}: {
    data: {
        author: {
            name: string;
            lastName: string;
        };
        items: Array<{
            id: string;
            title: string;
            price: { amount: number; currency: string; decimals: number };
            picture: string;
            condition: string;
            free_shipping: boolean;
            categories: Array<string>;
        }>;
    };
}) => {
    const emptyArray = Array.from(new Array(5).fill(0));
    console.log("AUTHOR", data.author);

    return (
        <section className='row list-wrapper' aria-label='listado de productos'>
            <h2 className='visually-hidden'>Resultados de la búsqueda</h2>

            <ul className='products-list col-12' role='list'>
                {data?.items.map((item, index) => (
                    <div key={index}>
                        <li className='my-md row' role='listitem'>
                            <ProductCard
                                {...item}
                                goToUrl={`/items/${item.id}`}
                            />
                        </li>
                        {index < emptyArray.length - 1 && (
                            <hr
                                className='product-divider'
                                aria-hidden='true'
                            />
                        )}
                    </div>
                ))}
            </ul>
        </section>
    );
};

export default ProductGrid;
