export type Role = 'Team Leader' | 'Manager' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  teamId?: string; // If applicable
}

export type AgentStatus = 'active' | 'sick day' | 'vacation' | 'training' | 'offboarding';
export type AgentGroup = 'Simples' | 'OOP';

export interface Agent {
  id: string;
  name: string;
  email: string;
  admissionDate: string;
  languages: string[];
  status: AgentStatus;
  group: AgentGroup;
  teamId: string;
  kpis: AgentKPIs;
  alerts: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface AgentKPIs {
  csat: number;
  aht: number; // in seconds
  qa: number;
  ticketsHandled: number;
  targetCsat: number;
  targetAht: number;
  targetQa: number;
}

export interface Team {
  id: string;
  leaderId: string;
  name: string;
}

export type EventType = 'sick day' | 'vacation' | 'day off' | 'lateness' | 'no-show' | 'training' | 'shadowing' | 'coaching session' | 'performance review' | 'schedule change' | 'system issue' | 'personal emergency' | 'approved absence' | 'unapproved absence';

export interface AgentEvent {
  id: string;
  agentId: string;
  type: EventType;
  date: string;
  description?: string;
}

export type OneOnOneType = 'weekly' | 'monthly' | 'performance' | 'coaching' | 'probation' | 'return from sick leave';
export type OneOnOneStatus = 'open' | 'in progress' | 'completed';

export interface OneOnOne {
  id: string;
  agentId: string;
  tlId: string;
  date: string;
  type: OneOnOneType;
  positivePoints: string;
  attentionPoints: string;
  agentCommitments: string;
  tlCommitments: string;
  actionPlan: string;
  deadline?: string;
  status: OneOnOneStatus;
  nextMeetingDate?: string;
}

export type TicketFeedbackSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketFeedbackType = 'Positive' | 'Coaching' | 'Policy issue' | 'Tone issue' | 'Escalation issue' | 'Process issue' | 'Documentation issue';
export type TicketFeedbackStatus = 'New' | 'Discussed' | 'Follow-up needed' | 'Resolved';

export interface TicketFeedback {
  id: string;
  agentId: string;
  ticketId: string;
  link: string;
  date: string;
  channel: string;
  caseType: string;
  reason: string;
  feedbackType: TicketFeedbackType;
  detailedFeedback: string;
  whatShouldHaveBeenDone: string;
  severity: TicketFeedbackSeverity;
  discussedIn1on1: boolean;
  discussionDate?: string;
  status: TicketFeedbackStatus;
}
