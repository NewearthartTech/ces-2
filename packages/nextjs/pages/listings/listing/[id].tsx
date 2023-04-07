import React, { useState } from "react";
import { Applicant, PrismaClient, WorkPosting } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useAccount } from "wagmi";
import ApplicantCard from "~~/components/applicants/ApplicantCard";
import ApplicantModal from "~~/components/applicants/ApplicantModal";

const ListingPage = ({ listing, applicants }: { listing: WorkPosting | null; applicants: Applicant[] }) => {
  const [visibleApplication, setVisibleApplication] = useState<boolean>();
  const { address: ethAddress } = useAccount();
  if (!listing?.id) return <h2 className="p-4 mx-auto">Listing not found</h2>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {listing.image && (
          <figure>
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img src={listing.image} alt="" className="max-h-96" />
            }
          </figure>
        )}
        <h1 className="text-3xl font-bold mt-8 mb-4">{listing.title}</h1>
        {listing.price && <p className="text-2xl font-bold mb-4">{listing.price} MATIC</p>}
        <p className="text-lg mb-8">{listing.description}</p>
        {listing.discordServerLink && (
          <a
            href={listing.discordServerLink}
            className="btn btn-secondary mr-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord
          </a>
        )}
        {listing.link && (
          <a href={listing.link} className="btn btn-warning" target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        )}
        {ethAddress !== listing.walletAddress && (
          <button onClick={() => setVisibleApplication(true)} className="btn btn-primary">
            Apply
          </button>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Applicants</h2>
          {applicants.length === 0 && <p>No applicants yet.</p>}
          {applicants.map(applicant => (
            <React.Fragment key={applicant.id}>
              <ApplicantCard application={applicant} />
            </React.Fragment>
          ))}
        </div>
      </div>
      {visibleApplication && listing.id && ethAddress !== listing.walletAddress && (
        <ApplicantModal listingId={listing.id} isOpen={visibleApplication} setIsOpen={setVisibleApplication} />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{ listing: WorkPosting | null }> = async ctx => {
  const prisma = new PrismaClient();
  const id = ctx.params?.id;
  const listing = await prisma.workPosting.findFirst({
    where: { id: id as string },
  });
  const applicants = await prisma.applicant.findMany({
    where: { workPostingId: listing?.id },
  });
  return {
    props: {
      listing,
      applicants,
    },
  };
};
export default ListingPage;
