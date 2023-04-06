import React from "react";
import toast from "react-hot-toast";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const ShowEthAddress = ({ address }: { address: string }) => {
  return (
    <div className="flex justify-start">
      <span>{`${address.slice(0, 3)}...${address.slice(address.length - 3, address.length)}`}</span>
      <ClipboardDocumentIcon
        className="h-4 w-4 my-auto"
        onClick={() => {
          navigator.clipboard.writeText(address);
          toast.success("Address copied successfully");
        }}
      />
    </div>
  );
};

export default ShowEthAddress;
