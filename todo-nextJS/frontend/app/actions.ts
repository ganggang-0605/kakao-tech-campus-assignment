'use server'

// 여기서 변수를 선언해줘야 에러가 사라집니다!
const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

export async function getTodos(filter?: string, search?: string) {
  // 선언한 변수를 여기서 사용
  let url = `${BACKEND_URL}/todos?`;
  
  if (filter) url += `filter=${filter}&`;
  if (search) url += `search=${search}&`;
  
  const res = await fetch(url, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }
  
  return res.json();
}