import React, { useState } from "react";
import "./AddStock.scss";
import Sidebar from "../../Components/Sidebar";
import WarehouseForm from "../../Components/Forms/StockRequest/WarehouseSelect";

import {
  addIngredient,
} from "../../services/IngredientsServiceRoutes";
import type { PostIngredient } from "../../services/models/ingredientModel";

import {
  addPackaging,
} from "../../services/packagingServiceRoute";
import type { PostPackaging } from "../../services/models/packagingModel";

export default function AddStock() {
  // ----- Ingredient Form State -----
  const [ingName, setIngName] = useState("");
  const [ingType, setIngType] = useState("");
  const [ingCost, setIngCost] = useState("");
  const [ingExpiry, setIngExpiry] = useState("");
  const [ingMsg, setIngMsg] = useState<string | null>(null);

  // ----- Packaging Form State -----
  const [pkgName, setPkgName] = useState("");
  const [pkgType, setPkgType] = useState("");
  const [pkgStock, setPkgStock] = useState<number | "">("");
  const [pkgMsg, setPkgMsg] = useState<string | null>(null);

  // ----- Handlers -----
  const handleIngredientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIngMsg(null);
    try {
      const payload: PostIngredient = {
        name: ingName,
        type: ingType,
        cost: ingCost,
        expiryDate: new Date(ingExpiry).toISOString(),
        isExpired: new Date(ingExpiry) < new Date(),
      };
      await addIngredient(payload);
      setIngMsg("Ingredient added successfully!");
      // Reset form
      setIngName("");
      setIngType("");
      setIngCost("");
      setIngExpiry("");
    } catch (err: any) {
      setIngMsg("Error adding ingredient: " + err.message);
    }
  };

  const handlePackagingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPkgMsg(null);
    try {
      const payload: PostPackaging = {
        name: pkgName,
        type: pkgType,
        stock: Number(pkgStock),
      };
      await addPackaging(payload);
      setPkgMsg("Packaging added successfully!");
      setPkgName("");
      setPkgType("");
      setPkgStock("");
    } catch (err: any) {
      setPkgMsg("Error adding packaging: " + err.message);
    }
  };

  // ----- Render -----
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <h1 className="page-title">Add Stock</h1>
        <hr className="divider" />

        <section className="warehouse-section">
          <h2 className="section-title">Select Destination Warehouse</h2>
          <div className="selector-container">
            {/* <WarehouseForm /> */}
          </div>
        </section>

        <section className="forms-container">
          {/* ------------------ Ingredient ------------------ */}
          <section className="form-section">
            <h2 className="form-title">Add Ingredient</h2>
            <form className="form-container" onSubmit={handleIngredientSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={ingName}
                  onChange={(e) => setIngName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  className="form-input"
                  value={ingType}
                  onChange={(e) => setIngType(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Cost (R)</label>
                <input
                  type="text"
                  className="form-input"
                  value={ingCost}
                  onChange={(e) => setIngCost(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Expiry Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={ingExpiry}
                  onChange={(e) => setIngExpiry(e.target.value)}
                  required
                />
              </div>
              <div className="button-container">
                <button type="submit" className="submit-button">
                  Submit Ingredient
                </button>
              </div>
              {ingMsg && <p className="form-message">{ingMsg}</p>}
            </form>
          </section>

          {/* ------------------ Packaging ------------------ */}
          <section className="form-section">
            <h2 className="form-title">Add Packaging</h2>
            <form className="form-container" onSubmit={handlePackagingSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={pkgName}
                  onChange={(e) => setPkgName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  className="form-input"
                  value={pkgType}
                  onChange={(e) => setPkgType(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Stock Quantity</label>
                <input
                  type="number"
                  className="form-input"
                  value={pkgStock}
                  onChange={(e) => setPkgStock(e.target.valueAsNumber || "")}
                  required
                />
              </div>
              <div className="button-container">
                <button type="submit" className="submit-button">
                  Submit Packaging
                </button>
              </div>
              {pkgMsg && <p className="form-message">{pkgMsg}</p>}
            </form>
          </section>
        </section>
      </main>
    </div>
  );
}
