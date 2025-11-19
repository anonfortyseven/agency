

import { 
  User, UserRole, Organization, Project, ProjectStatus, 
  Milestone, MilestoneStatus, Message, FileRecord, ApprovalItem, ApprovalStatus 
} from '../types';

// --- SEED DATA ---

export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Sarah Producer',
    email: 'admin@validate.com',
    password: 'password', // Default for testing
    role: UserRole.ADMIN,
    avatarUrl: 'https://picsum.photos/id/64/200/200',
    jobTitle: 'Executive Producer',
    phone: '555-0101'
  },
  {
    id: 'u2',
    name: 'Mike Client',
    email: 'mike@sdc.com',
    password: 'password',
    role: UserRole.CLIENT,
    organizationId: 'org1',
    avatarUrl: 'https://picsum.photos/id/91/200/200',
    jobTitle: 'Marketing Director',
    phone: '555-0202'
  }
];

export const ORGS: Organization[] = [
  {
    id: 'org1',
    name: 'Silver Dollar City',
    primaryContactName: 'Mike Client',
    primaryContactEmail: 'mike@sdc.com'
  },
  {
    id: 'org2',
    name: 'Big Cedar Lodge',
    primaryContactName: 'Jenny Marketing',
    primaryContactEmail: 'jenny@bigcedar.com'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    organizationId: 'org1',
    name: 'Spring Brand Film',
    description: 'A 60-second cinematic brand anthem showcasing the new park expansion and spring aesthetic.',
    status: ProjectStatus.POST_PRODUCTION,
    startDate: '2023-03-01',
    dueDate: '2023-05-15'
  },
  {
    id: 'p2',
    organizationId: 'org1',
    name: 'Holiday Campaign',
    description: 'Series of 15s spots for the Christmas festival.',
    status: ProjectStatus.PRE_PRODUCTION,
    startDate: '2023-06-01',
    dueDate: '2023-10-01'
  }
];

export const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    projectId: 'p1',
    title: 'Concept Approval',
    dueDate: '2023-03-10',
    status: MilestoneStatus.COMPLETED
  },
  {
    id: 'm2',
    projectId: 'p1',
    title: 'Principal Photography',
    dueDate: '2023-04-01',
    status: MilestoneStatus.COMPLETED
  },
  {
    id: 'm3',
    projectId: 'p1',
    title: 'Rough Cut Delivery',
    dueDate: '2023-04-20',
    status: MilestoneStatus.IN_PROGRESS
  },
  {
    id: 'm4',
    projectId: 'p1',
    title: 'Final Delivery',
    dueDate: '2023-05-15',
    status: MilestoneStatus.NOT_STARTED
  }
];

export const MESSAGES: Message[] = [
  {
    id: 'msg1',
    projectId: 'p1',
    senderId: 'u1',
    senderName: 'Sarah Producer',
    isInternal: false,
    body: 'Hi Mike! Just uploaded the first look at the color grade. Let us know what you think.',
    createdAt: '2023-04-18T10:00:00Z'
  },
  {
    id: 'msg2',
    projectId: 'p1',
    senderId: 'u2',
    senderName: 'Mike Client',
    isInternal: false,
    body: 'Looks fantastic Sarah. The warmth in the golden hour shots is perfect.',
    createdAt: '2023-04-18T11:30:00Z'
  },
  {
    id: 'msg3',
    projectId: 'p1',
    senderId: 'u1',
    senderName: 'Sarah Producer',
    isInternal: true,
    body: 'Note to editor: Fix the stabilizer warp in shot 4 before sending V2.',
    createdAt: '2023-04-19T09:00:00Z'
  }
];

export const FILES: FileRecord[] = [
  {
    id: 'f1',
    projectId: 'p1',
    uploadedById: 'u1',
    uploadedByName: 'Sarah Producer',
    fileName: 'Brand_Voiceover_Script_v3.pdf',
    fileType: 'pdf',
    fileSize: '2.4 MB',
    isClientVisible: true,
    createdAt: '2023-03-15T14:00:00Z',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'f2',
    projectId: 'p1',
    uploadedById: 'u2',
    uploadedByName: 'Mike Client',
    fileName: 'SDC_Logo_Reference.jpg',
    fileType: 'jpg',
    fileSize: '1.5 MB',
    isClientVisible: true,
    createdAt: '2023-03-12T09:00:00Z',
    url: 'https://picsum.photos/id/1018/1000/600'
  },
  {
    id: 'f3',
    projectId: 'p1',
    uploadedById: 'u1',
    uploadedByName: 'Sarah Producer',
    fileName: 'Budget_Breakdown_Internal.csv',
    fileType: 'csv',
    fileSize: '1 MB',
    isClientVisible: false, // Internal only
    createdAt: '2023-03-01T10:00:00Z',
    url: 'https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv'
  },
  {
    id: 'f4',
    projectId: 'p1',
    uploadedById: 'u1',
    uploadedByName: 'Sarah Producer',
    fileName: 'Moodboard_v1.jpg',
    fileType: 'jpg',
    fileSize: '3.2 MB',
    isClientVisible: true,
    createdAt: '2023-03-10T11:00:00Z',
    url: 'https://picsum.photos/id/24/1000/800'
  }
];

export const APPROVALS: ApprovalItem[] = [
  {
    id: 'a1',
    projectId: 'p1',
    title: 'Latest Cut - 60s Spot',
    description: 'Addressing color and pacing notes. Updated music track included.',
    linkToReview: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    status: ApprovalStatus.PENDING
  }
];

// --- MOCK API SERVICE ---

export const mockApi = {
  login: async (email: string, password?: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user) {
          // Simple mock validation: check password if one is set on the user
          if (user.password && user.password !== password) {
            resolve(null);
            return;
          }
        }
        resolve(user || null);
      }, 800);
    });
  },

  // Org Management
  getOrgs: async (): Promise<Organization[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...ORGS]), 400));
  },
  getOrg: async (id: string): Promise<Organization | undefined> => {
    return new Promise(resolve => setTimeout(() => resolve(ORGS.find(o => o.id === id)), 400));
  },
  saveOrg: async (org: Organization): Promise<Organization> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const idx = ORGS.findIndex(o => o.id === org.id);
        if (idx >= 0) {
          ORGS[idx] = org;
        } else {
          ORGS.push(org);
        }
        resolve(org);
      }, 400);
    });
  },
  deleteOrg: async (id: string): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const idx = ORGS.findIndex(o => o.id === id);
        if (idx >= 0) ORGS.splice(idx, 1);
        resolve();
      }, 400);
    });
  },

  // User Management
  getUsers: async (): Promise<User[]> => {
     return new Promise(resolve => setTimeout(() => resolve([...USERS]), 400));
  },
  saveUser: async (user: User): Promise<User> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const idx = USERS.findIndex(u => u.id === user.id);
        if (idx >= 0) {
          USERS[idx] = user;
        } else {
          USERS.push(user);
        }
        resolve(user);
      }, 400);
    });
  },
  deleteUser: async (id: string): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const idx = USERS.findIndex(u => u.id === id);
        if (idx >= 0) USERS.splice(idx, 1);
        resolve();
      }, 400);
    });
  },

  getProjects: async (user: User): Promise<Project[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (user.role === UserRole.ADMIN) {
          resolve(PROJECTS);
        } else {
          resolve(PROJECTS.filter(p => p.organizationId === user.organizationId));
        }
      }, 500);
    });
  },

  getProjectDetails: async (projectId: string) => {
    return new Promise<{project: Project, milestones: Milestone[], messages: Message[], files: FileRecord[], approvals: ApprovalItem[]}>(resolve => {
      setTimeout(() => {
        resolve({
          project: PROJECTS.find(p => p.id === projectId)!,
          milestones: MILESTONES.filter(m => m.projectId === projectId).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
          messages: MESSAGES.filter(m => m.projectId === projectId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
          files: FILES.filter(f => f.projectId === projectId),
          approvals: APPROVALS.filter(a => a.projectId === projectId)
        });
      }, 600);
    });
  },

  // Milestone Management
  saveMilestone: async (milestone: Milestone): Promise<Milestone> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const idx = MILESTONES.findIndex(m => m.id === milestone.id);
        if (idx >= 0) {
          MILESTONES[idx] = milestone;
        } else {
          MILESTONES.push(milestone);
        }
        resolve(milestone);
      }, 400);
    });
  },
  deleteMilestone: async (id: string): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const idx = MILESTONES.findIndex(m => m.id === id);
        if (idx >= 0) MILESTONES.splice(idx, 1);
        resolve();
      }, 400);
    });
  },

  sendMessage: async (projectId: string, sender: User, body: string, isInternal: boolean, approvalItemId?: string): Promise<Message> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newMsg: Message = {
          id: `msg${Date.now()}`,
          projectId,
          senderId: sender.id,
          senderName: sender.name,
          isInternal,
          body,
          createdAt: new Date().toISOString(),
          approvalItemId
        };
        MESSAGES.push(newMsg); // Persist to mock store
        resolve(newMsg);
      }, 300);
    });
  },
  
  uploadFile: async (file: FileRecord): Promise<FileRecord> => {
    return new Promise(resolve => {
      setTimeout(() => {
        FILES.unshift(file); // Add to beginning of list
        resolve(file);
      }, 800);
    });
  },

  getStats: async () => {
    return {
      activeProjects: PROJECTS.length,
      totalOrgs: ORGS.length,
      pendingApprovals: APPROVALS.filter(a => a.status === ApprovalStatus.PENDING).length
    };
  }
};