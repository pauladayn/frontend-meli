export default function ProductListSkeleton() {
    const skeletonItems = Array(4).fill(null);

    return (
        <section
            className='row card'
            aria-label='listado de productos (cargando)'
        >
            <h2 className='visually-hidden'>Cargando resultados...</h2>
            <ul className='products-list col-12' role='list'>
                {skeletonItems.map((_, index) => (
                    <li
                        className='row product-item'
                        role='listitem'
                        key={index}
                    >
                        <div className='col-2 product-image-col'>
                            <div className='product-image skeleton-box'></div>
                        </div>
                        <div className='col-10 product-info-col'>
                            <div className='skeleton-box skeleton-title'></div>
                            <div className='skeleton-box skeleton-description'></div>
                        </div>
                        {index < skeletonItems.length - 1 && (
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
