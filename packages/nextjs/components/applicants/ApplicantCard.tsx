import React, { useEffect, useState } from "react";
import { Applicant, Approval } from "@prisma/client";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { createApproval, getApprovalByApplicantId, getWorkPostingById } from "~~/utils/backend";
import ShowEthAddress from "~~/utils/showEthAddress";

const ApplicantCard = ({ application }: { application: Applicant }) => {
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const { address: ethAddress } = useAccount();
  const [applicationApproval, setApplicationApproval] = useState<Approval>();
  const [approvalLoading, setApprovalLoading] = useState<boolean>(false);
  const getApproval = async () => {
    const approval = await getApprovalByApplicantId(application?.id ?? "");
    if (approval.id) {
      setApplicationApproval(approval);
    }
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
  useEffect(() => {
    (async () => {
      const workPosting = await getWorkPostingById(application?.workPostingId ?? "");
      setIsCreator(workPosting.walletAddress === ethAddress);
      getApproval();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethAddress]);
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <ShowEthAddress address={application.walletAddress ?? ""} />
          {applicationApproval?.id && <div className="badge badge-success">Approved</div>}
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
              <button disabled={approvalLoading} className={`btn btn-primary ${approvalLoading ? "loading" : ""}`}>
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
