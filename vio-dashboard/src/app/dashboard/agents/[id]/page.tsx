'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockAgents, mockEvents, mockOneOnOnes, mockTicketFeedbacks } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { CalendarDays, MessageSquare, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AgentProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const agent = mockAgents.find(a => a.id === id);

  const [activeTab, setActiveTab] = useState<'timeline' | '1on1' | 'feedback'>('timeline');

  if (!agent) {
    return <div className="p-8 text-center text-gray-500">Agent not found</div>;
  }

  const agentEvents = mockEvents.filter(e => e.agentId === id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const agent1on1s = mockOneOnOnes.filter(o => o.agentId === id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const agentFeedbacks = mockTicketFeedbacks.filter(f => f.agentId === id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Agent Profile</h1>
      </div>

      {/* Header Info */}
      <Card>
        <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <Avatar fallback={agent.name.charAt(0)} className="h-20 w-20 text-2xl" />
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">{agent.name}</h2>
              <Badge variant={agent.status === 'active' ? 'success' : 'warning'}>{agent.status}</Badge>
              <Badge variant="outline">{agent.group}</Badge>
            </div>
            <p className="text-sm text-gray-500">{agent.email} • Admitted: {agent.admissionDate}</p>
            <div className="flex gap-2 pt-2">
              {agent.languages.map(lang => (
                <Badge key={lang} variant="neutral" className="text-[10px]">{lang}</Badge>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center md:text-right">
            <div>
              <p className="text-sm text-gray-500">CSAT</p>
              <p className={`text-xl font-bold ${agent.kpis.csat < agent.kpis.targetCsat ? 'text-red-600' : 'text-green-600'}`}>
                {agent.kpis.csat}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">AHT</p>
              <p className={`text-xl font-bold ${agent.kpis.aht > agent.kpis.targetAht ? 'text-red-600' : 'text-gray-900'}`}>
                {agent.kpis.aht}s
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {agent.strengths.length > 0 ? agent.strengths.map(s => (
                <Badge key={s} variant="success" className="bg-green-50">{s}</Badge>
              )) : <span className="text-sm text-gray-500">No strengths recorded</span>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {agent.weaknesses.length > 0 ? agent.weaknesses.map(w => (
                <Badge key={w} variant="destructive" className="bg-red-50">{w}</Badge>
              )) : <span className="text-sm text-gray-500">No weaknesses recorded</span>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'timeline', name: 'Timeline & Events', icon: CalendarDays },
            { id: '1on1', name: '1-1 History', icon: MessageSquare },
            { id: 'feedback', name: 'Ticket Feedback', icon: AlertCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'timeline' | '1on1' | 'feedback')}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <tab.icon className={`mr-2 h-5 w-5 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        {activeTab === 'timeline' && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
            </CardHeader>
            <CardContent>
              {agentEvents.length > 0 ? (
                <div className="space-y-4">
                  {agentEvents.map(event => (
                    <div key={event.id} className="flex gap-4 p-4 border rounded-lg bg-gray-50/50">
                      <div className="flex-shrink-0 pt-1">
                        <CalendarDays className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{event.date} - <span className="capitalize">{event.type}</span></p>
                        {event.description && <p className="text-sm text-gray-500 mt-1">{event.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No recent events.</p>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === '1on1' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>1-1 History</CardTitle>
              <Button size="sm">Record 1-1</Button>
            </CardHeader>
            <CardContent>
              {agent1on1s.length > 0 ? (
                <div className="space-y-6">
                  {agent1on1s.map(meeting => (
                    <div key={meeting.id} className="border rounded-lg p-5 bg-white shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 capitalize">{meeting.type} 1-1</h3>
                          <p className="text-sm text-gray-500">{meeting.date} • Status: {meeting.status}</p>
                        </div>
                        <Badge variant={meeting.status === 'completed' ? 'success' : 'warning'}>{meeting.status}</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-green-50 p-3 rounded-md border border-green-100">
                          <p className="text-sm font-semibold text-green-800 mb-1">Positive Points</p>
                          <p className="text-sm text-green-900">{meeting.positivePoints}</p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-md border border-orange-100">
                          <p className="text-sm font-semibold text-orange-800 mb-1">Attention Points</p>
                          <p className="text-sm text-orange-900">{meeting.attentionPoints}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-md mb-4 border">
                        <h4 className="text-sm font-semibold mb-2">Action Plan</h4>
                        <p className="text-sm text-gray-700">{meeting.actionPlan}</p>
                        {meeting.deadline && <p className="text-xs text-gray-500 mt-2">Deadline: {meeting.deadline}</p>}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase">Agent Commitments</p>
                          <p className="text-sm mt-1">{meeting.agentCommitments}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase">TL Commitments</p>
                          <p className="text-sm mt-1">{meeting.tlCommitments}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No 1-1 history recorded.</p>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'feedback' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ticket Feedback</CardTitle>
              <Button size="sm">Add Feedback</Button>
            </CardHeader>
            <CardContent>
              {agentFeedbacks.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Discussed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {agentFeedbacks.map((fb) => (
                      <TableRow key={fb.id}>
                        <TableCell>
                          <a href={fb.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">
                            {fb.ticketId}
                          </a>
                        </TableCell>
                        <TableCell>{fb.date}</TableCell>
                        <TableCell>
                          <Badge variant={fb.feedbackType === 'Positive' ? 'success' : 'outline'}>
                            {fb.feedbackType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`text-sm ${
                            fb.severity === 'High' || fb.severity === 'Critical' ? 'text-red-600 font-semibold' :
                            fb.severity === 'Medium' ? 'text-orange-500' : 'text-gray-500'
                          }`}>
                            {fb.severity}
                          </span>
                        </TableCell>
                        <TableCell>{fb.status}</TableCell>
                        <TableCell>
                          {fb.discussedIn1on1 ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="text-xs text-gray-400">No</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-sm text-gray-500">No ticket feedback recorded.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  );
}
