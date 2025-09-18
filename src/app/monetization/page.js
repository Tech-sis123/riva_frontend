"use client";

import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { DollarSign, Wallet, CheckCircle2, Info, ToggleLeft, ToggleRight } from "lucide-react";
import CustomText from "@/components/ui/CustomText";

const plans = [
  { id: "basic", name: "Basic", price: 500, description: "Supporter tier with access to standard content" },
  { id: "premium", name: "Premium", price: 1500, description: "All content + behind-the-scenes + early access" },
  { id: "vip", name: "VIP", price: 3500, description: "Premium + monthly live AMA + exclusive downloads" },
];

const formatNGN = (v) => new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(v);

const MonetizationPage = () => {
  const [adEnabled, setAdEnabled] = useState(false);
  const [tipsEnabled, setTipsEnabled] = useState(true);
  const [selectedPlans, setSelectedPlans] = useState(["premium"]);

  const togglePlan = (id) => {
    setSelectedPlans((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CustomText as="h1" weight="bold" size="xl" color="foreground">
                Monetization
              </CustomText>
              <CustomText as="p" size="sm" color="muted">
                Configure subscriber plans, tips, and ad monetization
              </CustomText>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center justify-between mb-3">
            <CustomText as="p" weight="semibold">Subscription Plans</CustomText>
            <CustomText as="p" size="xs" color="muted">Choose which plans are live</CustomText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((p) => {
              const active = selectedPlans.includes(p.id);
              return (
                <button key={p.id} onClick={() => togglePlan(p.id)} className={`text-left rounded-lg border p-4 transition-colors ${active ? "border-primary bg-primary/10" : "border-border hover:bg-muted/10"}`}>
                  <div className="flex items-center justify-between">
                    <CustomText as="p" weight="semibold">{p.name}</CustomText>
                    {active && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <CustomText as="p" size="sm" color="muted" className="mt-1">{p.description}</CustomText>
                  <CustomText as="p" weight="bold" className="mt-2">{formatNGN(p.price)}/mo</CustomText>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tips & Ads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between">
              <CustomText as="p" weight="semibold">Tips</CustomText>
              <button
                onClick={() => setTipsEnabled((v) => !v)}
                className="inline-flex items-center gap-2 text-sm"
              >
                {tipsEnabled ? <ToggleRight className="h-5 w-5 text-primary" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />} {tipsEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>
            <CustomText as="p" size="sm" color="muted" className="mt-2">
              Allow viewers to tip you on any content page.
            </CustomText>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between">
              <CustomText as="p" weight="semibold">Ads</CustomText>
              <button
                onClick={() => setAdEnabled((v) => !v)}
                className="inline-flex items-center gap-2 text-sm"
              >
                {adEnabled ? <ToggleRight className="h-5 w-5 text-primary" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />} {adEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>
            <CustomText as="p" size="sm" color="muted" className="mt-2">
              Show pre-roll ads on free videos to generate additional revenue.
            </CustomText>
          </div>
        </div>

        {/* Payouts */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="h-4 w-4 text-primary" />
            <CustomText as="p" weight="semibold">Payout Settings</CustomText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="rounded-md border border-border p-3">
              <p className="text-muted-foreground">Payout Schedule</p>
              <p className="mt-1">Weekly (Fri)</p>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="text-muted-foreground">Minimum Payout</p>
              <p className="mt-1">{formatNGN(10000)}</p>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="text-muted-foreground">Fees</p>
              <p className="mt-1">₦100 per withdrawal</p>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
            <Info className="h-4 w-4" />
            Payouts are processed to your verified bank account within 24–48 hours.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MonetizationPage;


