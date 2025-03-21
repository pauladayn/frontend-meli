import React from "react";
import { ItemDetails } from "../../../DTOtypes";
import { formatPrice } from "../../utils/parseNumberToCurrency";

const ProductCardDetail = ({ item }: ItemDetails) => (
    <>
        <section className='row card product-detail'>
            <div className='col-12 product-detail__image'>
                <img src={item.detail_image?.url} alt={item.title} />
            </div>
            <div className='col-12 product-detail__info'>
                <span className='product-detail__info_condition'>
                    {item.condition === "new" ? "nuevo" : "usado"}
                    {/* este dato no se muestra porque no llega en ninguno de los dos endpoints consultados */}
                    {/* {item.sold_quantity} vendidos */}
                </span>
                <h1 className='product-detail__title'>{item.title}</h1>
                <span className='product-detail__price'>
                    {formatPrice(item.price)}
                </span>
                <button className='main-btn'>Comprar</button>
            </div>
            <div className='col-12 product-description'>
                <h2>Descripción del producto</h2>
                <p>{item.description}</p>
            </div>
        </section>
    </>
);

export default ProductCardDetail;
