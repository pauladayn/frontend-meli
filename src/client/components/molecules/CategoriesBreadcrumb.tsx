import React from "react";

const CategoriesBreadcrumb = () => {
    return (
        <nav aria-label='navegacion por categorias' className='py-md'>
            <ul className=' breadcrumb' itemScope>
                <li itemScope>
                    <p>categoria 1</p>
                    <meta itemProp='position' content='1' />
                </li>
            </ul>
            {/* <nav aria-label='Navegación de categorías'>
        <ol
            className='breadcrumb py-md'
            itemScope
            itemType='https://schema.org/BreadcrumbList'
        >
            <li
                itemProp='itemListElement'
                itemScope
                itemType='https://schema.org/ListItem'
            >
                <a itemProp='item' href='#'>
                    <span itemProp='name'>Categoría</span>
                </a>
                <meta itemProp='position' content='1' />
            </li>
            <li
                itemProp='itemListElement'
                itemScope
                itemType='https://schema.org/ListItem'
            >
                <a itemProp='item' href='#'>
                    <span itemProp='name'>
                        Subcategoría
                    </span>
                </a>
                <meta itemProp='position' content='2' />
            </li>
            <li
                itemProp='itemListElement'
                itemScope
                itemType='https://schema.org/ListItem'
            >
                <a itemProp='item' href='#'>
                    <span itemProp='name'>Producto</span>
                </a>
                <meta itemProp='position' content='3' />
            </li>
        </ol>
    </nav> */}
        </nav>
    );
};

export default CategoriesBreadcrumb;
