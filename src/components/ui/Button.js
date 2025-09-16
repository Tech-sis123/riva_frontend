"use client";
import React from "react";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/fonts";

export default function Button({
  text = "Continue",
  onClick,
  className = "",
  textClassName = "",
  loading = false,
  disabled = false,
  variant = "primary",
  type = "button",
  ariaLabel,
  ariaHint,
}) {
  const isDisabled = loading || disabled;

  let backgroundColor;
  let textColor;
  let borderColor;

  switch (variant) {
    case "primary":
      backgroundColor = colors.primary;
      textColor = colors.secondary;
      borderColor = "transparent";
      break;
    case "secondary":
      backgroundColor = colors.secondary;
      textColor = "#ffffff";
      borderColor = "transparent";
      break;
    case "outlined":
      backgroundColor = "transparent";
      textColor = colors.primary;
      borderColor = colors.primary;
      break;
    default:
      backgroundColor = colors.primary;
      textColor = colors.secondary;
      borderColor = "transparent";
  }

  const handleClick = (e) => {
    if (isDisabled) return;
    onClick && onClick(e);
    if (typeof document !== "undefined") {
      const active = document.activeElement;
      if (active && "blur" in active) {
        active.blur();
      }
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      aria-busy={loading}
      title={ariaHint}
      className={`inline-flex w-full items-center justify-center rounded [transition:all_150ms_ease] focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.99] ${className}`}
      style={{
        backgroundColor:
          isDisabled && variant !== "outlined"
            ? colors.disabled
            : backgroundColor,
        borderWidth: variant === "outlined" ? 2 : 0,
        borderStyle: variant === "outlined" ? "solid" : "none",
        borderColor: borderColor,
        height: 50,
        borderRadius: 4,
      }}
    >
      {loading ? (
        <span
          className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        <span
          className={`text-[16px] font-semibold ${textClassName}`}
          style={{ color: textColor, fontFamily: fonts.bold }}
        >
          {text}
        </span>
      )}
    </button>
  );
}
