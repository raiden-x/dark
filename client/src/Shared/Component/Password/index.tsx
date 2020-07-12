import * as React from "react";
import { useState, useCallback } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import uniqueId from "lodash/uniqueId";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function Password(props: any) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = useCallback(() => {
    setShowPassword((showPassword) => !showPassword);
  }, []);
  const randomId = uniqueId();
  return (
    <FormControl
      variant="outlined"
      style={{ width: "250px", marginBottom: "25px" }}
      error={props.error}
    >
      <InputLabel
        htmlFor={props.id || randomId}
        color={props.color}
        variant="outlined"
        error={props.error}
      >
        {props.label}
      </InputLabel>
      <OutlinedInput
        {...props}
        id={props.id || randomId}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              type="button"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
}
