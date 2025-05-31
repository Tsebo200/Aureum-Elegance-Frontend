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

//Fetch all stock requests of a given type.

export async function getStockRequests(
  type: StockRequestType
): Promise<StockRequestAdminDTO[]> {
  const res = await fetch(endpointFor(type));
  if (!res.ok) throw new Error(`Failed to fetch ${type} requests`);
  const data = await res.json() as any[];
  // Attach discriminant so TS knows which branch
  return data.map(obj => ({
    ...obj,
    requestType: type,
  }));
}


//Approve or deny a request of either type.

export async function respondToRequest(
  type: StockRequestType,
  id: number,
  approve: boolean
): Promise<void> {
  // 1) GET current payload
  const getUrl = `${endpointFor(type)}/${id}`;
  const getRes = await fetch(getUrl);
  if (!getRes.ok) throw new Error(`Request ${id} not found`);
  const body = (await getRes.json()) as StockRequestAdminDTO;

  // 2) Mutate its status
  body.status = approve ? 'Approved' : 'Denied';

  // 3) PUT it back
  const putRes = await fetch(getUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!putRes.ok) throw new Error(`Failed to update request ${id}`);
}
