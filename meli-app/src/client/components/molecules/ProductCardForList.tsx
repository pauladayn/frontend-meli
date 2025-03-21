import React from "react";
import { Link } from "react-router";
import { formatPrice } from "../../utils/parseNumberToCurrency";

interface ProductCardProps {
    title: string;
    price: { amount: number; currency: string; decimals: number };
    free_shipping: boolean;
    goToUrl: string;
    seller_address: string;
}

function ProductCardForList({
    title,
    price,
    free_shipping,
    goToUrl,
    seller_address,
}: ProductCardProps) {
    return (
        <div className='product-card'>
            <div className='product-card__content'>
                <Link to={goToUrl} className='product-card__link'>
                    <h3 className='product-card__title'>
                        {formatPrice(price)}
                    </h3>
                    {free_shipping && (
                        <img src='/public/assets/ic_shipping.png' />
                    )}
                </Link>
                <p className='product-card__location'>{seller_address}</p>
            </div>
            <p className='product-card__price'>{title}</p>
        </div>
    );
}

export default ProductCardForList;
