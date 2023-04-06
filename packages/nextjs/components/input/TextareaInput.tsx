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
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  error?: string;
  placeholder?: string;
  helperText?: string;
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange ? onChange : undefined}
        placeholder={placeholder}
        className="textarea textarea-primary w-full rounded-md"
      />
      <label className="label">
        {error && <span className="label-text-alt text-red-500">{error}</span>}
        {!error && helperText && <span className="label-text-alt">{helperText}</span>}
      </label>
    </div>
  );
};

export default TextareaInput;
