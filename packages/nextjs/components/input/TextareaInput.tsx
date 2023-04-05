import React from "react";

const TextareaInput = ({
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
        className="textarea textarea-primary w-full"
      />
      <label className="label">
        {error && <span className="label-text-alt text-danger">{error}</span>}
        {!error && helperText && <span className="label-text-alt text-danger">{helperText}</span>}
      </label>
    </div>
  );
};

export default TextareaInput;
