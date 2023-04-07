import React, { useEffect, useState } from "react";
import { Applicant, Approval, WorkPosting } from "@prisma/client";
import { BigNumber, ethers } from "ethers";
import toast from "react-hot-toast";
import { useAccount, useContract, useSigner } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import {
  createApproval,
  getApprovalByApplicantId,
  getWorkPostingById,
  successApplicantPayment,
} from "~~/utils/backend";
import ShowEthAddress from "~~/utils/showEthAddress";

const ApplicantCard = ({ application }: { application: Applicant }) => {
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const { address: ethAddress } = useAccount();
  const [applicationApproval, setApplicationApproval] = useState<Approval>();
  const [approvalLoading, setApprovalLoading] = useState<boolean>(false);
  const [workListing, setWorkListing] = useState<WorkPosting>();
  const { data: nowOrLaterContract } = useDeployedContractInfo("NowOrLater");
  const { data: signer } = useSigner();
  const [payed, setPayed] = useState<boolean>(application.paid);
  const contract = useContract({
    address: nowOrLaterContract?.address,
    abi: nowOrLaterContract?.abi,
    signerOrProvider: signer,
  });
  const { data: listingAmount } = useScaffoldContractRead({
    contractName: "NowOrLater",
    functionName: "getWorkListingAmount",
    args: [BigNumber.from(workListing?.contractBountyId ?? 0)],
  });
  const updatePaymentStat = async () => {
    const r = await successApplicantPayment(application);
    setPayed(r.paid);
  };
  useScaffoldEventSubscriber({
    contractName: "NowOrLater",
    eventName: "Paid_Applicant",
    listener: async (id: any, applicantAddress: any, _amount: any, _isPartialPayment: any) => {
      if (applicantAddress === application.walletAddress && id.toNumber() === workListing?.contractBountyId) {
        toast.success("Applicant paid successfully");

        await updatePaymentStat();
        console.log(id, applicantAddress, _amount, _isPartialPayment);
        setApprovalLoading(false);
      }
    },
  });
  const getApproval = async () => {
    try {
      const approval = await getApprovalByApplicantId(application?.id ?? "");
      if (approval.id) {
        setApplicationApproval(approval);
      }
    } catch {}
  };
  const generateApproval = async () => {
    try {
      setApprovalLoading(true);
      const approval = await createApproval({
        applicantId: application?.id ?? "",
        creatorWalletAddress: ethAddress ?? "",
        applicantWalletAddress: application.walletAddress,
        workpostingId: application.workPostingId,
      });
      setApplicationApproval(approval);
      toast.success("Approval created");
    } catch {
      toast.error("Failed to approve application");
    }
    setApprovalLoading(false);
  };
  const sendPayment = async () => {
    setApprovalLoading(true);
    const tx = await contract?.PayApplication(
      BigNumber.from(workListing?.contractBountyId),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      application.walletAddress!,
      ethers.utils.parseEther(workListing?.price?.toString() ?? "0"),
      false,
    );
    await tx?.wait();
  };
  useEffect(() => {
    (async () => {
      const workPosting = await getWorkPostingById(application?.workPostingId ?? "");
      setWorkListing(workPosting);
      setIsCreator(workPosting.walletAddress === ethAddress);
      console.log(isCreator);
      getApproval();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethAddress]);
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <ShowEthAddress address={application.walletAddress ?? ""} />
          {!payed && applicationApproval?.id && <div className="badge badge-success">Approved</div>}
          {payed && <div className="badge badge-success">Paid</div>}
        </h2>
        {application.userLink && (
          <a className="link link-primary text-yellow-300" href={application.userLink}>
            More user info
          </a>
        )}
        <p>{application.description}</p>

        {isCreator && (
          <div className="card-actions justify-end">
            {!applicationApproval?.id ? (
              <button
                disabled={approvalLoading}
                className={`btn btn-primary ${approvalLoading ? "loading" : ""}`}
                onClick={() => generateApproval()}
              >
                Approve
              </button>
            ) : (
              <button
                disabled={approvalLoading || listingAmount === BigNumber.from(0)}
                onClick={() => sendPayment()}
                className={`btn btn-primary ${approvalLoading ? "loading" : ""}`}
              >
                Pay user
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantCard;
