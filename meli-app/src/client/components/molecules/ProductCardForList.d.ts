interface ProductCardProps {
    title: string;
    price: {
        amount: number;
        currency: string;
        decimals: number;
    };
    free_shipping: boolean;
    goToUrl: string;
    seller_address: string;
}
declare function ProductCardForList({ title, price, free_shipping, goToUrl, seller_address, }: ProductCardProps): import("react/jsx-runtime").JSX.Element;
export default ProductCardForList;
