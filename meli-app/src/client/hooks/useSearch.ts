import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

interface UserSearchProps {
  delay?: number;
  query?: string;
}
export const useSearch = ({ delay = 300, query }: UserSearchProps) => {
  const [search, setSearch] = useState(query || '');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [search, delay]);


  const handleSearch = (term: string = search) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;
    const searchQuery = `search=${encodeURIComponent(trimmedTerm)}`;
    navigate(`/items?${searchQuery}`);
  };

  return {
    search,
    setSearch,
    debouncedSearch,
    handleSearch,

  };
}