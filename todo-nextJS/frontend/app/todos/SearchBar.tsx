'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set('search', term);
    else params.delete('search');
    router.push(`/todos?${params.toString()}`);
  };

  return (
    <input 
      type="text" 
      placeholder="할 일 검색..." 
      className="border p-2 w-full rounded-lg"
      onChange={handleSearch}
    />
  );
}