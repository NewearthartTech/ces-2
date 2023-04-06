import React, { useState } from "react";
import { WorkPosting } from "@prisma/client";
import { useAccount } from "wagmi";
import { ListingForm } from "~~/components/listings/ListingForm";
import { createWorkPosting } from "~~/utils/backend";

const CreateListing = () => {
  const [generatedLink, setGeneratedLink] = useState<string>();
  const [failed, setFailed] = useState<boolean>();
  const { address: ethAddress } = useAccount();
  const generateLink = async (listing: WorkPosting) => {
    try {
      // TODO Add contract Bounty ID
      // const contractBountyId = isMetamaskConnected && signer ? await postReward(signer, listing.price!) : 0;
      const newListing = {
        ...listing,
        id: undefined,
        price: Number(listing.price),
        walletAddress: ethAddress ?? "",
        //contractRewardId,
      };
      const generatedWorkPosting = await createWorkPosting(newListing);
      setGeneratedLink(
        `${process.env.NODE_ENV === "development" ? "http://" : "https://"}${window.location.host}/listing/${
          generatedWorkPosting.id
        }`,
      );
    } catch (e: any) {
      console.log(e);
      setFailed(true);
    }
  };
  return (
    <div className="mx-auto">
      <div className="mx-auto p-3">
        <h3 className="text-3xl">Create Job listing</h3>
        <ListingForm
          submitLabel="Create new Job Listing"
          onSubmit={async listing => {
            await generateLink(listing);
          }}
        />
      </div>
      {generatedLink && (
        <div className="alert alert-success shadow-lg my-2 max-w-fit">
          <div>
            Your work listing link:
            <a className="link link-warning" href={generatedLink}>
              {generatedLink}
            </a>
          </div>
        </div>
      )}
      {failed && !generatedLink && (
        <div className="alert alert-error shadow-lg my-2">Failed to create work listing</div>
      )}
    </div>
  );
};

export default CreateListing;
