import React from "react";
import freeShippingIcon from "@/assets/ic_shipping.png";

type ProductCardProps = {
    id: string;
    image: string;
    price: number;
    sellerLocation: string;
    description: string;
    freeShipping: boolean;
};
const ProductCard: React.FC<
    ProductCardProps & {
        goToUrl: string;
    }
> = ({ image, price, sellerLocation, description, freeShipping, goToUrl }) => {
    return (
        <article className='d-flex product-card col-10'>
            <div className='mx-md product-image'>
                imagen
                <img src={image} alt='product image' />
            </div>
            <div className='d-flex flex-column'>
                <div className='product-title'>
                    <div>
                        <a href={goToUrl}>
                            <h3 aria-labelledby='precio del producto'>
                                {price}
                            </h3>
                            {freeShipping && (
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
                <div className='d-flex flex-wrap'>
                    <p
                        className='product-description'
                        aria-labelledby='descripcion del producto'
                    >
                        {description}
                    </p>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
