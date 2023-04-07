import React, { useState } from "react";
import TextInput from "../input/TextInput";
import TextareaInput from "../input/TextareaInput";
import { RainbowKitCustomConnectButton } from "../scaffold-eth/RainbowKitCustomConnectButton";
import { Applicant } from "@prisma/client";
import { useAccount } from "wagmi";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  description: yup.string().min(10).required("Information must have at least 10 characters"),
  userLink: yup.string().url("Please enter an valid link").optional(),
});
const ApplicantForm = ({
  onSubmit,
  submitLabel = "Submit",
  currentApplication,
}: {
  onSubmit: (listing: Applicant) => Promise<any>;
  submitLabel?: string;
  currentApplication?: Applicant;
}) => {
  const [values, setValues] = useState<Applicant>(
    currentApplication ?? {
      id: "",
      workPostingId: "",
      walletAddress: "",
      description: null,
      userLink: "",
    },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { address: ethAddress } = useAccount();
  const handleChange =
    (fieldName: keyof Applicant) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      const cleanedValue = value;
      setValues(prevValues => ({ ...prevValues, [fieldName]: cleanedValue }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validationSchema
      .validate(values, { abortEarly: false })
      .then(async () => {
        setIsLoading(true);
        setErrors({});
        await onSubmit(values);
      })
      .catch((error: any) => {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      })
      .finally(() => {
        setIsLoading(false);
        if (!errors) {
          setTimeout(() => {
            setValues({
              id: "",
              workPostingId: "",
              walletAddress: "",
              description: null,
              userLink: null,
            });
          }, 500);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex flex-col mt-6">
        <p className="my-2 text-left text-md">Tell more about you</p>
        <TextareaInput
          value={values.description ?? ""}
          onChange={handleChange("description")}
          error={errors.description}
          helperText={errors.description}
        />
        <TextInput
          label="Link"
          value={values.userLink ?? ""}
          onChange={handleChange("userLink")}
          error={errors.userLink}
          helperText={errors.userLink ?? "Optional"}
        />
        {!ethAddress ? (
          <div className="mx-auto">
            <RainbowKitCustomConnectButton />
          </div>
        ) : (
          <button disabled={isLoading} className={`btn btn-outline mt-4 btn-accent ${isLoading ? "loading" : ""}`}>
            {submitLabel}
          </button>
        )}
      </div>
    </form>
  );
};

export default ApplicantForm;
