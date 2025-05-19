import { Button } from "@mui/material"
import styles from "./RecordWasteBtn.module.scss"

function RecordWasteBtn() {
  return (
    <div>
        <Button variant="contained" className={styles.recordBtn}>
        Record Waste Loss
        </Button>
    </div>
  )
}

export default RecordWasteBtn