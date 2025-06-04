// StockRequestService.ts
export async function getStockRequests(type: 'Ingredients' | 'Packagings') {
  const res = await fetch(`http://localhost:5167/api/StockRequest${type}`);
  if (!res.ok) throw new Error('Failed to fetch stock requests');
  return await res.json(); // should return StockRequestAdminDTO[]
}
