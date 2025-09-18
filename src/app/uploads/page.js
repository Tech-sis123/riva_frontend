"use client";

import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { UploadCloud, Plus, Film, Clock3, AlertCircle, CheckCircle2 } from "lucide-react";
import CustomText from "@/components/ui/CustomText";

const mockUploads = [
  { id: "up_01", title: "How I Edit in 10 Minutes", size: "1.2 GB", status: "processing", progress: 72, createdAt: "2025-09-14T09:10:00Z" },
  { id: "up_02", title: "Live Stream Highlights - August", size: "850 MB", status: "completed", progress: 100, createdAt: "2025-09-12T13:45:00Z" },
  { id: "up_03", title: "Behind the Scenes - Studio Tour", size: "640 MB", status: "failed", progress: 12, createdAt: "2025-09-11T18:20:00Z" },
];

const statusPill = (status) => {
  const base = "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs";
  if (status === "completed") return `${base} bg-emerald-100 text-emerald-700`;
  if (status === "processing") return `${base} bg-amber-100 text-amber-700`;
  return `${base} bg-rose-100 text-rose-700`;
};

const UploadsPage = () => {
  const [files, setFiles] = useState([]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <UploadCloud className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CustomText as="h1" weight="bold" size="xl" color="foreground">
                Uploads
              </CustomText>
              <CustomText as="p" size="sm" color="muted">
                Manage your video uploads and processing status
              </CustomText>
            </div>
          </div>
          <label className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90 cursor-pointer">
            <Plus className="h-4 w-4" />
            New Upload
            <input type="file" multiple className="hidden" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
          </label>
        </div>

        {/* Dropzone */}
        <div className="rounded-xl border border-dashed border-border bg-background p-6 text-center">
          <div className="mx-auto h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
            <Film className="h-6 w-6 text-muted-foreground" />
          </div>
          <CustomText as="p" weight="medium" className="mt-3">
            Drag and drop videos here, or click to browse
          </CustomText>
          <CustomText as="p" size="sm" color="muted">
            Supported formats: MP4, MOV, MKV up to 5GB each
          </CustomText>
        </div>

        {/* Recent Uploads */}
        <div className="rounded-xl border border-border bg-background overflow-hidden">
          <div className="grid grid-cols-12 gap-3 bg-muted/30 px-4 py-3">
            <div className="col-span-5">
              <CustomText as="p" size="xs" color="muted">Title</CustomText>
            </div>
            <div className="col-span-2">
              <CustomText as="p" size="xs" color="muted">Size</CustomText>
            </div>
            <div className="col-span-3">
              <CustomText as="p" size="xs" color="muted">Progress</CustomText>
            </div>
            <div className="col-span-2 text-right">
              <CustomText as="p" size="xs" color="muted">Status / Time</CustomText>
            </div>
          </div>
          {mockUploads.map((u) => (
            <div key={u.id} className="grid grid-cols-12 gap-3 px-4 py-4">
              <div className="col-span-5">
                <CustomText as="p" weight="medium" className="truncate">{u.title}</CustomText>
                <CustomText as="p" size="xs" color="muted">ID: {u.id}</CustomText>
              </div>
              <div className="col-span-2 flex items-center">
                <CustomText as="p" size="sm" color="muted">{u.size}</CustomText>
              </div>
              <div className="col-span-3 flex items-center">
                <div className="w-full h-2 rounded bg-muted">
                  <div className={`h-2 rounded ${u.status === "failed" ? "bg-rose-500" : u.status === "completed" ? "bg-emerald-500" : "bg-primary"}`} style={{ width: `${u.progress}%` }} />
                </div>
                <span className="ml-2 text-xs text-muted-foreground">{u.progress}%</span>
              </div>
              <div className="col-span-2 flex flex-col items-end">
                <span className={statusPill(u.status)}>
                  {u.status === "completed" ? <CheckCircle2 className="h-3.5 w-3.5" /> : u.status === "processing" ? <Clock3 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                  {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                </span>
                <CustomText as="p" size="xs" color="muted" className="mt-1">
                  {new Date(u.createdAt).toLocaleString("en-NG")}
                </CustomText>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default UploadsPage;


