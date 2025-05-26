import { Button } from "@mui/material";
import styles from "./FragrancesComponent.module.scss";
import { getFragrances } from "../../services/FragranceServiceRoute"
import type { Fragrance } from "../../services/models/fragranceModel";
import { useEffect, useState } from "react";
const FragrancesComponent = () => {
  const [fragrances, setFragrances] = useState<Fragrance[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFragrances(); 
        console.log("Fetched fragrances:", data);
        setFragrances(data); 
      } catch (error) {
        console.error("Error fetching fragrances:", error);
      }
    };

    fetchData();
  },[])
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
