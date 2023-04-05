import React from "react";

const NumberInput = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  suggestion,
}: {
  label?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  suggestion?: string;
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type="text"
        value={value}
        onKeyDown={event => {
          const allowedChars = "0123456789.";
          const inputChar = event.key;
          const currentInput = (event.target as HTMLInputElement).value;

          // Prevent entering non-allowed characters
          if (!allowedChars.includes(inputChar)) {
            event.preventDefault();
          }

          // Prevent entering more than one decimal point
          if (inputChar === "." && currentInput.includes(".")) {
            event.preventDefault();
          }
        }}
        onChange={onChange ? onChange : undefined}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
      <label className="label">
        {error && <span className="label-text-alt text-danger">{error}</span>}
        {!error && suggestion && <span className="label-text-alt text-danger">{suggestion}</span>}
      </label>
    </div>
  );
};

export default NumberInput;
