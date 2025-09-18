"use client";

import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Settings, User, Shield, Bell } from "lucide-react";
import CustomText from "@/components/ui/CustomText";

const SettingsPage = () => {
  const [profile, setProfile] = useState({ displayName: "John Doe", email: "john@example.com", bio: "Creator" });
  const [security, setSecurity] = useState({ twoFA: false, newPassword: "", confirmPassword: "" });
  const [notify, setNotify] = useState({ product: true, comments: true, subscribers: true });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CustomText as="h1" weight="bold" size="xl" color="foreground">
                Settings
              </CustomText>
              <CustomText as="p" size="sm" color="muted">
                Manage your profile, security, and notifications
              </CustomText>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-4 w-4 text-primary" />
            <CustomText as="p" weight="semibold">Profile</CustomText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <CustomText as="p" size="sm" color="muted">Display name</CustomText>
              <input className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" value={profile.displayName} onChange={(e) => setProfile((p) => ({ ...p, displayName: e.target.value }))} />
            </label>
            <label className="block">
              <CustomText as="p" size="sm" color="muted">Email</CustomText>
              <input className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
            </label>
          </div>
          <label className="block mt-4">
            <CustomText as="p" size="sm" color="muted">Bio</CustomText>
            <textarea rows={3} className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} />
          </label>
          <div className="mt-3 text-right">
            <button className="rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90">Save Profile</button>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-4 w-4 text-primary" />
            <CustomText as="p" weight="semibold">Security</CustomText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={security.twoFA} onChange={(e) => setSecurity((s) => ({ ...s, twoFA: e.target.checked }))} />
              Enable two-factor authentication
            </label>
            <label className="block md:col-span-1">
              <CustomText as="p" size="sm" color="muted">New password</CustomText>
              <input type="password" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" value={security.newPassword} onChange={(e) => setSecurity((s) => ({ ...s, newPassword: e.target.value }))} />
            </label>
            <label className="block md:col-span-1">
              <CustomText as="p" size="sm" color="muted">Confirm password</CustomText>
              <input type="password" className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" value={security.confirmPassword} onChange={(e) => setSecurity((s) => ({ ...s, confirmPassword: e.target.value }))} />
            </label>
          </div>
          <div className="mt-3 text-right">
            <button className="rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90">Update Security</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="h-4 w-4 text-primary" />
            <CustomText as="p" weight="semibold">Notifications</CustomText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={notify.product} onChange={(e) => setNotify((n) => ({ ...n, product: e.target.checked }))} />
              Product updates
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={notify.comments} onChange={(e) => setNotify((n) => ({ ...n, comments: e.target.checked }))} />
              New comments
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={notify.subscribers} onChange={(e) => setNotify((n) => ({ ...n, subscribers: e.target.checked }))} />
              New subscribers
            </label>
          </div>
          <div className="mt-3 text-right">
            <button className="rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90">Save Preferences</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;


