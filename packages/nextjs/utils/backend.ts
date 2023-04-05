import { Applicant, Approval, WorkPosting } from "@prisma/client";

export async function getAllListingsByPageNumberAndContentNumber(
  pageNumber: number,
  contentNumber: number,
): Promise<WorkPosting[]> {
  const r = await fetch(`/workpostings/${pageNumber}/${contentNumber}`);
  const body = await r.json();
  return body;
}
export async function getMyListings(address: string): Promise<WorkPosting[]> {
  const r = await fetch(`/workpostings/mylistings/${address}`);
  const body = await r.json();
  return body;
}
export async function getWorkPostingById(id: string): Promise<WorkPosting> {
  const r = await fetch(`/workpostings/${id}`);
  const body = await r.json();
  return body;
}
export async function getWorkPostingsTotalCount() {
  const r = await fetch(`/workpostings/totalcount`);
  const body = await r.json();
  return body;
}
export async function createWorkPosting(workPosting: WorkPosting): Promise<WorkPosting> {
  const r = await fetch(`/workpostings`, {
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
  const r = await fetch(`/applicants/${id}`);
  const body = await r.json();
  return body;
}

export async function getMyWorkAndApplicantsByWorkPostingId(
  id: string,
): Promise<{ applicants: Applicant[]; workPosting: WorkPosting }> {
  const r = await fetch(`/applicants/myapplicants/${id}`);
  const body = await r.json();
  return body;
}
export async function createApplicant(applicant: Applicant): Promise<Applicant> {
  const r = await fetch(`/applicants`, {
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
  const r = await fetch(`/applicants/myapplications/${address}`);
  const body = await r.json();
  return body;
}

// Work approvals
export async function createApproval(approval: Approval): Promise<Approval> {
  const r = await fetch(`/approvals`, {
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
  const r = await fetch(`/approvals/myapprovals/${address}`);
  const body = await r.json();
  return body;
}

export async function getApprovalById(id: string): Promise<Approval> {
  const r = await fetch(`/approvals/${id}`);
  const body = await r.json();
  return body;
}
export async function getApprovalByApplicantId(id: string): Promise<Approval> {
  const r = await fetch(`/approvals/application/${id}`);
  const body = await r.json();
  return body;
}
