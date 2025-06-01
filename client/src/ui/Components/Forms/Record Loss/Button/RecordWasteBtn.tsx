import { Button } from "@mui/material"
import styles from "../Button/RecordWasteBtn.module.scss"

type Props = {
  onClick: () => void;
};

function RecordWasteBtn({ onClick }: Props){
  return (
    <div>
        <Button variant="contained" onClick={onClick} className={styles.recordBtn}>
        Record Waste Loss
        </Button>
    </div>
  )
}

export default RecordWasteBtn