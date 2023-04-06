import { Applicant, Approval, WorkPosting } from "@prisma/client";

export async function getAllListingsByPageNumberAndContentNumber(
  pageNumber: number,
  contentNumber: number,
): Promise<WorkPosting[]> {
  const r = await fetch(`/api/workpostings/${pageNumber}/${contentNumber}`);
  const body = await r.json();
  return body;
}
export async function getMyListings(address: string): Promise<WorkPosting[]> {
  const r = await fetch(`/api/workpostings/mylistings/${address}`);
  const body = await r.json();
  return body;
}
export async function getWorkPostingById(id: string): Promise<WorkPosting> {
  const r = await fetch(`/api/workpostings/${id}`);
  const body = await r.json();
  return body;
}
export async function getWorkPostingsTotalCount() {
  const r = await fetch(`/api/workpostings/totalcount`);
  const body = await r.json();
  return body;
}
export async function createWorkPosting(workPosting: {
  id?: string;
  title: string | null;
  link: string | null;
  discordServerLink: string | null;
  image: string | null;
  price: number | null;
  description: string | null;
  walletAddress: string | null;
}): Promise<WorkPosting> {
  const r = await fetch(`/api/workpostings`, {
    method: "post",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(workPosting),
  });
  if (r.status !== 500) {
    const body = await r.json();
    return body;
  } else {
    throw Error(await r.text());
  }
}

// Work Applications
export async function getApplicantById(id: string): Promise<Applicant> {
  const r = await fetch(`/api/applicants/${id}`);
  const body = await r.json();
  return body;
}

export async function getMyWorkAndApplicantsByWorkPostingId(
  id: string,
): Promise<{ applicants: Applicant[]; workPosting: WorkPosting }> {
  const r = await fetch(`/api/applicants/myapplicants/${id}`);
  const body = await r.json();
  return body;
}
export async function createApplicant(applicant: {
  id?: string;
  workPostingId: string;
  walletAddress: string | null;
  description: string | null;
  userLink: string | null;
}): Promise<Applicant> {
  const r = await fetch(`/api/applicants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicant),
  });
  const body = await r.json();
  return body;
}
export async function getMyApplications(address: string): Promise<Applicant[]> {
  const r = await fetch(`/api/applicants/myapplications/${address}`);
  const body = await r.json();
  return body;
}

// Work approvals
export async function createApproval(approval: {
  id?: string;
  workpostingId: string;
  applicantId: string;
  applicantWalletAddress: string | null;
  creatorWalletAddress: string | null;
}): Promise<Approval> {
  const r = await fetch(`/api/approvals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(approval),
  });
  const body = await r.json();
  return body;
}

export async function getMyApprovals(address: string): Promise<Approval[]> {
  const r = await fetch(`/api/approvals/myapprovals/${address}`);
  const body = await r.json();
  return body;
}

export async function getApprovalById(id: string): Promise<Approval> {
  const r = await fetch(`/api/approvals/${id}`);
  const body = await r.json();
  return body;
}
export async function getApprovalByApplicantId(id: string): Promise<Approval> {
  const r = await fetch(`/api/approvals/application/${id}`);
  const body = await r.json();
  return body;
}
