import TextField from "@mui/material/TextField/TextField";

// MeetingRequestForm
export default function MeetingDescriptionInput({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (description: string) => void;
}) {
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      variant="outlined"
      color="primary"
      value={description}
      onChange={handleDescriptionChange}
    />
  );
}
