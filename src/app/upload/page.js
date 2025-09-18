"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  UploadCloud,
  Film,
  Image as ImageIcon,
  FileText,
  Languages,
  Hash,
  CheckCircle2,
  AlertCircle,
  Clock3,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import CustomText from "@/components/ui/CustomText";

const Step = ({ index, current, label }) => {
  const isActive = index === current;
  const isDone = index < current;
  return (
    <div className="flex items-center">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
          isDone
            ? "bg-emerald-100 text-emerald-700"
            : isActive
            ? "bg-primary text-white"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {isDone ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
      </div>
      <div className="ml-2">
        <CustomText as="p" size="sm" weight={isActive ? "semibold" : "medium"}>
          {label}
        </CustomText>
      </div>
    </div>
  );
};

const statusPill = (status) => {
  const base = "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs";
  if (status === "completed") return `${base} bg-emerald-100 text-emerald-700`;
  if (status === "uploading") return `${base} bg-amber-100 text-amber-700`;
  return `${base} bg-muted text-muted-foreground`;
};

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Documentary",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

function simpleHash(input) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(16) + Math.random().toString(16).slice(2, 10);
}

const UploadPage = () => {
  const [step, setStep] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [subtitles, setSubtitles] = useState([]); // [{file, lang}]
  const [meta, setMeta] = useState({
    title: "",
    year: "",
    description: "",
    tags: [],
    genre: [],
  });
  const [newTag, setNewTag] = useState("");
  const [uploadState, setUploadState] = useState({
    status: "idle", // idle | uploading | processing | completed | failed
    videoProgress: 0,
    coverProgress: 0,
    subProgress: {}, // id -> percent
    overall: 0,
    txHash: "",
    ownershipHash: "",
  });

  const canNext = useMemo(() => {
    if (step === 0) return !!videoFile && !!coverFile;
    if (step === 1) return meta.title && meta.year && meta.genre.length > 0;
    if (step === 2) return true;
    if (step === 3) return uploadState.status === "completed";
    return false;
  }, [step, videoFile, coverFile, meta, uploadState]);

  const handleAddSubtitle = (file, lang) => {
    if (!file) return;
    const id = `${file.name}-${Date.now()}`;
    setSubtitles((s) => [...s, { id, file, lang: lang || "en" }]);
  };

  const removeSubtitle = (id) => {
    setSubtitles((s) => s.filter((x) => x.id !== id));
  };

  const toggleGenre = (g) => {
    setMeta((m) => ({
      ...m,
      genre: m.genre.includes(g) ? m.genre.filter((x) => x !== g) : [...m.genre, g],
    }));
  };

  const addTag = () => {
    const t = newTag.trim();
    if (!t) return;
    setMeta((m) => ({ ...m, tags: Array.from(new Set([...(m.tags || []), t])) }));
    setNewTag("");
  };

  const removeTag = (t) => {
    setMeta((m) => ({ ...m, tags: (m.tags || []).filter((x) => x !== t) }));
  };

  const startUpload = () => {
    // Mock API: simulate parallel uploads and a blockchain write
    const ownershipPayload = JSON.stringify({
      title: meta.title,
      year: meta.year,
      tags: meta.tags,
      genre: meta.genre,
      video: videoFile?.name,
      cover: coverFile?.name,
      subtitles: subtitles.map((s) => ({ name: s.file.name, lang: s.lang })),
      ts: Date.now(),
    });
    const ownershipHash = "0x" + simpleHash(ownershipPayload).padEnd(40, "a").slice(0, 40);
    const txHash = "0x" + simpleHash(ownershipPayload + "tx").padEnd(64, "b").slice(0, 64);

    setUploadState({
      status: "uploading",
      videoProgress: 0,
      coverProgress: 0,
      subProgress: Object.fromEntries(subtitles.map((s) => [s.id, 0])),
      overall: 0,
      txHash,
      ownershipHash,
    });

    const tickEvery = 180; // ms
    let v = 0,
      c = 0;
    const subProg = { ...Object.fromEntries(subtitles.map((s) => [s.id, 0])) };

    const timer = setInterval(() => {
      // increment with some randomness
      v = Math.min(100, v + 2 + Math.floor(Math.random() * 5));
      c = Math.min(100, c + 3 + Math.floor(Math.random() * 4));
      const keys = Object.keys(subProg);
      keys.forEach((k) => {
        subProg[k] = Math.min(100, subProg[k] + 5 + Math.floor(Math.random() * 6));
      });

      const parts = [v, c, ...Object.values(subProg)];
      const overall = Math.floor(parts.reduce((a, b) => a + b, 0) / parts.length);

      setUploadState((s) => ({
        ...s,
        videoProgress: v,
        coverProgress: c,
        subProgress: { ...subProg },
        overall,
      }));

      if (overall >= 100) {
        clearInterval(timer);
        // brief processing stage
        setUploadState((s) => ({ ...s, status: "processing" }));
        setTimeout(() => {
          setUploadState((s) => ({ ...s, status: "completed" }));
        }, 1000);
      }
    }, tickEvery);
  };

  const renderStepControls = () => (
    <div className="flex items-center justify-between mt-4">
      <button
        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/10"
        onClick={() => setStep((s) => Math.max(0, s - 1))}
        disabled={step === 0}
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </button>
      {step < 2 && (
        <button
          className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
            canNext ? "bg-primary text-white hover:bg-primary/90" : "bg-muted text-muted-foreground"
          }`}
          onClick={() => canNext && setStep((s) => s + 1)}
          disabled={!canNext}
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      )}
      {step === 2 && uploadState.status === "idle" && (
        <button
          className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90"
          onClick={startUpload}
        >
          Start Upload
        </button>
      )}
    </div>
  );

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
                Upload Movie
              </CustomText>
              <CustomText as="p" size="sm" color="muted">
                Multi-step upload with subtitles, metadata, and blockchain ownership
              </CustomText>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Step index={0} current={step} label="Files" />
            <Step index={1} current={step} label="Metadata" />
            <Step index={2} current={step} label="Review" />
            <Step index={3} current={step} label="Upload" />
          </div>
        </div>

        {/* Step 0: Files */}
        {step === 0 && (
          <div className="rounded-xl border border-border bg-background p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <CustomText as="p" size="sm" color="muted" className="mb-2">Movie file (MP4/MOV/MKV)</CustomText>
                <div className="flex items-center gap-3 rounded-lg border border-dashed border-border p-4 cursor-pointer">
                  <Film className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />
                    {videoFile && (
                      <p className="text-xs text-muted-foreground mt-1">{videoFile.name} ({Math.round((videoFile.size || 0) / 1024 / 1024)} MB)</p>
                    )}
                  </div>
                </div>
              </label>

              <label className="block">
                <CustomText as="p" size="sm" color="muted" className="mb-2">Cover image (JPG/PNG)</CustomText>
                <div className="flex items-center gap-3 rounded-lg border border-dashed border-border p-4 cursor-pointer">
                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
                    {coverFile && (
                      <p className="text-xs text-muted-foreground mt-1">{coverFile.name} ({Math.round((coverFile.size || 0) / 1024)} KB)</p>
                    )}
                  </div>
                </div>
              </label>
            </div>

            <div>
              <CustomText as="p" size="sm" color="muted" className="mb-2">Subtitles (.srt) with language</CustomText>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  <input id="sub-file" type="file" accept=".srt" onChange={(e) => {
                    const f = e.target.files && e.target.files[0];
                    if (!f) return;
                    const langEl = document.getElementById("sub-lang");
                    const lang = langEl && typeof (langEl).value === "string" ? (langEl).value : "en";
                    handleAddSubtitle(f, lang);
                    e.target.value = "";
                  }} className="text-sm" />
                  <select id="sub-lang" className="rounded-md border border-border bg-background px-2 py-1 text-sm">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="pt">Portuguese</option>
                  </select>
                </div>
                {subtitles.length > 0 && (
                  <ul className="mt-2 divide-y divide-border rounded-lg border border-border">
                    {subtitles.map((s) => (
                      <li key={s.id} className="flex items-center justify-between px-3 py-2 text-sm">
                        <span className="truncate">{s.file.name} ({s.lang})</span>
                        <button className="text-xs text-rose-600 hover:underline" onClick={() => removeSubtitle(s.id)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {renderStepControls()}
          </div>
        )}

        {/* Step 1: Metadata */}
        {step === 1 && (
          <div className="rounded-xl border border-border bg-background p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <CustomText as="p" size="sm" color="muted">Title</CustomText>
                <input
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Movie title"
                  value={meta.title}
                  onChange={(e) => setMeta((m) => ({ ...m, title: e.target.value }))}
                />
              </label>
              <label className="block">
                <CustomText as="p" size="sm" color="muted">Year</CustomText>
                <input
                  type="number"
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="2025"
                  value={meta.year}
                  onChange={(e) => setMeta((m) => ({ ...m, year: e.target.value }))}
                />
              </label>
            </div>

            <label className="block">
              <CustomText as="p" size="sm" color="muted">Description</CustomText>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                placeholder="Brief synopsis and notable details"
                value={meta.description}
                onChange={(e) => setMeta((m) => ({ ...m, description: e.target.value }))}
              />
            </label>

            <div>
              <CustomText as="p" size="sm" color="muted">Genre</CustomText>
              <div className="mt-2 flex flex-wrap gap-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGenre(g)}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      meta.genre.includes(g)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted/10"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <CustomText as="p" size="sm" color="muted">Tags</CustomText>
              <div className="mt-2 flex items-center gap-2">
                <input
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  placeholder="Add a tag and press Add"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                />
                <button className="rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90" onClick={addTag}>Add</button>
              </div>
              {meta.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {meta.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
                      {t}
                      <button className="text-rose-600" onClick={() => removeTag(t)}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {renderStepControls()}
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="rounded-xl border border-border bg-background p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <CustomText as="p" weight="semibold">Files</CustomText>
                <ul className="mt-2 text-sm text-muted-foreground">
                  <li>Video: {videoFile?.name}</li>
                  <li>Cover: {coverFile?.name}</li>
                  <li>Subtitles: {subtitles.length} file(s)</li>
                </ul>
              </div>
              <div>
                <CustomText as="p" weight="semibold">Metadata</CustomText>
                <ul className="mt-2 text-sm text-muted-foreground">
                  <li>Title: {meta.title}</li>
                  <li>Year: {meta.year}</li>
                  <li>Genre: {meta.genre.join(", ")}</li>
                  <li>Tags: {meta.tags.join(", ") || "—"}</li>
                </ul>
              </div>
            </div>
            <div>
              <CustomText as="p" weight="semibold">Description</CustomText>
              <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{meta.description || "—"}</p>
            </div>
            {renderStepControls()}
          </div>
        )}

        {/* Step 3: Upload & Blockchain */}
        {step === 3 && (
          <div className="rounded-xl border border-border bg-background p-4 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <CustomText as="p" size="sm" color="muted">Video upload</CustomText>
                  <span className={statusPill(uploadState.videoProgress >= 100 ? "completed" : "uploading")}>
                    {uploadState.videoProgress >= 100 ? "Completed" : "Uploading"}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded bg-muted">
                  <div className="h-2 rounded bg-primary" style={{ width: `${uploadState.videoProgress}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{uploadState.videoProgress}%</p>
              </div>

              <div className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <CustomText as="p" size="sm" color="muted">Cover upload</CustomText>
                  <span className={statusPill(uploadState.coverProgress >= 100 ? "completed" : "uploading")}>
                    {uploadState.coverProgress >= 100 ? "Completed" : "Uploading"}
                  </span>
                </div>
                <div className="mt-2 h-2 rounded bg-muted">
                  <div className="h-2 rounded bg-primary" style={{ width: `${uploadState.coverProgress}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{uploadState.coverProgress}%</p>
              </div>

              <div className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <CustomText as="p" size="sm" color="muted">Subtitles</CustomText>
                  <span className={statusPill(Object.values(uploadState.subProgress).every((p) => p >= 100) ? "completed" : "uploading")}>
                    {Object.values(uploadState.subProgress).every((p) => p >= 100) ? "Completed" : "Uploading"}
                  </span>
                </div>
                <div className="mt-2 space-y-2">
                  {subtitles.length === 0 && (
                    <p className="text-xs text-muted-foreground">No subtitle files</p>
                  )}
                  {subtitles.map((s) => (
                    <div key={s.id}>
                      <p className="text-xs text-muted-foreground mb-1">{s.file.name} ({s.lang})</p>
                      <div className="h-2 rounded bg-muted">
                        <div className="h-2 rounded bg-primary" style={{ width: `${uploadState.subProgress[s.id] || 0}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border p-3">
              <div className="flex items-center justify-between">
                <CustomText as="p" size="sm" color="muted">Overall</CustomText>
                <span className={statusPill(uploadState.overall >= 100 ? "completed" : "uploading")}>
                  {uploadState.status === "processing" ? "Processing" : uploadState.overall >= 100 ? "Completed" : "Uploading"}
                </span>
              </div>
              <div className="mt-2 h-2 rounded bg-muted">
                <div className={`h-2 rounded ${uploadState.status === "processing" ? "bg-amber-500" : "bg-primary"}`} style={{ width: `${uploadState.overall}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{uploadState.overall}%</p>
            </div>

            <div className="rounded-md border border-border p-3">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-primary" />
                <CustomText as="p" weight="semibold">Ownership (simulated blockchain)</CustomText>
              </div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Ownership Hash</p>
                  <p className="font-mono text-xs break-all">{uploadState.ownershipHash || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tx Hash</p>
                  <p className="font-mono text-xs break-all">{uploadState.txHash || "—"}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">A mock hash is generated from your metadata and filenames to simulate on-chain ownership.</p>
            </div>

            {uploadState.status !== "idle" ? (
              uploadState.status === "completed" ? (
                <div className="flex items-center gap-2 text-emerald-600 text-sm">
                  <CheckCircle2 className="h-5 w-5" /> Upload completed successfully.
                </div>
              ) : uploadState.status === "processing" ? (
                <div className="flex items-center gap-2 text-amber-600 text-sm">
                  <Clock3 className="h-5 w-5" /> Finalizing processing...
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600 text-sm">
                  <Clock3 className="h-5 w-5" /> Upload in progress...
                </div>
              )
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <FileText className="h-5 w-5" /> Ready to start upload.
              </div>
            )}
          </div>
        )}

        {/* Footer actions when finished */}
        {step === 3 && uploadState.status === "completed" && (
          <div className="flex items-center justify-end">
            <a href="/content" className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-white hover:bg-primary/90">Go to Content Library</a>
          </div>
        )}

        {/* Navigation between steps (ensure it shows when not on 3 or before start) */}
        {step !== 3 && null}

        {/* Step controls are embedded inside steps 0-2 */}
      </div>
    </Layout>
  );
};

export default UploadPage;

