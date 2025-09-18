"use client";

import React from "react";
import Layout from "../../components/layout/Layout";
import {
  PlayCircle,
  Users,
  Eye,
  Clock3,
  DollarSign,
  TrendingUp,
  UploadCloud,
  Film,
  ThumbsUp,
  BarChart3,
} from "lucide-react";

function LineChart({ data = [], height = 160, stroke = "#E50914" }) {
  if (!data.length) return <div className="h-[160px]" />;
  const width = 500;
  const paddingX = 8;
  const paddingY = 10;
  const maxY = Math.max(...data.map((d) => d.y)) || 1;
  const minY = Math.min(...data.map((d) => d.y)) || 0;
  const yRange = Math.max(1, maxY - minY);
  const stepX = (width - paddingX * 2) / Math.max(1, data.length - 1);
  const points = data
    .map((d, i) => {
      const x = paddingX + i * stepX;
      const y = paddingY + (1 - (d.y - minY) / yRange) * (height - paddingY * 2);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[160px]">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        points={points}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polygon
        points={`${points} ${width - paddingX},${height - paddingY} ${paddingX},${height - paddingY}`}
        fill="url(#grad)"
      />
    </svg>
  );
}

function BarChart({ data = [], height = 160, barColor = "#22C55E" }) {
  const width = 500;
  const paddingX = 10;
  const maxY = Math.max(...data.map((d) => d.y)) || 1;
  const barWidth = (width - paddingX * 2) / (data.length * 1.5);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[160px]">
      {data.map((d, i) => {
        const x = paddingX + i * barWidth * 1.5;
        const barHeight = (d.y / maxY) * (height - 20);
        const y = height - barHeight;
        return (
          <rect
            key={d.x}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx="3"
            className="transition-opacity"
            fill={barColor}
            opacity={0.9}
          />
        );
      })}
    </svg>
  );
}

const mockKpis = [
  {
    title: "Subscribers",
    value: "128,420",
    delta: "+2.3%",
    icon: Users,
    accent: "text-primary",
  },
  {
    title: "Total Views",
    value: "3.2M",
    delta: "+5.1%",
    icon: Eye,
    accent: "text-teal",
  },
  {
    title: "Watch Time",
    value: "68,120h",
    delta: "+1.4%",
    icon: Clock3,
    accent: "text-success",
  },
  {
    title: "Revenue",
    value: "$24,560",
    delta: "+8.7%",
    icon: DollarSign,
    accent: "text-secondary",
  },
];

const viewsSeries = Array.from({ length: 12 }).map((_, i) => ({ x: i, y: 50 + Math.round(Math.sin(i / 2) * 30 + i * 6) }));
const revenueSeries = Array.from({ length: 12 }).map((_, i) => ({ x: i, y: 20 + Math.round(Math.cos(i / 2) * 15 + i * 4) }));
const topVideos = [
  { title: "How to Build a Streaming App", views: 182_340, likes: 12_452, duration: "14:21" },
  { title: "Creator Monetization 101", views: 145_210, likes: 10_034, duration: "09:12" },
  { title: "Advanced Editing Tricks", views: 121_402, likes: 8_553, duration: "12:44" },
  { title: "Live Streaming Setup", views: 98_120, likes: 6_820, duration: "07:59" },
];

const activity = [
  { icon: UploadCloud, text: "Uploaded new video: Building a Streaming Backend", time: "2h ago" },
  { icon: ThumbsUp, text: "4,320 new likes across your channel", time: "5h ago" },
  { icon: Users, text: "2,145 new subscribers joined", time: "1d ago" },
  { icon: Film, text: "Video 'Editing Tricks' reached 100k views", time: "2d ago" },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Heading */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Creator Dashboard</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Overview of your channel performance and recent activity
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90">
            <UploadCloud className="h-4 w-4" />
            Upload New Video
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {mockKpis.map((kpi) => (
            <div key={kpi.title} className="rounded-lg border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{kpi.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-md bg-muted flex items-center justify-center ${kpi.accent}`}>
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-success">
                <TrendingUp className="h-4 w-4" />
                <span>{kpi.delta} vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 rounded-lg border border-border bg-background p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">Views & Revenue</p>
              <span className="text-xs text-muted-foreground">Last 12 weeks</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-md bg-muted p-3">
                <p className="mb-2 text-xs text-muted-foreground">Views</p>
                <LineChart data={viewsSeries} stroke="#E50914" />
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="mb-2 text-xs text-muted-foreground">Revenue</p>
                <LineChart data={revenueSeries} stroke="#22C55E" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm font-medium text-foreground mb-3">Engagement by Content Type</p>
            <BarChart
              data={[
                { x: "Tutorial", y: 82 },
                { x: "Live", y: 56 },
                { x: "Shorts", y: 68 },
                { x: "Interview", y: 44 },
                { x: "Review", y: 60 },
              ]}
              barColor="#FF8C00"
            />
            <div className="mt-2 grid grid-cols-3 text-xs text-muted-foreground">
              <span>Tutorial</span>
              <span>Live</span>
              <span>Shorts</span>
            </div>
          </div>
        </div>

        {/* Top Content & Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 rounded-lg border border-border bg-background p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">Top Performing Videos</p>
              <a href="#" className="text-xs text-primary hover:underline">
                View all
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr>
                    <th className="py-2 font-normal">Title</th>
                    <th className="py-2 font-normal">Duration</th>
                    <th className="py-2 font-normal">Views</th>
                    <th className="py-2 font-normal">Likes</th>
                  </tr>
                </thead>
                <tbody>
                  {topVideos.map((v) => (
                    <tr key={v.title} className="border-t border-border">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-16 rounded bg-muted" />
                          <div>
                            <p className="text-foreground font-medium">{v.title}</p>
                            <p className="text-xs text-muted-foreground">Public</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">{v.duration}</td>
                      <td className="py-3">{v.views.toLocaleString()}</td>
                      <td className="py-3">{v.likes.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm font-medium text-foreground mb-3">Recent Activity</p>
            <ul className="space-y-3">
              {activity.map((a, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-md bg-muted text-primary flex items-center justify-center">
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
