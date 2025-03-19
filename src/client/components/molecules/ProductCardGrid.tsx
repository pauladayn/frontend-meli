import React from "react";
import freeShippingIcon from "@/assets/ic_shipping.png";

type ProductCardProps = {
    id: string;
    picture: string;
    condition: string;
    price: { amount: number; currency: string; decimals: number };
    sellerLocation?: string;
    title?: string;
    free_shipping: boolean;
};
const ProductCard: React.FC<
    ProductCardProps & {
        goToUrl: string;
    }
> = ({ picture, price, sellerLocation, title, free_shipping, goToUrl }) => {
    return (
        <article className='d-flex product-card col-10'>
            <div className='mx-md product-image'>
                <img src={picture} alt='product image' />
            </div>
            <div className='d-flex flex-column'>
                <div className='product-title'>
                    <div>
                        <a href={goToUrl}>
                            <h3 aria-labelledby='precio del producto'>
                                {`${price.currency} ${price.amount}`}
                            </h3>
                            {free_shipping && (
                                <img
                                    src={freeShippingIcon}
                                    alt='envio incluido'
                                    role='img'
                                    aria-label='el producto incluye envio gratuito'
                                />
                            )}
                        </a>
                    </div>
                    <p aria-labelledby='ubicacion del vendedor'>
                        {sellerLocation}
                    </p>
                </div>
                {/* vercomo agregar esto mt-xl */}
                <div className='mt-xl d-flex flex-wrap'>
                    <p
                        className='product-description'
                        aria-labelledby='descripcion del producto'
                    >
                        {title}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
