import Head from "next/head";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { WorkPosting } from "@prisma/client";
import type { GetServerSideProps } from "next";
import ListingCard from "~~/components/listings/ListingCard";

const ListingsPage = ({ workListings, pageCount }: { workListings: WorkPosting[]; pageCount: number }) => {
  const router = useRouter();
  const { page } = router.query;
  return (
    <>
      <Head>
        <title>Listings</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      {workListings.length < 1 && <h3 className="mx-auto my-3 text-lg">No listings found</h3>}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-3">
        {workListings.map(listing => (
          <ListingCard listing={listing} key={listing.id} />
        ))}
      </div>
      <div className="btn-group mx-auto">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            onClick={() => router.push(`/listings/${index + 1}`)}
            className={`btn btn-md ${index + 1 === Number(page) ? "btn-active" : ""}`}
            key={index}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ workListings: WorkPosting[] }> = async context => {
  const prisma = new PrismaClient();
  const page = Number(context.params?.page); // Assuming you want to fetch the first page
  const itemsPerPage = 12; // Assuming you want to fetch 12 items per page

  const workListings = await prisma.workPosting.findMany({
    skip: (page - 1) * itemsPerPage,
    take: itemsPerPage,
  });
  const totalCount = await prisma.workPosting.count();
  return {
    props: {
      workListings,
      pageCount: Math.ceil(totalCount / itemsPerPage),
    },
  };
};
export default ListingsPage;
