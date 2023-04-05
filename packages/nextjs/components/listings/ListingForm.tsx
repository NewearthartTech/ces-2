import { useState } from "react";
import NumberInput from "../input/NumberInput";
import TextInput from "../input/TextInput";
import TextareaInput from "../input/TextareaInput";
import UploadImage from "../input/UploadImage";
import { WorkPosting } from "@prisma/client";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup.string().max(50, "Title can't be longer than 50 characters").required("Title is required"),
  image: yup.string().required("Image is required"),
  price: yup.number().positive("Price must be greater than 0").required("Price is required"),
  description: yup.string().min(10).required("Description must have at least 10 characters"),
  link: yup.string().url(),
  discordServerLink: yup
    .string()
    .matches(
      /^(?:https?:\/\/)?(?:www\.)?(?:discord\.(?:gg|com)\/invite|discordapp\.com\/invite)\/([a-zA-Z0-9-]+)$/,
      "Must be a valid Discord invite link",
    ),
});

export const ListingForm = ({
  onSubmit,
  submitLabel = "Submit",
  currentPosting,
}: {
  onSubmit: (listing: WorkPosting) => Promise<any>;
  submitLabel?: string;
  currentPosting?: WorkPosting;
}) => {
  const [values, setValues] = useState<WorkPosting>(
    currentPosting ?? {
      id: "",
      title: "",
      link: "",
      discordInviteLink: "",
      image: "",
      price: 0,
      description: "",
      walletAddress: "",
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (fieldName: keyof WorkPosting) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let cleanedValue = value;

    if (name === "price") {
      cleanedValue = value.replace(/[^0-9.]/g, "");
    }

    setValues(prevValues => ({ ...prevValues, [fieldName]: cleanedValue }));
  };
  const handleFileChange = (fieldName: keyof WorkPosting) => (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setValues(prevValues => ({ ...prevValues, [fieldName]: reader.result as string }));
      };
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validationSchema
      .validate(values, { abortEarly: false })
      .then(async () => {
        setIsLoading(true);
        setErrors({});
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await onSubmit(values!);
      })
      .catch(error => {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold my-2">Post title</h2>
        <TextInput value={values.title ?? ""} onChange={handleChange("title")} error={errors.title} />
        <h2 className="text-lg font-semibold my-2">Preview Image</h2>
        <UploadImage
          id="image"
          onChange={handleFileChange("image")}
          error={Boolean(errors.image)}
          helperText={errors.image}
        />
        <h2 className="text-lg font-semibold my-2">Price Offering</h2>
        <NumberInput
          value={values.price ?? 0}
          onChange={handleChange("price")}
          error={errors.price}
          suggestion="in $"
          placeholder="12.6"
        />
        <h2 className="text-lg font-semibold my-2">Post Link</h2>
        <TextInput
          error={errors.link}
          helperText={errors.link}
          value={values.link ?? ""}
          onChange={handleChange("link")}
          placeholder="https://"
        />
        <h2 className="text-lg font-semibold my-2">Post Description</h2>
        <TextareaInput
          label="Description"
          value={values.description ?? ""}
          onChange={handleChange("description")}
          error={errors.description}
          helperText={errors.description}
        />
        <button disabled={isLoading} className={`btn btn-outline btn-primary ${isLoading ? "loading" : ""}`}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
};
