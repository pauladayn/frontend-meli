import React from "react";

const CategoriesBreadcrumb = ({
    categories,
}: {
    categories: Array<string>;
}) => {
    console.log("categories", categories);
    return (
        <nav aria-label='navegacion por categorias' className='breadcrumb-nav'>
            <ul className='breadcrumb' itemScope itemType='https://schema.org/BreadcrumbList'>
                {categories.map((category, index) => (
                    <li itemScope key={`${category}-${index}`} itemType="https://schema.org/ListItem">
                        <p>{category}</p>
                        <meta itemProp='position' content={`${index + 1}`} />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default CategoriesBreadcrumb;
