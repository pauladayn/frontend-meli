import React from "react";
import { Link } from "react-router";

const CategoriesBreadcrumb = ({
    categories = [],
}: {
    categories: Array<string>;
}) => {
    if (!categories.length) {
        return (
            <nav className='breadcrumb-nav'>
                <ul className='breadcrumb'>
                    <li>
                        <Link to='/'>Volver al inicio</Link>
                    </li>
                </ul>
            </nav>
        );
    }
    return (
        <nav aria-label='navegacion por categorias' className='breadcrumb-nav'>
            <ul
                className='breadcrumb'
                itemScope
                itemType='https://schema.org/BreadcrumbList'
            >
                {categories.map((category, index) => {
                    const trimmedTerm = category.trim();
                    const searchQuery = `search=${encodeURIComponent(
                        trimmedTerm
                    )}`;
                    return (
                        <Link
                            to={`/items?${searchQuery}`}
                            key={`${category}-${index}`}
                        >
                            <li
                                itemScope
                                itemType='https://schema.org/ListItem'
                            >
                                <p>{category}</p>
                                <meta
                                    itemProp='position'
                                    content={`${index + 1}`}
                                />
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </nav>
    );
};

export default CategoriesBreadcrumb;
