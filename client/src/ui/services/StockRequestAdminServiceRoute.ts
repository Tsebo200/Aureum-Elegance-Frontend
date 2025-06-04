import type {
  StockRequestAdminDTO,
  StockRequestType
} from './models/stockRequestAdminModel';

const BASE = 'http://localhost:5167/api';

function endpointFor(type: StockRequestType) {
  return type === 'Ingredients'
    ? `${BASE}/StockRequestIngredients`
    : `${BASE}/StockRequestPackagings`;
}

// Fetch all stock requests of a given type.
export async function getStockRequests(
  type: StockRequestType
): Promise<StockRequestAdminDTO[]> {
  const res = await fetch(endpointFor(type));
  if (!res.ok) throw new Error(`Failed to fetch ${type} requests`);
  const data = (await res.json()) as any[];
  return data.map(obj => ({
    ...obj,
    requestType: type,
  }));
}

// Approve or deny a request of either type.
// • If approve === true  → GET → set status="Approved" → PUT
// • If approve === false → DELETE (remove the record entirely)
export async function respondToRequest(
  type: StockRequestType,
  id: number,
  approve: boolean
): Promise<void> {
  const url = `${endpointFor(type)}/${id}`;

  if (approve) {
    // 1) GET the existing DTO
    const getRes = await fetch(url);
    if (!getRes.ok) throw new Error(`Request ${id} not found`);
    const body = (await getRes.json()) as StockRequestAdminDTO;

    // 2) Mutate status to "Approved"
    body.status = 'Approved';

    // 3) PUT it back
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!putRes.ok) throw new Error(`Failed to approve request ${id}`);
  } else {
    // If denied → DELETE immediately
    const deleteRes = await fetch(url, { method: 'DELETE' });
    if (!deleteRes.ok) throw new Error(`Failed to delete request ${id}`);
  }
}
