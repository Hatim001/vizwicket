import {
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
  OutlinedInputProps,
} from "@mui/material";
import { FC } from "react";

interface Props extends OutlinedInputProps {
  id: string;
  label: string;
  required?: boolean;
  isError?: boolean;
  errorText?: string;
}

const InputField: FC<Props> = ({
  id,
  label,
  required = false,
  isError = false,
  errorText = "",
  ...rest
}) => {
  return (
    <FormControl error={isError} fullWidth={true} required={required}>
      <InputLabel required={required} htmlFor={id}>
        {label}
      </InputLabel>
      <OutlinedInput required={required} id={id} label={label} {...rest} />
      {isError && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default InputField;
