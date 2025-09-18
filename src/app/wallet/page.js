"use client";

import React, { useMemo, useState } from "react";
import {
  Wallet as WalletIcon,
  ArrowDownLeft,
  ArrowUpRight,
  Send,
  Plus,
  RefreshCw,
  Filter,
  Info,
  Download,
  Search,
} from "lucide-react";
import CustomText from "@/components/ui/CustomText";
import Layout from "../../components/layout/Layout";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    value || 0
  );

const mockTransactions = [
  {
    id: "trx_1001",
    date: "2025-09-10T09:30:00Z",
    description: "Subscription payout - August",
    amount: 120000,
    type: "credit",
    status: "success",
    fee: 1200,
    meta: { source: "Subscriptions", reference: "SUB-0825-9911" },
  },
  {
    id: "trx_1002",
    date: "2025-09-11T12:05:00Z",
    description: "Creator tip",
    amount: 4500,
    type: "credit",
    status: "success",
    fee: 45,
    meta: { source: "Tips", reference: "TIP-0091" },
  },
  {
    id: "trx_1003",
    date: "2025-09-12T15:10:00Z",
    description: "Content purchase - Movie X",
    amount: 3500,
    type: "credit",
    status: "success",
    fee: 35,
    meta: { source: "PPV", reference: "ORD-3182" },
  },
  {
    id: "trx_1004",
    date: "2025-09-13T10:40:00Z",
    description: "Withdrawal to bank",
    amount: -80000,
    type: "debit",
    status: "pending",
    fee: 100,
    meta: { destination: "GTB ••9201", reference: "WD-9022" },
  },
  {
    id: "trx_1005",
    date: "2025-09-14T18:25:00Z",
    description: "Platform fee adjustment",
    amount: -250,
    type: "debit",
    status: "success",
    fee: 0,
    meta: { reference: "FEE-ADJ-19" },
  },
];

const statusBadge = (status) => {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
  if (status === "success") return `${base} bg-emerald-100 text-emerald-700`;
  if (status === "pending") return `${base} bg-amber-100 text-amber-700`;
  return `${base} bg-rose-100 text-rose-700`;
};

const WalletPage = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [range, setRange] = useState({ from: "", to: "" });

  const availableBalance = 142_500; // NGN
  const pendingPayouts = 18_200;
  const lifetimeEarnings = 1_820_450;
  const lastFeeUpdate = "2025-09-12T08:00:00Z";

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((t) => {
      const matchesQuery = query
        ? `${t.description} ${t.meta?.reference || ""}`
            .toLowerCase()
            .includes(query.toLowerCase())
        : true;
      const matchesType = type === "all" ? true : t.type === type;
      const matchesStatus = status === "all" ? true : t.status === status;
      const time = new Date(t.date).getTime();
      const fromOk = range.from ? time >= new Date(range.from).getTime() : true;
      const toOk = range.to ? time <= new Date(range.to).getTime() : true;
      return matchesQuery && matchesType && matchesStatus && fromOk && toOk;
    });
  }, [query, type, status, range]);

  return (
    <Layout>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <WalletIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CustomText as="h1" weight="bold" size="xl" color="foreground">
              Wallet
            </CustomText>
            <CustomText as="p" size="sm" color="muted">
              Manage your creator earnings, payouts, and transaction history in NGN.
            </CustomText>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/10">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-background p-4">
          <CustomText as="p" size="xs" color="muted" className="mb-2">
            Available balance
          </CustomText>
          <CustomText as="p" size="2xl" weight="bold" color="foreground">
            {formatCurrency(availableBalance)}
          </CustomText>
          <CustomText as="p" size="xs" color="muted" className="mt-2">
            Ready to withdraw to your bank account
          </CustomText>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <CustomText as="p" size="xs" color="muted" className="mb-2">
            Pending payouts
          </CustomText>
          <CustomText as="p" size="2xl" weight="bold" color="foreground">
            {formatCurrency(pendingPayouts)}
          </CustomText>
          <CustomText as="p" size="xs" color="muted" className="mt-2">
            Processing to your bank within 24–48h
          </CustomText>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <CustomText as="p" size="xs" color="muted" className="mb-2">
            Lifetime earnings
          </CustomText>
          <CustomText as="p" size="2xl" weight="bold" color="foreground">
            {formatCurrency(lifetimeEarnings)}
          </CustomText>
          <CustomText as="p" size="xs" color="muted" className="mt-2">
            Total across subscriptions, PPV, and tips
          </CustomText>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:bg-muted/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Plus className="h-5 w-5" />
            </div>
            <div className="text-left">
              <CustomText as="p" weight="semibold" size="sm">
                Fund wallet
              </CustomText>
              <CustomText as="p" size="xs" color="muted">
                Add money via card or bank transfer
              </CustomText>
            </div>
          </div>
          <ArrowDownLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <button className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:bg-muted/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <div className="text-left">
              <CustomText as="p" weight="semibold" size="sm">
                Withdraw
              </CustomText>
              <CustomText as="p" size="xs" color="muted">
                Send funds to your bank account
              </CustomText>
            </div>
          </div>
          <Send className="h-5 w-5 text-muted-foreground" />
        </button>
        <button className="flex items-center justify-between rounded-xl border border-border bg-background p-4 hover:bg-muted/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Filter className="h-5 w-5" />
            </div>
            <div className="text-left">
              <CustomText as="p" weight="semibold" size="sm">
                Statement
              </CustomText>
              <CustomText as="p" size="xs" color="muted">
                Download monthly or custom statements
              </CustomText>
            </div>
          </div>
          <Download className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Transparency: Fees */}
      <div className="rounded-xl border border-border bg-background p-4">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Info className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <CustomText as="h3" weight="semibold" size="sm" color="foreground">
              Transparent fees (NGN)
            </CustomText>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-border p-3">
                <CustomText as="p" size="xs" color="muted">
                  Card payments
                </CustomText>
                <CustomText as="p" weight="semibold">
                  1.0% + ₦50 (capped at ₦2,000)
                </CustomText>
              </div>
              <div className="rounded-lg border border-border p-3">
                <CustomText as="p" size="xs" color="muted">
                  Bank transfer
                </CustomText>
                <CustomText as="p" weight="semibold">
                  0.5% flat
                </CustomText>
              </div>
              <div className="rounded-lg border border-border p-3">
                <CustomText as="p" size="xs" color="muted">
                  Payout to bank
                </CustomText>
                <CustomText as="p" weight="semibold">
                  ₦100 per withdrawal
                </CustomText>
              </div>
            </div>
            <CustomText as="p" size="xs" color="muted" className="mt-2">
              Last updated {new Date(lastFeeUpdate).toLocaleString("en-NG")}
            </CustomText>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-border bg-background p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by description or reference"
                className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="all">All types</option>
            <option value="credit">Credits</option>
            <option value="debit">Debits</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="all">All status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={range.from}
              onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={range.to}
              onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-xl border border-border bg-background overflow-hidden">
        <div className="min-w-full divide-y divide-border">
          <div className="grid grid-cols-12 gap-3 bg-muted/30 px-4 py-3">
            <div className="col-span-4">
              <CustomText as="p" size="xs" color="muted">
                Description
              </CustomText>
            </div>
            <div className="col-span-2">
              <CustomText as="p" size="xs" color="muted">
                Type
              </CustomText>
            </div>
            <div className="col-span-2">
              <CustomText as="p" size="xs" color="muted">
                Amount
              </CustomText>
            </div>
            <div className="col-span-2">
              <CustomText as="p" size="xs" color="muted">
                Fee
              </CustomText>
            </div>
            <div className="col-span-2 text-right">
              <CustomText as="p" size="xs" color="muted">
                Status / Date
              </CustomText>
            </div>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="px-4 py-10 text-center">
              <CustomText as="p" color="muted">
                No transactions match your filters.
              </CustomText>
            </div>
          )}

          {filteredTransactions.map((t) => (
            <div key={t.id} className="grid grid-cols-12 gap-3 px-4 py-4">
              <div className="col-span-4 flex items-start gap-3">
                <div
                  className={`mt-0.5 h-9 w-9 rounded-lg flex items-center justify-center ${
                    t.type === "credit"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {t.type === "credit" ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <CustomText as="p" weight="medium" className="truncate">
                    {t.description}
                  </CustomText>
                  <CustomText as="p" size="xs" color="muted">
                    Ref: {t.meta?.reference || "—"}
                  </CustomText>
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <CustomText as="p" size="sm" color="muted">
                  {t.type === "credit" ? "Credit" : "Debit"}
                </CustomText>
              </div>
              <div className="col-span-2 flex items-center">
                <CustomText
                  as="p"
                  weight="semibold"
                  className={t.amount >= 0 ? "text-emerald-600" : "text-rose-600"}
                >
                  {t.amount >= 0 ? "+" : ""}
                  {formatCurrency(t.amount)}
                </CustomText>
              </div>
              <div className="col-span-2 flex items-center">
                <CustomText as="p" size="sm" color="muted">
                  {t.fee ? formatCurrency(t.fee) : "—"}
                </CustomText>
              </div>
              <div className="col-span-2 flex flex-col items-end">
                <span className={statusBadge(t.status)}>{t.status}</span>
                <CustomText as="p" size="xs" color="muted" className="mt-1">
                  {new Date(t.date).toLocaleString("en-NG")}
                </CustomText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default WalletPage;


