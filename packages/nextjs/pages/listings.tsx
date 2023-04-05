import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import { WorkPosting } from "@prisma/client";
import type { GetServerSideProps } from "next";
import ListingCard from "~~/components/listings/ListingCard";

const Listings = ({ workListings }: { workListings: WorkPosting[] }) => {
  return (
    <>
      <Head>
        <title>Listings</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-3">
        {workListings.map(listing => (
          <ListingCard listing={listing} key={listing.id} />
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ workListings: WorkPosting[] }> = async () => {
  const prisma = new PrismaClient();
  const page = 1; // Assuming you want to fetch the first page
  const itemsPerPage = 12; // Assuming you want to fetch 12 items per page

  const workListings = await prisma.workPosting.findMany({
    skip: (page - 1) * itemsPerPage,
    take: itemsPerPage,
  });
  return {
    props: {
      workListings,
    },
  };
};
export default Listings;
