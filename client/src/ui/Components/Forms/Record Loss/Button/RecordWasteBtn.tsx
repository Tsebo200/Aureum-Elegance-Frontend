import { Button } from "@mui/material";
import styles from "../Button/RecordWasteBtn.module.scss";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

function RecordWasteBtn({ onClick, disabled = false }: Props) {
  return (
    <div>
      <Button
        aria-label="record"
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        className={`${styles.recordBtn} ${!disabled ? styles.pointer : ''}`}
      >
        Record Waste Loss
      </Button>
    </div>
  );
}

export default RecordWasteBtn;
