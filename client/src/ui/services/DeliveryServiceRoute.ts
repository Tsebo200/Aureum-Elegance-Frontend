import type { Delivery, PostDelivery } from "./models/deliveryModel";

const BASE_URL = "http://localhost:5167/api/Delivery";

// GET: api/Delivery
export async function getAllDeliveries(): Promise<Delivery[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch deliveries");
  }
  return res.json();
}

// POST: api/Delivery
export async function createDelivery(
  payload: PostDelivery
): Promise<Delivery> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create delivery");
  }
  return res.json();
}

// PUT: api/Delivery/{deliveryID}
export async function updateDelivery(
  deliveryID: number,
  payload: PostDelivery
): Promise<Delivery> {
  const res = await fetch(`${BASE_URL}/${deliveryID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    // include deliveryID in the object so the backend can match it
    body: JSON.stringify({ deliveryID, ...payload }),
  });
  if (!res.ok) {
    throw new Error(`Failed to update delivery ${deliveryID}`);
  }
  return res.json();
}

// DELETE: api/Delivery/{deliveryID}
export async function deleteDelivery(deliveryID: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${deliveryID}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Failed to delete delivery ${deliveryID}`);
  }
}
