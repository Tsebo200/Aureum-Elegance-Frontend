import { Button } from "@mui/material";
import styles from "./FragrancesComponent.module.scss";

const FragrancesComponent = () => {
    const fragrances = [
      {
        name: "Moonlit Jasmine",
        ingredients: ["Bergamot Oil", "Vanillin Powder", "Stabilizers"],
        costPerUnit: 45.0,
        amountInStock: 100,
      },
      {
        name: "Citrus Breeze",
        ingredients: ["Lemon Oil", "Orange Extract", "Preservatives"],
        costPerUnit: 38.5,
        amountInStock: 80,
      },
    ];
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
          <th>Actions</th>
        </tr>
        <hr />
      </thead>
      <tbody>
        {fragrances.map((fragrance, index) => (
          <tr key={index}>
            <td>{fragrance.name}</td>
            <td>{fragrance.ingredients.join(", ")}</td>
            <td>R {fragrance.costPerUnit.toFixed(2)}</td>
            <td>{fragrance.amountInStock}</td>
            <td>
              <Button className={styles.Btn}>Produce</Button>
              <Button className={styles.Btn}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
}
export default FragrancesComponent;
