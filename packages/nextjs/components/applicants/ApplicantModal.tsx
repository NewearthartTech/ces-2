import React, { Fragment, useState } from "react";
import ApplicantForm from "./ApplicantForm";
import { Dialog, Transition } from "@headlessui/react";
import { Applicant } from "@prisma/client";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { createApplicant } from "~~/utils/backend";

const ApplicantModal = ({
  listingId,
  isOpen,
  setIsOpen,
}: {
  listingId: string;
  isOpen: boolean;
  setIsOpen: (x: boolean) => any;
}) => {
  const { address: ethAddress } = useAccount();
  const [failed, setFailed] = useState<boolean>();
  const submitApplication = async (applicant: Applicant) => {
    try {
      setFailed(false);
      await createApplicant({
        ...applicant,
        id: undefined,
        walletAddress: ethAddress ?? "",
        workPostingId: listingId,
      });
      toast.success("Application submitted successfully");
      setTimeout(() => {
        setIsOpen(false);
      }, 600);
    } catch {
      setFailed(true);
    }
  };
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center backdrop-blur-md">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Create Application
                </Dialog.Title>
                <div className="mt-2">
                  <ApplicantForm
                    submitLabel="Create Application"
                    onSubmit={async applicant => await submitApplication(applicant)}
                  />
                  {failed && <div className="alert alert-error shadow-lg my-2">Failed to create application</div>}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ApplicantModal;
