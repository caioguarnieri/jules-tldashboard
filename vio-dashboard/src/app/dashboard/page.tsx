'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth-context';
import { mockAgents, mockEvents } from '@/lib/mock-data';
import Link from 'next/link';
import { Users, Activity, Thermometer, AlertCircle, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  // Filter agents based on user's team. If Manager/Admin, show all (for MVP, let's assume they see team t1 or all)
  const teamAgents = user?.role === 'Team Leader'
    ? mockAgents.filter(a => a.teamId === user.teamId)
    : mockAgents;

  // Calculate Summary metrics
  const totalAgents = teamAgents.length;
  const activeAgents = teamAgents.filter(a => a.status === 'active').length;
  const sickDaysThisMonth = mockEvents.filter(e => e.type === 'sick day').length; // Simplification for MVP
  const avgCsat = Math.round(teamAgents.reduce((acc, a) => acc + a.kpis.csat, 0) / totalAgents) || 0;
  const avgAht = Math.round(teamAgents.reduce((acc, a) => acc + a.kpis.aht, 0) / totalAgents) || 0;

  const agentsBelowTarget = teamAgents.filter(a => a.kpis.csat < a.kpis.targetCsat || a.kpis.aht > a.kpis.targetAht).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Team Overview</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAgents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAgents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sick Days (Mo)</CardTitle>
            <Thermometer className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sickDaysThisMonth}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg CSAT</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCsat}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg AHT</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAht}s</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Below Target</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agentsBelowTarget}</div>
          </CardContent>
        </Card>
      </div>

      {/* Agents List */}
      <Card>
        <CardHeader>
          <CardTitle>Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>CSAT</TableHead>
                <TableHead>AHT</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar fallback={agent.name.charAt(0)} />
                      <div>
                        <div className="font-medium text-gray-900">{agent.name}</div>
                        <div className="text-xs text-gray-500">{agent.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        agent.status === 'active' ? 'success' :
                        agent.status === 'sick day' ? 'destructive' :
                        'warning'
                      }
                    >
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{agent.group}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={agent.kpis.csat < agent.kpis.targetCsat ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {agent.kpis.csat}%
                      </span>
                      {agent.kpis.csat < agent.kpis.targetCsat && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={agent.kpis.aht > agent.kpis.targetAht ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                        {agent.kpis.aht}s
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {agent.alerts.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {agent.alerts.map((alert, idx) => (
                          <span key={idx} className="text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {alert}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">No active alerts</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/agents/${agent.id}`} className="text-blue-600 hover:underline text-sm font-medium">
                      View Profile
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
