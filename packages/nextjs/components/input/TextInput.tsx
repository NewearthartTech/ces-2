import React from "react";

const TextInput = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  helperText,
}: {
  label?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  helperText?: string;
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
        onChange={onChange ? onChange : undefined}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
      <label className="label">
        {error && <span className="label-text-alt text-red-500">{error}</span>}
        {!error && helperText && <span className="label-text-alt ">{helperText}</span>}
      </label>
    </div>
  );
};

export default TextInput;
