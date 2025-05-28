// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import type { Dayjs } from 'dayjs';

// type Props = {
//   value: string;
//   onChange: (val: string) => void;
// };

// function RequestDate({ value, onChange }: Props) {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateTimePicker']}>
//         <DateTimePicker
//           label="Basic date time picker"
//           value={value ? (value as unknown as Dayjs) : null}
//           onChange={(newValue) => {
//             if (newValue) {
//               onChange(newValue.toISOString());
//             }
//           }}
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

// export default RequestDate;
