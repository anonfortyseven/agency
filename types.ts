
export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}

export enum ProjectStatus {
  DISCOVERY = 'Discovery',
  PRE_PRODUCTION = 'Pre-Production',
  PRODUCTION = 'Production',
  POST_PRODUCTION = 'Post-Production',
  ON_HOLD = 'On Hold',
  DELIVERED = 'Delivered',
  ARCHIVED = 'Archived'
}

export enum MilestoneStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  BLOCKED = 'Blocked'
}

export enum ApprovalStatus {
  PENDING = 'Pending Review',
  APPROVED = 'Approved',
  CHANGES_REQUESTED = 'Changes Requested'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  avatarUrl?: string;
  // Extended fields
  password?: string;
  jobTitle?: string;
  phone?: string;
}

export interface Organization {
  id: string;
  name: string;
  primaryContactName: string;
  primaryContactEmail: string;
}

export interface Project {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  dueDate?: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  dueDate: string;
  status: MilestoneStatus;
}

export interface Message {
  id: string;
  projectId: string;
  senderId: string;
  senderName: string;
  isInternal: boolean;
  body: string;
  createdAt: string;
  approvalItemId?: string; // Optional link to a specific approval item
}

export interface FileRecord {
  id: string;
  projectId: string;
  uploadedById: string;
  uploadedByName: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  isClientVisible: boolean;
  createdAt: string;
  url: string;
}

export interface ApprovalItem {
  id: string;
  projectId: string;
  title: string;
  description: string;
  linkToReview: string;
  status: ApprovalStatus;
}

// Navigation Types
export type View = 
  | { name: 'LOGIN' }
  | { name: 'DASHBOARD' }
  | { name: 'PROJECT_DETAIL'; projectId: string }
  | { name: 'ADMIN_CLIENTS' }
  | { name: 'ADMIN_ORG_DETAIL'; orgId: string }
  | { name: 'ADMIN_SETTINGS' };
