/* eslint-disable @next/next/no-img-element */
import React from "react";
import { WorkPosting } from "@prisma/client";

const ListingCard = ({ listing }: { listing: WorkPosting }) => {
  return (
    <div className="card w-84 bg-base-100 shadow-xl m-2">
      {listing.image && (
        <figure>
          <img src={listing.image} alt="" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{listing.title}</h2>
        <p>{listing.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-warning">Read more</button>
          <button className="btn btn-primary">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
