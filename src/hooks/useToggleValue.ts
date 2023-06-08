import { useState } from "react";

interface ToggleValue {
  value: boolean;
  handleToggleValue: () => void;
}

export default function useToggleValue(initialValue = false): ToggleValue {
  const [value, setValue] = useState<boolean>(initialValue);
  const handleToggleValue = () => {
    setValue(!value);
  };
  return {
    value,
    handleToggleValue,
  };
}
