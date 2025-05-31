import React from "react";
import "./AddStock.scss";
import Sidebar from "../../Components/Sidebar";
import WarehouseForm from '../../Components/Forms/StockRequest/WarehouseSelect'

export default function AddStock() {


  
  // WarehouseSelector
  const WarehouseSelector = () => (
    <div className="selector-container">
        <div className="WarehouseToForm">
          {/* <WarehouseForm /> */}
        </div>
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
          <h2 className="section-title">Select Destination Warehouse</h2>
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
