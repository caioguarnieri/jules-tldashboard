import { User, Team, Agent, AgentEvent, OneOnOne, TicketFeedback } from './types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'Caio', email: 'caio@vio.com', role: 'Team Leader', teamId: 't1' },
  { id: 'u2', name: 'Ana (Manager)', email: 'ana@vio.com', role: 'Manager' },
  { id: 'u3', name: 'Admin User', email: 'admin@vio.com', role: 'Admin' },
];

export const mockTeams: Team[] = [
  { id: 't1', leaderId: 'u1', name: "Caio's Team" },
];

export const mockAgents: Agent[] = [
  {
    id: 'a1',
    name: 'João Silva',
    email: 'joao.silva@vio.com',
    admissionDate: '2023-01-15',
    languages: ['Portuguese', 'English'],
    status: 'active',
    group: 'Simples',
    teamId: 't1',
    kpis: {
      csat: 88,
      aht: 320,
      qa: 95,
      ticketsHandled: 450,
      targetCsat: 85,
      targetAht: 300,
      targetQa: 90,
    },
    alerts: ['CSAT dropped 5% this week'],
    strengths: ['Fast resolver', 'Strong empathy'],
    weaknesses: ['High AHT'],
  },
  {
    id: 'a2',
    name: 'Maria Santos',
    email: 'maria.santos@vio.com',
    admissionDate: '2022-05-20',
    languages: ['Portuguese', 'Spanish', 'English'],
    status: 'sick day',
    group: 'OOP',
    teamId: 't1',
    kpis: {
      csat: 92,
      aht: 250,
      qa: 98,
      ticketsHandled: 520,
      targetCsat: 85,
      targetAht: 300,
      targetQa: 90,
    },
    alerts: [],
    strengths: ['Good hotel negotiation', 'Strong policy knowledge'],
    weaknesses: [],
  },
  {
    id: 'a3',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@vio.com',
    admissionDate: '2023-11-10',
    languages: ['Portuguese', 'English'],
    status: 'active',
    group: 'Simples',
    teamId: 't1',
    kpis: {
      csat: 78,
      aht: 410,
      qa: 82,
      ticketsHandled: 280,
      targetCsat: 85,
      targetAht: 300,
      targetQa: 90,
    },
    alerts: ['CSAT below target', 'No weekly 1-1 registered in 14 days'],
    strengths: ['Good written communication'],
    weaknesses: ['Low CSAT', 'High AHT', 'Needs policy reinforcement'],
  },
];

export const mockEvents: AgentEvent[] = [
  { id: 'e1', agentId: 'a2', type: 'sick day', date: '2024-05-28', description: 'Flu' },
  { id: 'e2', agentId: 'a3', type: 'lateness', date: '2024-05-25', description: 'Traffic' },
  { id: 'e3', agentId: 'a1', type: 'training', date: '2024-05-15', description: 'New product features' },
];

export const mockOneOnOnes: OneOnOne[] = [
  {
    id: '1o1-1',
    agentId: 'a1',
    tlId: 'u1',
    date: '2024-05-21',
    type: 'weekly',
    positivePoints: 'Great QA scores this week.',
    attentionPoints: 'AHT slightly above target.',
    agentCommitments: 'Will use templates more often to reduce AHT.',
    tlCommitments: 'Share the updated templates document.',
    actionPlan: 'Review AHT next week.',
    status: 'completed',
    nextMeetingDate: '2024-05-28',
  },
];

export const mockTicketFeedbacks: TicketFeedback[] = [
  {
    id: 'tf1',
    agentId: 'a3',
    ticketId: 'T-10293',
    link: 'https://vio.zendesk.com/tickets/10293',
    date: '2024-05-26',
    channel: 'Email',
    caseType: 'Refund',
    reason: 'Customer complained about slow response.',
    feedbackType: 'Process issue',
    detailedFeedback: 'Took too long to follow up with the hotel.',
    whatShouldHaveBeenDone: 'Call the hotel immediately if no response within 2 hours.',
    severity: 'Medium',
    discussedIn1on1: false,
    status: 'New',
  },
  {
    id: 'tf2',
    agentId: 'a2',
    ticketId: 'T-10444',
    link: 'https://vio.zendesk.com/tickets/10444',
    date: '2024-05-20',
    channel: 'Chat',
    caseType: 'Cancellation',
    reason: 'Great negotiation with hotel.',
    feedbackType: 'Positive',
    detailedFeedback: 'Managed to get a full refund despite strict policy.',
    whatShouldHaveBeenDone: 'Perfect handling.',
    severity: 'Low',
    discussedIn1on1: true,
    discussionDate: '2024-05-21',
    status: 'Resolved',
  }
];
