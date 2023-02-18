import { Token } from '@/store/tokenSlice';

export async function http<T>(url: string, token: Token | null, method: string = 'GET', body?: object): Promise<T> {
  const resp = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(body),
    method,
  });
  return await resp.json();
}