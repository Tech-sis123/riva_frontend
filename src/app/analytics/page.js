"use client";

import React from "react";
import Layout from "../../components/layout/Layout";
import { BarChart3, Eye, Users, Clock3, ThumbsUp, MessageSquare } from "lucide-react";
import CustomText from "@/components/ui/CustomText";

const StatCard = ({ label, value, delta, icon: Icon, accent = "" }) => (
  <div className="rounded-lg border border-border bg-background p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
      </div>
      <div className={`h-10 w-10 rounded-md bg-muted flex items-center justify-center ${accent}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
    {delta && (
      <div className="mt-3 text-xs text-success">{delta} vs last period</div>
    )}
  </div>
);

const SimpleLine = ({ data = [], height = 140, stroke = "#E50914" }) => {
  if (!data.length) return <div className="h-[140px]" />;
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
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[140px]">
      <polyline fill="none" stroke={stroke} strokeWidth="2.5" points={points} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

const AnalyticsPage = () => {
  const seriesA = Array.from({ length: 20 }).map((_, i) => ({ x: i, y: 50 + Math.round(Math.sin(i / 2) * 30 + i * 2) }));
  const seriesB = Array.from({ length: 20 }).map((_, i) => ({ x: i, y: 30 + Math.round(Math.cos(i / 3) * 20 + i * 1.5) }));

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CustomText as="h1" weight="bold" size="xl" color="foreground">
                Analytics
              </CustomText>
              <CustomText as="p" size="sm" color="muted">
                Track performance across views, watch time, engagement, and audience
              </CustomText>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Total Views" value="3,240,152" delta="+5.1%" icon={Eye} />
          <StatCard label="Watch Time" value="68,120h" delta="+1.4%" icon={Clock3} />
          <StatCard label="Subscribers" value="128,420" delta="+2.3%" icon={Users} />
          <StatCard label="Engagement" value="412k" delta="+3.9%" icon={ThumbsUp} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">Views Trend</p>
              <span className="text-xs text-muted-foreground">Last 20 weeks</span>
            </div>
            <SimpleLine data={seriesA} stroke="#E50914" />
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-foreground">Watch Time Trend</p>
              <span className="text-xs text-muted-foreground">Last 20 weeks</span>
            </div>
            <SimpleLine data={seriesB} stroke="#22C55E" />
          </div>
        </div>

        {/* Audience */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-foreground">Audience Breakdown</p>
            <span className="text-xs text-muted-foreground">Sample data</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Top Countries</p>
              <ul className="mt-2 space-y-1">
                <li>Nigeria (45%)</li>
                <li>Ghana (18%)</li>
                <li>Kenya (12%)</li>
                <li>South Africa (8%)</li>
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground">Age</p>
              <ul className="mt-2 space-y-1">
                <li>18–24 (34%)</li>
                <li>25–34 (41%)</li>
                <li>35–44 (17%)</li>
                <li>45+ (8%)</li>
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground">Devices</p>
              <ul className="mt-2 space-y-1">
                <li>Mobile (62%)</li>
                <li>Desktop (28%)</li>
                <li>TV (10%)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm font-medium text-foreground mb-3">Engagement Highlights</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <li className="rounded-md bg-muted p-3">Avg. view duration: 8m 12s</li>
            <li className="rounded-md bg-muted p-3">CTR: 4.6%</li>
            <li className="rounded-md bg-muted p-3">Comments: 12,410</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;


