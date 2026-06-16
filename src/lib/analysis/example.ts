import type { AmbiguityFinding } from "@/lib/analysis/schema";
import { computeClarityScore } from "@/lib/analysis/score";

export const EXAMPLE_SPEC = `Expense Report System — Product Specification

Employees submit expense reports for reimbursement. Finance processes approved reports weekly.

Submission
Employees fill out an expense report with: merchant name, expense date, amount, category (Travel, Meals, Software, Office Supplies, Other), and a description. A receipt must be uploaded for every expense. Submitted reports enter a "Pending" state.

Employees cannot submit expenses older than 90 days.

Approval
The employee's manager is notified when a new report is submitted. The manager reviews the report and either approves or rejects it. On rejection, the employee receives a reason and may resubmit.

High-value expenses require sign-off from Finance before they are processed.

Managers cannot approve their own expenses.

Reimbursement
Approved expenses are exported by Finance and employees are reimbursed via bank transfer.

Duplicate Detection
The system flags duplicate submissions. Flagged reports are held for review.`;

export const EXAMPLE_FINDINGS: AmbiguityFinding[] = [
  {
    id: "a1b2c3d4-e5f6-4789-8abc-000000000001",
    category: "underspecified",
    severity: "critical",
    excerpt: "High-value expenses require sign-off from Finance before they are processed.",
    issue: "No monetary threshold is defined for 'high-value', so developers cannot implement the routing logic without guessing.",
    question: "What is the exact amount threshold above which Finance sign-off is required?",
  },
  {
    id: "a1b2c3d4-e5f6-4789-8abc-000000000002",
    category: "scope_gap",
    severity: "high",
    excerpt: "Managers cannot approve their own expenses.",
    issue: "No escalation path is defined — if the manager is also the submitter, the approval is blocked with no fallback owner.",
    question: "Who approves an expense when the submitter is also the designated approver, and how is that person determined?",
  },
  {
    id: "a1b2c3d4-e5f6-4789-8abc-000000000003",
    category: "undefined_term",
    severity: "high",
    excerpt: "The system flags duplicate submissions. Flagged reports are held for review.",
    issue: "'Duplicate' is undefined — same amount, same merchant, same date, or some combination — leaving detection logic open to multiple interpretations.",
    question: "What exact combination of fields (merchant, amount, date, category) must match for a report to be considered a duplicate?",
  },
  {
    id: "a1b2c3d4-e5f6-4789-8abc-000000000004",
    category: "missing_edge_case",
    severity: "high",
    excerpt: "employees are reimbursed via bank transfer",
    issue: "No behavior is defined for employees who have not set up bank account details, which could silently block reimbursement.",
    question: "What happens when an employee's bank details are missing or invalid at the time of reimbursement export?",
  },
  {
    id: "a1b2c3d4-e5f6-4789-8abc-000000000005",
    category: "implicit_assumption",
    severity: "medium",
    excerpt: "The employee's manager is notified when a new report is submitted.",
    issue: "The spec assumes every employee has a manager assigned, but defines no behavior for employees without one.",
    question: "What happens when an employee has no manager assigned — who receives the notification and who approves the expense?",
  },
  {
    id: "a1b2c3d4-e5f6-4789-8abc-000000000006",
    category: "underspecified",
    severity: "medium",
    excerpt: "Employees cannot submit expenses older than 90 days.",
    issue: "It is unclear whether '90 days' is measured from the expense date or the receipt date, which differ for recurring or delayed submissions.",
    question: "Is the 90-day limit measured from the expense date on the receipt or the date the employee submits the report?",
  },
];

export const EXAMPLE_CLARITY_SCORE = computeClarityScore(EXAMPLE_FINDINGS);

// Shorter sample used on the /analyze page "Try sample spec" link (different from landing demo)
export const SAMPLE_SPEC = `Team Invitation Feature

Users can invite others to join their workspace by entering an email address. An invitation email is sent to the recipient with a link to accept.

If the recipient already has an account, they are added to the workspace immediately after accepting. If not, they are prompted to sign up first.

Workspace owners can manage pending invitations. Invitations expire after some time. Members can invite others unless the owner has disabled this setting.

Users can be removed from a workspace by the owner. Removed users lose access immediately.`;
