import React, { useState, useEffect, useRef } from 'react';
import { 
  User, UserRole, Project, Message, FileRecord, ApprovalItem, View, Organization,
  MilestoneStatus, ProjectStatus, Milestone, ApprovalStatus
} from './types';
import { mockApi, USERS } from './services/mockData';
import { Button, Input, TextArea, Card, StatusBadge, Modal, Select } from './components/UI';
import { 
  LayoutDashboard, Users, Settings, LogOut, 
  ChevronRight, Clock, Paperclip, Send, Download, FileText, 
  CheckCircle2, UploadCloud, Loader2, Image as ImageIcon, Lock, Trash2, Edit, Plus, Mail, Pencil, Calendar, Eye, ExternalLink, AlertCircle
} from 'lucide-react';

// --- HELPER FUNCTIONS ---
const getVimeoEmbedUrl = (url: string): string | null => {
  // Matches standard Vimeo URLs: https://vimeo.com/123456789
  // Matches private Vimeo URLs: https://vimeo.com/123456789/abcdef123
  const match = url.match(/vimeo\.com\/(\d+)(?:\/([a-zA-Z0-9]+))?/);
  if (match) {
    const id = match[1];
    const hash = match[2];
    let src = `https://player.vimeo.com/video/${id}`;
    if (hash) src += `?h=${hash}`;
    // Add parameters for clean embed
    src += `${src.includes('?') ? '&' : '?'}title=0&byline=0&portrait=0`;
    return src;
  }
  return null;
};

// --- GLOBAL STATE ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>({ name: 'LOGIN' });

  // Simple navigation handler
  const navigate = (newView: View) => setView(newView);

  // --- VIEWS ---

  if (!user || view.name === 'LOGIN') {
    return <LoginView onLogin={(u) => { setUser(u); setView({ name: 'DASHBOARD' }); }} />;
  }

  return (
    <div className="flex h-screen bg-brand-black text-brand-text overflow-hidden">
      <Sidebar user={user} currentView={view} navigate={navigate} onLogout={() => setUser(null)} />
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        {view.name === 'DASHBOARD' && <DashboardView user={user} navigate={navigate} />}
        {view.name === 'PROJECT_DETAIL' && <ProjectDetailView user={user} projectId={view.projectId} navigate={navigate} />}
        {view.name === 'ADMIN_CLIENTS' && <AdminClientsView navigate={navigate} />}
        {view.name === 'ADMIN_ORG_DETAIL' && <AdminOrgDetailView orgId={view.orgId} navigate={navigate} />}
        {view.name === 'ADMIN_SETTINGS' && <SettingsView user={user} />}
      </main>
    </div>
  );
}

// --- COMPONENT: LOGIN ---

const LoginView = ({ onLogin }: { onLogin: (u: User) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const user = await mockApi.login(email, password);
    setLoading(false);

    if (user) {
      onLogin(user);
    } else {
      setError('Invalid credentials. Try "admin@validate.com" / "password"');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black relative overflow-hidden">
      {/* Cinematic Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-brand-black to-brand-black z-0" />
      
      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-widest text-white uppercase mb-2">Validate</h1>
          <p className="text-zinc-500 text-sm tracking-wide uppercase">Client Portal</p>
        </div>
        
        <Card className="p-8 border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Password</label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full" isLoading={loading}>
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center text-xs text-zinc-600">
            <p>Try <span className="text-zinc-400 cursor-pointer hover:text-white" onClick={() => {setEmail('admin@validate.com'); setPassword('password');}}>admin@validate.com</span></p>
            <p className="mt-1">or <span className="text-zinc-400 cursor-pointer hover:text-white" onClick={() => {setEmail('mike@sdc.com'); setPassword('password');}}>mike@sdc.com</span></p>
            <p className="mt-1 opacity-50">(Password: "password")</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- COMPONENT: SIDEBAR ---

const Sidebar = ({ user, currentView, navigate, onLogout }: { user: User, currentView: View, navigate: (v: View) => void, onLogout: () => void }) => {
  const navItemClass = (isActive: boolean) => 
    `flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors mb-1 ${
      isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
    }`;

  return (
    <aside className="w-64 bg-brand-dark border-r border-brand-border flex-col hidden md:flex">
      <div className="p-6 border-b border-brand-border">
        <h2 className="text-xl font-light tracking-widest text-white uppercase cursor-pointer" onClick={() => navigate({name: 'DASHBOARD'})}>Validate</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="mb-6">
          <p className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Menu</p>
          <button onClick={() => navigate({ name: 'DASHBOARD' })} className={navItemClass(currentView.name === 'DASHBOARD')}>
            <LayoutDashboard className="w-4 h-4 mr-3" />
            Dashboard
          </button>
          {user.role === UserRole.ADMIN && (
            <button onClick={() => navigate({ name: 'ADMIN_CLIENTS' })} className={navItemClass(currentView.name === 'ADMIN_CLIENTS' || currentView.name === 'ADMIN_ORG_DETAIL')}>
              <Users className="w-4 h-4 mr-3" />
              Clients & Orgs
            </button>
          )}
          <button onClick={() => navigate({ name: 'ADMIN_SETTINGS' })} className={navItemClass(currentView.name === 'ADMIN_SETTINGS')}>
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-brand-border">
        <div className="flex items-center mb-4 px-3">
          <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-bold text-white">
             {user.name.charAt(0)}
          </div>
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start text-zinc-500 hover:text-red-400" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
};

// --- COMPONENT: DASHBOARD ---

const DashboardView = ({ user, navigate }: { user: User, navigate: (v: View) => void }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<any>(null);

  // New Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [newProject, setNewProject] = useState<Partial<Project>>({});

  useEffect(() => {
    mockApi.getProjects(user).then(setProjects);
    if (user.role === UserRole.ADMIN) {
      mockApi.getStats().then(setStats);
      // Load Orgs for the new project dropdown
      mockApi.getOrgs().then(setOrgs);
    }
  }, [user]);

  const handleOpenNewProject = () => {
    setNewProject({
      status: ProjectStatus.DISCOVERY,
      startDate: new Date().toISOString().split('T')[0]
    });
    setIsProjectModalOpen(true);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.organizationId) {
      alert("Please fill in required fields.");
      return;
    }

    const p: Project = {
      id: `p${Date.now()}`,
      organizationId: newProject.organizationId,
      name: newProject.name,
      description: newProject.description || '',
      status: newProject.status as ProjectStatus,
      startDate: newProject.startDate || new Date().toISOString().split('T')[0],
      dueDate: newProject.dueDate
    };

    await mockApi.saveProject(p);
    
    // Only update local project list if we are admin or if we belong to that org (though dashboard usually shows own projects)
    // Since we are creating, assume we are Admin. Admin dashboard shows ALL projects.
    if (user.role === UserRole.ADMIN) {
       setProjects(prev => [p, ...prev]);
       const s = await mockApi.getStats();
       setStats(s);
    }

    setIsProjectModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <header>
        <h1 className="text-2xl font-medium text-white mb-1">
          Welcome back, {user.name.split(' ')[0]}.
        </h1>
        <p className="text-zinc-400">
          {user.role === UserRole.ADMIN ? 'Overview of all agency activity.' : `Viewing projects for ${user.organizationId ? 'Silver Dollar City' : 'your organization'}.`}
        </p>
      </header>

      {user.role === UserRole.ADMIN && stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Active Projects</h3>
            <p className="text-3xl font-light text-white">{stats.activeProjects}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Client Orgs</h3>
            <p className="text-3xl font-light text-white">{stats.totalOrgs}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Pending Approvals</h3>
            <p className="text-3xl font-light text-blue-400">{stats.pendingApprovals}</p>
          </Card>
        </div>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-white">Active Projects</h2>
          {user.role === UserRole.ADMIN && (
            <Button 
              variant="secondary" 
              className="h-8 text-xs" 
              onClick={handleOpenNewProject}
            >
              <Plus className="w-3 h-3 mr-1.5" />
              New Project
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map(project => (
            <Card key={project.id} className="p-6 hover:bg-zinc-900 transition-colors group relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-white/90">{project.name}</h3>
                  <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{project.description}</p>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/50">
                <div className="flex items-center text-xs text-zinc-500">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  Due {project.dueDate || 'TBD'}
                </div>
                <Button variant="outline" className="text-xs h-8" onClick={() => navigate({ name: 'PROJECT_DETAIL', projectId: project.id })}>
                  View Project
                </Button>
              </div>
            </Card>
          ))}
          {projects.length === 0 && (
             <div className="col-span-full py-12 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-lg">
               No active projects.
             </div>
          )}
        </div>
      </section>

      {user.role === UserRole.CLIENT && (
        <section className="pt-8 border-t border-zinc-800">
          <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
          <div className="flex gap-4">
             <Button variant="secondary">Contact Producer</Button>
             <Button variant="outline">Upload Files</Button>
          </div>
        </section>
      )}

      {/* CREATE PROJECT MODAL */}
      <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title="Create New Project">
         <form onSubmit={handleCreateProject} className="space-y-4">
           <div>
              <label className="block text-xs text-zinc-400 mb-1">Client Organization *</label>
              <Select 
                value={newProject.organizationId || ''} 
                onChange={e => setNewProject(prev => ({...prev, organizationId: e.target.value}))}
                required
              >
                <option value="">Select Organization...</option>
                {orgs.map(org => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </Select>
           </div>

           <div>
              <label className="block text-xs text-zinc-400 mb-1">Project Name *</label>
              <Input 
                 value={newProject.name || ''} 
                 onChange={e => setNewProject(prev => ({...prev, name: e.target.value}))} 
                 placeholder="e.g. Summer Campaign 2024"
                 required
              />
           </div>

           <div>
              <label className="block text-xs text-zinc-400 mb-1">Description</label>
              <TextArea 
                 value={newProject.description || ''} 
                 onChange={e => setNewProject(prev => ({...prev, description: e.target.value}))} 
                 placeholder="Brief project summary..."
              />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Status</label>
                <Select 
                  value={newProject.status || ProjectStatus.DISCOVERY}
                  onChange={e => setNewProject(prev => ({...prev, status: e.target.value as ProjectStatus}))}
                >
                  {Object.values(ProjectStatus).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Select>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs text-zinc-400 mb-1">Start Date</label>
                 <div className="relative">
                   <Input 
                      type="date"
                      value={newProject.startDate || ''} 
                      onChange={e => setNewProject(prev => ({...prev, startDate: e.target.value}))} 
                   />
                   <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                 </div>
              </div>
              <div>
                 <label className="block text-xs text-zinc-400 mb-1">Due Date (Optional)</label>
                 <div className="relative">
                   <Input 
                      type="date"
                      value={newProject.dueDate || ''} 
                      onChange={e => setNewProject(prev => ({...prev, dueDate: e.target.value}))} 
                   />
                   <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                 </div>
              </div>
           </div>

           <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => setIsProjectModalOpen(false)}>Cancel</Button>
              <Button type="submit">Create Project</Button>
           </div>
         </form>
      </Modal>
    </div>
  );
};

// --- COMPONENT: PROJECT DETAIL ---

const ProjectDetailView = ({ user, projectId, navigate }: { user: User, projectId: string, navigate: (v: View) => void }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'files' | 'approvals'>('overview');
  const [data, setData] = useState<{project: Project, milestones: Milestone[], messages: Message[], files: FileRecord[], approvals: ApprovalItem[]} | null>(null);
  const [msgBody, setMsgBody] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  
  // Edit Project State
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [editProjectData, setEditProjectData] = useState<Partial<Project>>({});

  // Approval feedback state
  const [approvalInputs, setApprovalInputs] = useState<Record<string, string>>({});
  
  // Approval Modal State
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [editingApproval, setEditingApproval] = useState<Partial<ApprovalItem>>({});

  // Milestone Management State (Admin)
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Partial<Milestone>>({});

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    mockApi.getProjectDetails(projectId).then(setData);
  }, [projectId]);

  const handleSendMessage = async () => {
    if (!msgBody.trim() || !data) return;
    const newMsg = await mockApi.sendMessage(projectId, user, msgBody, isInternalNote, undefined);
    setData({ ...data, messages: [...data.messages, newMsg] });
    setMsgBody('');
    setIsInternalNote(false);
  };
  
  const handleSendApprovalFeedback = async (approvalId: string) => {
    const txt = approvalInputs[approvalId];
    if (!txt?.trim() || !data) return;

    const newMsg = await mockApi.sendMessage(projectId, user, txt, false, approvalId);
    setData({ ...data, messages: [...data.messages, newMsg] });
    setApprovalInputs(prev => ({ ...prev, [approvalId]: '' }));
  };

  const handleUpdateApprovalStatus = async (approval: ApprovalItem, status: ApprovalStatus) => {
    if (!data) return;
    const updated = { ...approval, status };
    await mockApi.saveApproval(updated);
    setData(prev => prev ? ({
        ...prev,
        approvals: prev.approvals.map(a => a.id === updated.id ? updated : a)
    }) : null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !data) return;

    setIsUploading(true);

    // Format size
    const size = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${(file.size / 1024).toFixed(1)} KB`;

    const newFile: FileRecord = {
      id: `f${Date.now()}`,
      projectId: projectId,
      uploadedById: user.id,
      uploadedByName: user.name,
      fileName: file.name,
      fileType: file.name.split('.').pop() || 'unknown',
      fileSize: size,
      isClientVisible: true, // Default to visible for now
      createdAt: new Date().toISOString(),
      url: URL.createObjectURL(file) // Create a temporary local URL
    };

    await mockApi.uploadFile(newFile);

    // Update local state
    setData(prev => prev ? { ...prev, files: [newFile, ...prev.files] } : null);
    
    setIsUploading(false);
    // Reset input
    if (fileInputRef.current) {
       fileInputRef.current.value = '';
    }
  };

  // Project Edit Handlers
  const handleEditProjectClick = () => {
    if (!data) return;
    setEditProjectData(data.project);
    setIsEditProjectOpen(true);
  };

  const handleSaveProjectDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data || !editProjectData.name) return;

    const updatedProject = {
      ...data.project,
      ...editProjectData
    } as Project;

    await mockApi.saveProject(updatedProject);
    setData({...data, project: updatedProject});
    setIsEditProjectOpen(false);
  };
  
  const handleDeleteProject = async () => {
    if (!data) return;
    
    await mockApi.deleteProject(data.project.id);
    
    // Navigate back to dashboard after deletion
    navigate({ name: 'DASHBOARD' });
    setIsEditProjectOpen(false);
  };

  // Milestone Handlers
  const openAddMilestone = () => {
    setEditingMilestone({
      projectId,
      title: '',
      dueDate: '',
      status: MilestoneStatus.NOT_STARTED
    });
    setIsMilestoneModalOpen(true);
  };

  const openEditMilestone = (milestone: Milestone) => {
    setEditingMilestone({ ...milestone });
    setIsMilestoneModalOpen(true);
  };

  const handleDeleteMilestone = async (milestoneId: string) => {
    await mockApi.deleteMilestone(milestoneId);
    setData(prev => prev ? ({ ...prev, milestones: prev.milestones.filter(m => m.id !== milestoneId) }) : null);
    setIsMilestoneModalOpen(false);
    setEditingMilestone({});
  };

  const handleDeleteMilestoneFromForm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editingMilestone.id) handleDeleteMilestone(editingMilestone.id);
  };

  const handleSaveMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMilestone.title || !editingMilestone.dueDate) return;

    const milestoneToSave = {
      id: editingMilestone.id || `m${Date.now()}`,
      projectId: projectId,
      title: editingMilestone.title,
      dueDate: editingMilestone.dueDate,
      status: editingMilestone.status || MilestoneStatus.NOT_STARTED,
      description: editingMilestone.description
    } as Milestone;

    const saved = await mockApi.saveMilestone(milestoneToSave);
    
    setData(prevData => {
      if (!prevData) return null;
      const exists = prevData.milestones.find(m => m.id === saved.id);
      let newMilestones;
      if (exists) {
        newMilestones = prevData.milestones.map(m => m.id === saved.id ? saved : m);
      } else {
        newMilestones = [...prevData.milestones, saved];
      }
      newMilestones.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      return { ...prevData, milestones: newMilestones };
    });

    setIsMilestoneModalOpen(false);
  };

  // Approval Handlers
  const openAddApproval = () => {
    setEditingApproval({
      projectId,
      title: '',
      description: '',
      linkToReview: '',
      status: ApprovalStatus.PENDING
    });
    setIsApprovalModalOpen(true);
  };

  const openEditApproval = (approval: ApprovalItem) => {
    setEditingApproval({...approval});
    setIsApprovalModalOpen(true);
  };

  const handleDeleteApproval = async (approvalId: string) => {
    if (!window.confirm("Are you sure you want to delete this approval asset?")) return;
    
    await mockApi.deleteApproval(approvalId);
    
    setData(prev => prev ? ({
        ...prev,
        approvals: prev.approvals.filter(a => a.id !== approvalId)
    }) : null);

    setIsApprovalModalOpen(false);
    setEditingApproval({});
  };

  const handleSaveApproval = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApproval.title || !editingApproval.linkToReview) return;

    const approvalToSave = {
      id: editingApproval.id || `a${Date.now()}`,
      projectId: projectId,
      title: editingApproval.title,
      description: editingApproval.description || '',
      linkToReview: editingApproval.linkToReview,
      status: editingApproval.status || ApprovalStatus.PENDING
    } as ApprovalItem;

    await mockApi.saveApproval(approvalToSave);
    
    setData(prev => {
      if (!prev) return null;
      const exists = prev.approvals.find(a => a.id === approvalToSave.id);
      if (exists) {
        return { ...prev, approvals: prev.approvals.map(a => a.id === approvalToSave.id ? approvalToSave : a) };
      }
      return { ...prev, approvals: [...prev.approvals, approvalToSave] };
    });

    setIsApprovalModalOpen(false);
  };


  if (!data) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-zinc-500" /></div>;

  const tabs = [
    { id: 'overview', label: 'Overview', count: null },
    { id: 'messages', label: 'Messages', count: data.messages.filter(m => (!m.isInternal || user.role === UserRole.ADMIN) && !m.approvalItemId).length },
    { id: 'files', label: 'Files', count: data.files.length },
    { id: 'approvals', label: 'Approvals', count: data.approvals.length }
  ];

  // Helpers for Files
  const getFileIcon = (type: string) => {
    const t = type.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(t)) return <ImageIcon className="w-4 h-4 text-blue-400 mr-3" />;
    if (['pdf'].includes(t)) return <FileText className="w-4 h-4 text-red-400 mr-3" />;
    return <FileText className="w-4 h-4 text-zinc-500 mr-3" />;
  };
  const isViewable = (type: string) => ['jpg', 'jpeg', 'png', 'pdf'].includes(type.toLowerCase());
  const getUploaderRole = (id: string): UserRole | undefined => USERS.find(u => u.id === id)?.role;

  // Split Files
  const clientUploads = data.files.filter(f => getUploaderRole(f.uploadedById) === UserRole.CLIENT);
  const agencyUploads = data.files.filter(f => getUploaderRole(f.uploadedById) === UserRole.ADMIN);

  const FileTable = ({ files, emptyMessage }: { files: FileRecord[], emptyMessage: string }) => {
    if (files.length === 0) return <div className="py-6 text-center text-zinc-500 text-sm bg-zinc-900/30 rounded border border-dashed border-zinc-800">{emptyMessage}</div>;
    
    return (
      <div className="bg-brand-dark border border-brand-border rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 border-b border-brand-border text-zinc-400">
            <tr>
              <th className="px-6 py-3 font-medium w-1/3">Name</th>
              <th className="px-6 py-3 font-medium">Uploaded By</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Size</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {files.map(file => (
              <tr key={file.id} className={`hover:bg-zinc-800/30 transition-colors ${!file.isClientVisible ? 'bg-yellow-900/5' : ''}`}>
                <td className="px-6 py-4">
                  <div className="flex items-center group">
                     {getFileIcon(file.fileType)}
                     <span className={`font-medium transition-colors ${!file.isClientVisible ? 'text-yellow-500/90' : 'text-zinc-200 group-hover:text-white'}`}>
                       {file.fileName}
                     </span>
                     {!file.isClientVisible && (
                       <div className="flex items-center ml-2 px-1.5 py-0.5 rounded bg-yellow-900/20 text-yellow-500 text-[10px] border border-yellow-900/30">
                         <Lock className="w-3 h-3 mr-1" /> Internal
                       </div>
                     )}
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-400">{file.uploadedByName}</td>
                <td className="px-6 py-4 text-zinc-500">{new Date(file.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-zinc-500">{file.fileSize}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {isViewable(file.fileType) && (
                       <Button variant="ghost" className="h-8 px-2 text-zinc-400 hover:text-white" onClick={() => window.open(file.url, '_blank')}>
                         <Eye className="w-4 h-4 mr-2" /> View
                       </Button>
                    )}
                    <Button variant="ghost" className="h-8 px-2 text-zinc-400 hover:text-white" onClick={() => window.open(file.url, '_blank')}>
                      <Download className="w-4 h-4 mr-2" /> Download
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      <div className="mb-6">
         <button onClick={() => navigate({name: 'DASHBOARD'})} className="text-xs text-zinc-500 hover:text-white mb-2 flex items-center">
           &larr; Back to Dashboard
         </button>
         <div className="flex justify-between items-start">
           <div>
            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-light text-white">{data.project.name}</h1>
                {user.role === UserRole.ADMIN && (
                    <button 
                      onClick={handleEditProjectClick} 
                      className="p-1 text-zinc-500 hover:text-white transition-colors"
                      title="Edit Project Details"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                )}
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={data.project.status} />
              <span className="text-sm text-zinc-500 border-l border-zinc-700 pl-3">Due {data.project.dueDate}</span>
            </div>
           </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-brand-border mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'border-white text-white' 
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab.label}
            {tab.count !== null && tab.count > 0 && (
              <span className="bg-zinc-800 text-zinc-400 text-[10px] px-1.5 py-0.5 rounded-full">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-10">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Description</h3>
                <p className="text-zinc-300 leading-relaxed">{data.project.description}</p>
              </section>
              
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Timeline</h3>
                  {user.role === UserRole.ADMIN && (
                    <Button variant="ghost" onClick={openAddMilestone} className="h-6 px-2 text-xs">
                      <Plus className="w-3 h-3 mr-1" /> Add Milestone
                    </Button>
                  )}
                </div>
                
                {/* Timeline List */}
                <div className="space-y-3">
                  {data.milestones.map((milestone) => (
                    <div key={milestone.id} className="group flex items-start gap-4 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all">
                        {/* Status Indicator */}
                        <div className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                            milestone.status === MilestoneStatus.COMPLETED ? 'bg-emerald-500' : 
                            milestone.status === MilestoneStatus.IN_PROGRESS ? 'bg-blue-500' : 'bg-zinc-600'
                        }`} />
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className={`text-sm font-medium truncate ${milestone.status === MilestoneStatus.COMPLETED ? 'text-zinc-400 line-through' : 'text-zinc-200'}`}>
                                    {milestone.title}
                                </h4>
                                <span className="text-xs font-mono text-zinc-500 ml-2 flex-shrink-0">
                                    {milestone.dueDate}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{milestone.description || "No description provided."}</p>
                            
                            <div className="mt-2 flex items-center gap-2">
                                <StatusBadge status={milestone.status} type="milestone" />
                            </div>
                        </div>

                        {/* Actions (Admin Only) */}
                        {user.role === UserRole.ADMIN && (
                            <div className="flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ml-2">
                                <button 
                                    onClick={() => openEditMilestone(milestone)}
                                    className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                                    title="Edit"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => handleDeleteMilestone(milestone.id)}
                                    className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                  ))}

                  {data.milestones.length === 0 && (
                    <p className="text-sm text-zinc-500 italic p-4 border border-dashed border-zinc-800 rounded bg-zinc-900/20">
                      No milestones defined yet.
                    </p>
                  )}
                </div>
              </section>
            </div>
            <div className="space-y-6">
               <Card className="p-5">
                  <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Pending Actions</h3>
                  {data.approvals.filter(a => a.status === ApprovalStatus.PENDING).length > 0 ? (
                    data.approvals.filter(a => a.status === ApprovalStatus.PENDING).map(a => (
                       <div key={a.id} className="mb-3 last:mb-0 p-3 bg-blue-900/10 border border-blue-900/30 rounded">
                          <p className="text-sm text-blue-200 font-medium mb-1">{a.title}</p>
                          <Button variant="outline" className="w-full h-7 text-xs" onClick={() => setActiveTab('approvals')}>Review Now</Button>
                       </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center py-6 text-zinc-500 text-sm">
                      <CheckCircle2 className="w-6 h-6 mb-2 opacity-50" />
                      <p>All caught up!</p>
                    </div>
                  )}
               </Card>
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="max-w-3xl">
            <div className="space-y-6 mb-8">
              {data.messages.filter(m => (!m.isInternal || user.role === UserRole.ADMIN) && !m.approvalItemId).map(msg => {
                 const isMe = msg.senderId === user.id;
                 return (
                   <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                     <div className={`max-w-[80%] rounded-lg p-4 ${
                       msg.isInternal 
                        ? 'bg-yellow-900/10 border border-yellow-900/30' 
                        : isMe 
                          ? 'bg-zinc-100 text-zinc-900' 
                          : 'bg-zinc-800 text-zinc-100'
                     }`}>
                       <div className="flex items-center justify-between mb-1.5 gap-4">
                         <span className={`text-xs font-bold ${isMe ? 'text-zinc-600' : 'text-zinc-400'}`}>
                           {msg.senderName} {msg.isInternal && '(Internal Note)'}
                         </span>
                         <span className={`text-[10px] ${isMe ? 'text-zinc-500' : 'text-zinc-500'}`}>
                            {new Date(msg.createdAt).toLocaleDateString()}
                         </span>
                       </div>
                       <p className="text-sm whitespace-pre-wrap">{msg.body}</p>
                     </div>
                   </div>
                 );
              })}
              {data.messages.filter(m => (!m.isInternal || user.role === UserRole.ADMIN) && !m.approvalItemId).length === 0 && (
                <div className="text-center py-10 text-zinc-500 text-sm">No messages yet. Start the conversation below.</div>
              )}
            </div>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
              <TextArea 
                placeholder="Type your message here..." 
                className="mb-3 bg-brand-black"
                value={msgBody}
                onChange={(e) => setMsgBody(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                   <Button variant="ghost" className="px-2"><Paperclip className="w-4 h-4" /></Button>
                   {user.role === UserRole.ADMIN && (
                     <label className="flex items-center space-x-2 text-xs text-zinc-400 ml-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="rounded bg-zinc-800 border-zinc-700" 
                          checked={isInternalNote}
                          onChange={(e) => setIsInternalNote(e.target.checked)}
                        />
                        <span>Internal Note</span>
                     </label>
                   )}
                </div>
                <Button onClick={handleSendMessage} disabled={!msgBody.trim()}>
                  <Send className="w-4 h-4 mr-2" /> Send
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* FILES TAB */}
        {activeTab === 'files' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center bg-zinc-900/50 p-6 rounded-lg border border-dashed border-zinc-800">
              <div>
                <h3 className="text-white font-medium">Project Files</h3>
                <p className="text-sm text-zinc-500 mt-1">Upload assets, scripts, and references here.</p>
              </div>
              <div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <Button onClick={handleUploadClick} isLoading={isUploading}>
                  <UploadCloud className="w-4 h-4 mr-2" /> Upload File
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Agency Deliverables</h3>
              <FileTable files={agencyUploads} emptyMessage="No files from VALIDATE yet." />
            </div>

            <div>
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Client Uploads</h3>
              <FileTable files={clientUploads} emptyMessage="You haven't uploaded any files yet." />
            </div>
          </div>
        )}

        {/* APPROVALS TAB */}
        {activeTab === 'approvals' && (
          <div className="max-w-4xl space-y-6">
            {user.role === UserRole.ADMIN && (
              <div className="flex justify-end">
                 <Button variant="secondary" className="h-8 text-xs" onClick={openAddApproval}>
                   <Plus className="w-3 h-3 mr-1.5" /> Add Approval
                 </Button>
              </div>
            )}
            {data.approvals.length === 0 && (
               <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-lg">
                 No active approval items.
               </div>
            )}
            {data.approvals.map(approval => {
              const vimeoEmbed = getVimeoEmbedUrl(approval.linkToReview);
              
              return (
              <Card key={approval.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                     <h3 className="text-xl font-medium text-white mb-1">{approval.title}</h3>
                     <p className="text-zinc-400 text-sm">{approval.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={approval.status} type="approval" />
                    {user.role === UserRole.ADMIN && (
                        <div className="flex items-center gap-1 ml-2 pl-3 border-l border-zinc-700">
                            <button 
                                onClick={(e) => { e.stopPropagation(); openEditApproval(approval); }}
                                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                                title="Edit Approval"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleDeleteApproval(approval.id); }}
                                className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                                title="Delete Approval"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                  </div>
                </div>
                
                {/* VIDEO PLAYER IF DETECTED */}
                {vimeoEmbed && (
                  <div className="mb-6 rounded-lg overflow-hidden bg-black aspect-video relative border border-zinc-800 shadow-lg">
                    <iframe 
                      src={vimeoEmbed} 
                      className="absolute top-0 left-0 w-full h-full" 
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture" 
                      allowFullScreen
                      title={approval.title}
                    ></iframe>
                  </div>
                )}
                
                <div className="bg-black/50 rounded-lg p-4 border border-zinc-800 flex justify-between items-center mb-6">
                   <div className="text-sm text-zinc-400 font-mono truncate flex-1 mr-4">{approval.linkToReview}</div>
                   <Button variant="secondary" className="h-8 text-xs" onClick={() => window.open(approval.linkToReview, '_blank')}>
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Open Link
                   </Button>
                </div>

                <div className="bg-zinc-900/50 p-4 rounded-lg">
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Discussion & Feedback</h4>
                  <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                    {data.messages.filter(m => m.approvalItemId === approval.id).map(m => (
                      <div key={m.id} className="text-sm">
                        <span className="font-bold text-zinc-300">{m.senderName}: </span>
                        <span className="text-zinc-400">{m.body}</span>
                      </div>
                    ))}
                    {data.messages.filter(m => m.approvalItemId === approval.id).length === 0 && (
                       <p className="text-zinc-600 italic text-sm">No feedback recorded yet.</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add feedback or notes..." 
                      className="bg-brand-black"
                      value={approvalInputs[approval.id] || ''}
                      onChange={e => setApprovalInputs(prev => ({...prev, [approval.id]: e.target.value}))}
                    />
                    <Button variant="outline" onClick={() => handleSendApprovalFeedback(approval.id)}>Post</Button>
                  </div>
                </div>
                
                {/* APPROVAL ACTIONS FOR CLIENTS */}
                <div className="flex justify-between items-center pt-4 border-t border-zinc-800 mt-4">
                   <div className="text-zinc-500 text-xs">
                       {approval.status === ApprovalStatus.APPROVED ? (
                            <span className="text-emerald-500 flex items-center"><CheckCircle2 className="w-4 h-4 mr-1"/> Approved</span>
                       ) : (
                            <span>Action required</span>
                       )}
                   </div>
                   {user.role === UserRole.CLIENT && approval.status !== ApprovalStatus.APPROVED && (
                       <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              className="text-amber-500 hover:text-amber-400 border-amber-900/30 hover:bg-amber-900/20"
                              onClick={() => handleUpdateApprovalStatus(approval, ApprovalStatus.CHANGES_REQUESTED)}
                            >
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Request Changes
                            </Button>
                            <Button 
                              className="bg-emerald-600 hover:bg-emerald-500 text-white border-none"
                              onClick={() => handleUpdateApprovalStatus(approval, ApprovalStatus.APPROVED)}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Approve Asset
                            </Button>
                       </div>
                   )}
                </div>
              </Card>
            )})}
          </div>
        )}
      </div>

      {/* Milestone Modal */}
      <Modal 
        isOpen={isMilestoneModalOpen} 
        onClose={() => setIsMilestoneModalOpen(false)} 
        title={editingMilestone.id ? "Edit Milestone" : "Add Milestone"}
      >
        <form onSubmit={handleSaveMilestone} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Title</label>
            <Input 
              value={editingMilestone.title || ''} 
              onChange={e => setEditingMilestone({...editingMilestone, title: e.target.value})}
              required 
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Due Date</label>
            <Input 
              type="date" 
              value={editingMilestone.dueDate || ''} 
              onChange={e => setEditingMilestone({...editingMilestone, dueDate: e.target.value})}
              required 
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Status</label>
            <Select 
              value={editingMilestone.status || MilestoneStatus.NOT_STARTED}
              onChange={e => setEditingMilestone({...editingMilestone, status: e.target.value as MilestoneStatus})}
            >
              {Object.values(MilestoneStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Description (Optional)</label>
            <TextArea 
              value={editingMilestone.description || ''} 
              onChange={e => setEditingMilestone({...editingMilestone, description: e.target.value})}
            />
          </div>
          <div className="pt-4 flex justify-between items-center">
            {editingMilestone.id ? (
                <Button 
                    type="button" 
                    variant="danger" 
                    onClick={handleDeleteMilestoneFromForm}
                >
                    Delete Milestone
                </Button>
            ) : (
                <div /> /* Spacer */
            )}
            <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={() => setIsMilestoneModalOpen(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </Modal>
      
      {/* Approval Modal */}
      <Modal 
        isOpen={isApprovalModalOpen} 
        onClose={() => setIsApprovalModalOpen(false)} 
        title={editingApproval.id ? "Edit Approval" : "Add Approval"}
      >
        <form onSubmit={handleSaveApproval} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Title *</label>
            <Input 
              value={editingApproval.title || ''} 
              onChange={e => setEditingApproval({...editingApproval, title: e.target.value})}
              required 
              placeholder="e.g. v1 Rough Cut"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Review Link (Vimeo / Frame.io / etc) *</label>
            <Input 
              value={editingApproval.linkToReview || ''} 
              onChange={e => setEditingApproval({...editingApproval, linkToReview: e.target.value})}
              required 
              placeholder="https://vimeo.com/..."
            />
            <p className="text-[10px] text-zinc-500 mt-1">Vimeo links will be automatically embedded.</p>
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Description</label>
            <TextArea 
              value={editingApproval.description || ''} 
              onChange={e => setEditingApproval({...editingApproval, description: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Status</label>
            <Select 
              value={editingApproval.status || ApprovalStatus.PENDING}
              onChange={e => setEditingApproval({...editingApproval, status: e.target.value as ApprovalStatus})}
            >
              {Object.values(ApprovalStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </div>
          <div className="pt-4 flex justify-between items-center">
              {editingApproval.id ? (
                  <Button 
                      type="button" 
                      variant="danger" 
                      onClick={() => handleDeleteApproval(editingApproval.id!)}
                  >
                      Delete Approval
                  </Button>
              ) : (
                  <div />
              )}
              <div className="flex gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsApprovalModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Approval</Button>
              </div>
          </div>
        </form>
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        isOpen={isEditProjectOpen}
        onClose={() => setIsEditProjectOpen(false)}
        title="Edit Project Details"
      >
        <form onSubmit={handleSaveProjectDetails} className="space-y-4">
           <div>
              <label className="block text-xs text-zinc-400 mb-1">Project Name</label>
              <Input 
                 value={editProjectData.name || ''} 
                 onChange={e => setEditProjectData(prev => ({...prev, name: e.target.value}))} 
                 required
              />
           </div>

           <div>
              <label className="block text-xs text-zinc-400 mb-1">Description</label>
              <TextArea 
                 value={editProjectData.description || ''} 
                 onChange={e => setEditProjectData(prev => ({...prev, description: e.target.value}))} 
              />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Status</label>
                <Select 
                  value={editProjectData.status || ProjectStatus.DISCOVERY}
                  onChange={e => setEditProjectData(prev => ({...prev, status: e.target.value as ProjectStatus}))}
                >
                  {Object.values(ProjectStatus).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Select>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs text-zinc-400 mb-1">Start Date</label>
                 <Input 
                    type="date"
                    value={editProjectData.startDate || ''} 
                    onChange={e => setEditProjectData(prev => ({...prev, startDate: e.target.value}))} 
                 />
              </div>
              <div>
                 <label className="block text-xs text-zinc-400 mb-1">Due Date</label>
                 <Input 
                    type="date"
                    value={editProjectData.dueDate || ''} 
                    onChange={e => setEditProjectData(prev => ({...prev, dueDate: e.target.value}))} 
                 />
              </div>
           </div>

           <div className="pt-4 flex justify-end gap-2">
               <Button type="button" variant="ghost" onClick={() => setIsEditProjectOpen(false)}>Cancel</Button>
               <Button type="submit">Save Changes</Button>
           </div>
        </form>
        
        <div className="border-t border-zinc-800 mt-6 pt-4 flex justify-between items-center">
            <span className="text-xs text-red-900/60 uppercase font-medium">Danger Zone</span>
            <Button type="button" variant="danger" onClick={handleDeleteProject}>Delete Project</Button>
        </div>
      </Modal>
    </div>
  );
};

// --- COMPONENT: ADMIN CLIENTS VIEW ---

const AdminClientsView = ({ navigate }: { navigate: (v: View) => void }) => {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  
  useEffect(() => {
    mockApi.getOrgs().then(setOrgs);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium text-white mb-1">Clients & Organizations</h1>
          <p className="text-zinc-400">Manage client accounts and access.</p>
        </div>
        <Button>
            <Plus className="w-4 h-4 mr-2" /> New Organization
        </Button>
      </header>
      <div className="grid gap-4">
        {orgs.map(org => (
          <Card key={org.id} className="p-6 flex items-center justify-between group hover:border-zinc-600 transition-colors cursor-pointer" onClick={() => navigate({ name: 'ADMIN_ORG_DETAIL', orgId: org.id })}>
             <div>
               <h3 className="text-lg font-medium text-white">{org.name}</h3>
               <p className="text-sm text-zinc-500">{org.primaryContactName} • {org.primaryContactEmail}</p>
             </div>
             <ChevronRight className="text-zinc-600 group-hover:text-white" />
          </Card>
        ))}
        {orgs.length === 0 && <div className="text-zinc-500 italic">No organizations found.</div>}
      </div>
    </div>
  );
};

// --- COMPONENT: ADMIN ORG DETAIL VIEW ---

const AdminOrgDetailView = ({ orgId, navigate }: { orgId: string, navigate: (v: View) => void }) => {
  const [org, setOrg] = useState<Organization | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // New Project Modal State for specific org
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({});

  useEffect(() => {
    mockApi.getOrg(orgId).then(val => val && setOrg(val));
    mockApi.getProjectsByOrg(orgId).then(setProjects);
  }, [orgId]);

  const handleOpenNewProject = () => {
    setNewProject({
      organizationId: orgId,
      status: ProjectStatus.DISCOVERY,
      startDate: new Date().toISOString().split('T')[0]
    });
    setIsProjectModalOpen(true);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.organizationId) return;

    const p: Project = {
      id: `p${Date.now()}`,
      organizationId: newProject.organizationId,
      name: newProject.name,
      description: newProject.description || '',
      status: newProject.status as ProjectStatus,
      startDate: newProject.startDate || new Date().toISOString().split('T')[0],
      dueDate: newProject.dueDate
    };

    await mockApi.saveProject(p);
    setProjects(prev => [p, ...prev]); // Update local list
    setIsProjectModalOpen(false);
  };

  if (!org) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate({name: 'ADMIN_CLIENTS'})} className="text-xs text-zinc-500 hover:text-white mb-4 flex items-center">
           &larr; Back to Clients
        </button>
        <Card className="p-8 mb-8">
            <h1 className="text-2xl font-medium text-white mb-4">{org.name}</h1>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <label className="block text-zinc-500 text-xs uppercase tracking-wider mb-1">Primary Contact</label>
                    <p className="text-zinc-200">{org.primaryContactName}</p>
                </div>
                <div>
                    <label className="block text-zinc-500 text-xs uppercase tracking-wider mb-1">Email</label>
                    <p className="text-zinc-200">{org.primaryContactEmail}</p>
                </div>
            </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-white">Projects</h2>
                    <Button variant="secondary" className="h-7 text-xs" onClick={handleOpenNewProject}>
                        <Plus className="w-3 h-3 mr-1.5" /> Add Project
                    </Button>
                </div>
                <div className="space-y-4">
                   {projects.map(p => (
                      <div key={p.id} onClick={() => navigate({name: 'PROJECT_DETAIL', projectId: p.id})} className="cursor-pointer p-4 bg-zinc-900 border border-zinc-800 rounded hover:border-zinc-600 transition-colors">
                         <div className="flex justify-between items-start">
                            <h4 className="text-white font-medium">{p.name}</h4>
                            <StatusBadge status={p.status} />
                         </div>
                         <p className="text-xs text-zinc-500 mt-1">Due {p.dueDate}</p>
                      </div>
                   ))}
                   {projects.length === 0 && (
                     <div className="text-zinc-500 text-sm italic p-4 border border-dashed border-zinc-800 rounded">No active projects.</div>
                   )}
                </div>
            </section>
            
            <section>
                <h2 className="text-lg font-medium text-white mb-4">Associated Users</h2>
                <div className="bg-zinc-900/30 rounded border border-zinc-800 p-4 text-zinc-500 text-sm italic">
                    User management coming soon.
                </div>
            </section>
        </div>

        {/* CREATE PROJECT MODAL (Scoped to Org) */}
        <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title="Create New Project">
             <form onSubmit={handleCreateProject} className="space-y-4">
               <div>
                  <label className="block text-xs text-zinc-400 mb-1">Organization</label>
                  <div className="text-sm text-zinc-200 p-2 bg-zinc-900 border border-zinc-800 rounded">{org.name}</div>
               </div>

               <div>
                  <label className="block text-xs text-zinc-400 mb-1">Project Name *</label>
                  <Input 
                     value={newProject.name || ''} 
                     onChange={e => setNewProject(prev => ({...prev, name: e.target.value}))} 
                     placeholder="e.g. Summer Campaign 2024"
                     required
                  />
               </div>

               <div>
                  <label className="block text-xs text-zinc-400 mb-1">Description</label>
                  <TextArea 
                     value={newProject.description || ''} 
                     onChange={e => setNewProject(prev => ({...prev, description: e.target.value}))} 
                     placeholder="Brief project summary..."
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-400 mb-1">Status</label>
                    <Select 
                      value={newProject.status || ProjectStatus.DISCOVERY}
                      onChange={e => setNewProject(prev => ({...prev, status: e.target.value as ProjectStatus}))}
                    >
                      {Object.values(ProjectStatus).map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </Select>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-xs text-zinc-400 mb-1">Start Date</label>
                     <div className="relative">
                       <Input 
                          type="date"
                          value={newProject.startDate || ''} 
                          onChange={e => setNewProject(prev => ({...prev, startDate: e.target.value}))} 
                       />
                       <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                     </div>
                  </div>
                  <div>
                     <label className="block text-xs text-zinc-400 mb-1">Due Date (Optional)</label>
                     <div className="relative">
                       <Input 
                          type="date"
                          value={newProject.dueDate || ''} 
                          onChange={e => setNewProject(prev => ({...prev, dueDate: e.target.value}))} 
                       />
                       <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                     </div>
                  </div>
               </div>

               <div className="pt-4 flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsProjectModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Create Project</Button>
               </div>
             </form>
        </Modal>
    </div>
  );
};

// --- COMPONENT: SETTINGS VIEW ---

const SettingsView = ({ user }: { user: User }) => {
  return (
    <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-medium text-white mb-8">Settings</h1>
        <Card className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-2xl font-bold text-white">
                    {user.name.charAt(0)}
                </div>
                <div>
                    <h3 className="text-lg font-medium text-white">{user.name}</h3>
                    <p className="text-zinc-500">{user.email}</p>
                    <StatusBadge status={user.role} />
                </div>
            </div>
            
            <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-sm font-medium text-white mb-4">Security</h3>
                <Button variant="outline" disabled>Change Password</Button>
            </div>
        </Card>
    </div>
  );
};