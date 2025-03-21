interface UserSearchProps {
    delay?: number;
    query?: string;
}
export declare const useSearch: ({ delay, query }: UserSearchProps) => {
    search: string;
    setSearch: import("react").Dispatch<import("react").SetStateAction<string>>;
    debouncedSearch: string;
    handleSearch: (term?: string) => void;
};
export {};
