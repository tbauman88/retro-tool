import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

type TextareaProps = {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  readonly?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function Textarea({
  value: defaultValue,
  className,
  disabled,
  onChange,
  readonly,
}: TextareaProps) {
  const [value, setValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isFocused && value !== defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue, isFocused, value]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
  }, [value, defaultValue]);

  const onValueChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange],
  );

  return (
    <textarea
      ref={ref}
      disabled={disabled}
      className={className}
      value={value}
      readOnly={readonly}
      onFocus={() => !readonly && setIsFocused(true)}
      onBlur={() => !readonly && setIsFocused(false)}
      onChange={onValueChange}
    />
  );
}
