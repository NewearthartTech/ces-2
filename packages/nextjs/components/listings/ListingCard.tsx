/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import ApplicantModal from "../applicants/ApplicantModal";
import { WorkPosting } from "@prisma/client";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const ListingCard = ({ listing }: { listing: WorkPosting }) => {
  const router = useRouter();
  const [visibleApplication, setVisibleApplication] = useState<boolean>();
  const { address: ethAddress } = useAccount();
  const { data: listingAmount } = useScaffoldContractRead({
    contractName: "NowOrLater",
    functionName: "getWorkListingAmount",
    args: [BigNumber.from(listing.contractBountyId)],
  });
  return (
    <div className="card w-84 bg-base-100 shadow-xl m-2 max-h-94">
      {listing.image && (
        <figure>
          <img src={listing.image} alt="" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{listing.title}</h2>
        {listingAmount === BigNumber.from(0) && <div className="badge badge-warning gap-2">Work Claimed</div>}
        <p>{listing.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-warning" onClick={() => router.push(`/listings/listing/${listing.id}`)}>
            Read more
          </button>
          {ethAddress !== listing.walletAddress && (
            <button onClick={() => setVisibleApplication(true)} className="btn btn-primary">
              Apply
            </button>
          )}
        </div>
      </div>
      {visibleApplication && listing.id && ethAddress !== listing.walletAddress && (
        <ApplicantModal listingId={listing.id} isOpen={visibleApplication} setIsOpen={setVisibleApplication} />
      )}
    </div>
  );
};

export default ListingCard;
