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

export async function respondToRequest(
  type: StockRequestType,
  id: number,
  approve: boolean
): Promise<void> {
  const url = `${endpointFor(type)}/${id}`;

  // 1) GET the existing record
  const getRes = await fetch(url);
  if (!getRes.ok) throw new Error(`Request ${id} not found`);
  const body = (await getRes.json()) as StockRequestAdminDTO;

  // 2) Prepare updated object
  const updatedRequest = {
    id: body.id,
    amountRequested: body.amountRequested,
    status: approve ? 'Approved' : 'Rejected',
    requestDate: body.requestDate,
    userId: body.user?.userId ?? 0,
    warehouseId: body.warehouse?.warehouseID ?? 0,
    ...(type === 'Ingredients'
      ? { ingredientsId: body.ingredients?.id }
      : { packagingId: body.packaging?.id }),
  };

  // 3) PUT updated object
  const putRes = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedRequest),
  });

  if (!putRes.ok)
    throw new Error(
      `Failed to ${approve ? 'approve' : 'reject'} request ${id}`
    );
}