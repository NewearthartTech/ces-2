import React, { ChangeEvent, useState } from "react";

interface Props {
  id: string;
  onChange: (file: File) => void;
  error?: boolean;
  helperText?: string;
}
const UploadImage = ({ id, onChange, error, helperText }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <>
      {previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img style={{ maxWidth: "300px", margin: "0 auto", borderRadius: "10px" }} src={previewUrl} alt="Preview" />
      )}
      <input accept="image/*" className="image-input" id={id} type="file" onChange={handleFileChange} />
      <label htmlFor={id}>
        <span className="btn btn-accent">{previewUrl ? "Change Image" : " Upload Project Image"}</span>
      </label>
      {error && <p className="mx-2 text-red-500">{helperText}</p>}
    </>
  );
};

export default UploadImage;
