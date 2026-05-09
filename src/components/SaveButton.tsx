"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface SaveButtonProps {
  collegeId: string;
  isSaved?: boolean;
  onToggle?: (saved: boolean) => void;
}

export default function SaveButton({ collegeId, isSaved = false, onToggle }: SaveButtonProps) {
  const [saved, setSaved] = useState(isSaved);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    
    try {
      // TODO: Implement actual API call to save/unsave college
      // For now, just toggle the state
      const newSavedState = !saved;
      setSaved(newSavedState);
      onToggle?.(newSavedState);
    } catch (error) {
      console.error("Error toggling save state:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all ${
        saved
          ? "btn-accent text-white"
          : "border border-[#e7e5e4] bg-white text-[#111110] hover:bg-[#fafaf9]"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#e7e5e4] border-t-[#0f766e]" />
      ) : saved ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
      {saved ? "Saved" : "Save College"}
    </button>
  );
}
