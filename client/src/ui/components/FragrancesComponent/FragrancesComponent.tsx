import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./FragrancesComponent.module.scss";
import { getFragrances, deleteFragrance, updateFragrance, updateFragranceIngredient } from "../../services/FragranceServiceRoute";
import type { Fragrance, FragranceIngredient } from "../../services/models/fragranceModel";
import type { PostFragrance, PostFragranceIngredient } from "../../services/models/fragranceModel";

const FragrancesComponent = () => {
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);
  const [editingFragrance, setEditingFragrance] = useState<Fragrance | null>(
    null
  );
 
   
  const [editForm, setEditForm] = useState<PostFragrance>({
    name: "",
    description: "",
    cost: 0,
    expiryDate: "",
    volume: 0,
  });
  const [ingredientEdits, setIngredientEdits] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    getFragrances()
      .then(setFragrances)
      .catch((err) => console.error("Error fetching fragrances:", err));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteFragrance(id);
      setFragrances((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Error deleting fragrance:", err);
    }
  };

  const handleEditClick = (fragrance: Fragrance) => {
    setEditingFragrance(fragrance);
    
    const getExpiryDate = new Date(fragrance.expiryDate).toISOString().split("T")[0];
    setEditForm({
      name: fragrance.name,
      description: fragrance.description,
      cost: fragrance.cost,
      expiryDate: getExpiryDate,
      volume: fragrance.volume,
    });

    const ingredientMap: { [key: string]: number } = {};
    fragrance.fragranceIngredients?.forEach((fi) => {
      const fragranceID = fragrance.id; // use the main fragrance ID
      console.log(fi.amount);
      ingredientMap[`${fragranceID}-${fi.ingredientsID}`] = fi.amount;
    });
    console.log(ingredientMap);
    setIngredientEdits(ingredientMap);
  };

  const handleEditChange = (
    field: keyof PostFragrance,
    value: string | number
  ) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (
    fragranceID: number,
    ingredientsID: number,
    amount: number
  ) => {
    const key = `${fragranceID}-${ingredientsID}`;
    setIngredientEdits((prev) => ({ ...prev, [key]: amount }));
  };

  const handleSave = async () => {
    if (!editingFragrance) return;
    try {
      await updateFragrance(editingFragrance.id, editForm);
      const updates = editingFragrance.fragranceIngredients || [];
      await Promise.all(
        updates.map((fi) => {
          const key = `${editingFragrance.id}-${fi.ingredientsID}`;
          console.log(
            "Updating ingredient",
            key,
            "amount:",
            ingredientEdits[key]
          );
          return updateFragranceIngredient(
            editingFragrance.id,
            fi.ingredientsID,
            {
              fragranceID: editingFragrance.id,
              ingredientsID: fi.ingredientsID,
              Amount: ingredientEdits[key],
            }
          );
        })
      );

      const refreshed = await getFragrances();
      setFragrances(refreshed);
      setEditingFragrance(null);
    } catch (err) {
      console.error("Error updating fragrance:", err);
    }
  };

  const handleCancel = () => {
    setEditingFragrance(null);
  };

  return (
    <section className={styles.content}>
      <h1>Fragrances</h1>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Cost per unit</th>
            <th>Amount in Stock</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fragrances.map((fragrance) => (
            <tr key={fragrance.id}>
              <td>{fragrance.name}</td>
              <td>
                {fragrance.fragranceIngredients
                  ?.flatMap((fi) => fi.ingredients?.map((i) => i.name))
                  .join(", ")}
              </td>
              <td>R {fragrance.cost.toFixed(2)}</td>
              <td>{fragrance.volume}</td>
              <td>{new Date(fragrance.expiryDate).toISOString().split("T")[0]}</td>
              <td>
                <Button
                  onClick={() => handleEditClick(fragrance)}
                  className={styles.editBtn}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  onClick={() => handleDelete(fragrance.id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingFragrance && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Edit Fragrance</h2>
            <form
              className={styles.modalForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className={styles.modalField}>
                <label>
                  Name:
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className={styles.modalField}>
                <label>
                  Description:
                  <textarea
                    className={styles.modalField}
                    value={editForm.description}
                    onChange={(e) =>
                      handleEditChange("description", e.target.value)
                    }
                    required
                  />
                </label>
              </div>

              <div className={styles.modalField}>
                <label>
                  Cost:
                  <input
                    type="number"
                    value={editForm.cost}
                    onChange={(e) =>
                      handleEditChange("cost", parseFloat(e.target.value))
                    }
                    required
                  />
                </label>
              </div>

              <div className={styles.modalField}>
                <label>
                  Expiry Date:
                  <input
                    type="date"
                    value={editForm.expiryDate}
                    onChange={(e) =>
                      handleEditChange("expiryDate", e.target.value)
                    }
                    required
                  />
                </label>
              </div>

              <div className={styles.modalField}>
                <label>
                  Volume:
                  <input
                    type="number"
                    value={editForm.volume}
                    onChange={(e) =>
                      handleEditChange("volume", parseInt(e.target.value))
                    }
                    required
                  />
                </label>
              </div>

              <h3>Ingredients</h3>
              {editingFragrance.fragranceIngredients?.map((fi) => (
                <div
                  key={`${fi.fragranceID}-${fi.ingredientsID}`}
                  className={styles.modalField}
                >
                  <label>
                    {`${fi.ingredients?.[0]?.name ?? "Unknown"} (Current: ${
                      ingredientEdits[
                        `${editingFragrance.id}-${fi.ingredientsID}`
                      ] ?? fi.amount
                    })`}
                    :
                    <input
                      type="number"
                      value={
                        ingredientEdits[
                          `${editingFragrance.id}-${fi.ingredientsID}`
                        ] || 0
                      }
                      onChange={(e) =>
                        handleIngredientChange(
                          editingFragrance.id,
                          fi.ingredientsID,
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </label>
                </div>
              ))}

              <div className={styles.modalButtons}>
                <Button type="submit" className={styles.editBtn}>
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  className={styles.deleteBtn}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default FragrancesComponent;
