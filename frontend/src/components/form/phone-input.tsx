import React, { useEffect, useState } from "react";
import { Input } from "antd";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

const DIGITS_TOTAL = 12;

const onlyDigits = (s: string) => s.replace(/\D/g, "");

function formatValueForDisplay(v?: string) {
  if (!v) return "+998";
  let digits = onlyDigits(v);
  if (!digits.startsWith("998")) digits = "998" + digits;
  digits = digits.slice(0, DIGITS_TOTAL);
  return "+" + digits;
}

export default function PhoneInput({
  value,
  onChange,
  placeholder,
  disabled,
}: Props) {
  const [inner, setInner] = useState<string>(() => formatValueForDisplay(value));

  useEffect(() => {
    setInner(formatValueForDisplay(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    let digits = onlyDigits(raw);

    if (!digits.startsWith("998")) digits = "998" + digits;

    digits = digits.slice(0, DIGITS_TOTAL);

    const out = "+" + digits;
    setInner(out);
    onChange?.(out);
  };

  return (
    <Input
      value={inner}
      onChange={handleChange}
      maxLength={1 + DIGITS_TOTAL}
      placeholder={placeholder ?? "+998XXXXXXXXX"}
      disabled={disabled}
    />
  );
}
