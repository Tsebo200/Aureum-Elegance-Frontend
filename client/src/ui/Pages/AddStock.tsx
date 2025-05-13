import React from "react";
import "./AddStock.scss";
import Sidebar from "../Components/Sidebar";
export default function AddStock() {


  // WarehouseSelector
  const WarehouseSelector = () => (
    <div className="selector-container">
      <div className="warehouse-select">Warehouse Selection</div>
      <div
        className="dropdown-icon"
        dangerouslySetInnerHTML={{
          __html: `<svg width="35" height="21" viewBox="0 0 35 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L17.512 18.2068C17.9193 18.6324 18.6044 18.6154 18.9902 18.1701L33 2" stroke="black" stroke-width="3" stroke-linecap="round"/>
          </svg>`,
        }}
      />
    </div>
  );

  // AddIngredientForm
  const AddIngredientForm = () => (
    <section className="form-section">
      <h2 className="form-title">Add Ingredient</h2>
      <form className="form-container">
        <div className="form-group">
          <label className="form-label">Ingredient name:</label>
          <input type="text" className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <input type="text" className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">(R) Cost per unit:</label>
          <input type="number" className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">
            Amount of added units (units in litres):
          </label>
          <input type="number" className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Expiry Date</label>
          <input type="date" className="form-input" />
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">
            Submit Ingredient
          </button>
        </div>
      </form>
    </section>
  );

  // AddPackagingForm
  const AddPackagingForm = () => (
    <section className="form-section">
      <h2 className="form-title">Add Packaging</h2>
      <form className="form-container">
        <div className="form-group">
          <label className="form-label">Packaging name:</label>
          <input type="text" className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">(R) Cost per unit:</label>
          <input type="number" className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">
            Amount of added units (units in kilograms):
          </label>
          <input type="number" className="form-input" />
        </div>
        <div className="button-container">
          <button type="submit" className="submit-button">
            Submit Packaging
          </button>
        </div>
      </form>
    </section>
  );

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <h1 className="page-title">Add Stock</h1>
        <hr className="divider" />
        <section className="warehouse-section">
          <h2 className="section-title">Warehouse To</h2>
          <WarehouseSelector />
        </section>
        <section className="forms-container">
          <AddIngredientForm />
          <AddPackagingForm />
        </section>
      </main>
    </div>
  );
}
