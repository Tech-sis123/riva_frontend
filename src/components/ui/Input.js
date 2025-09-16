"use client";
import React, { useState, forwardRef } from "react";
import CustomText from "./CustomText";

// Variants: default | search | tel
const Input = forwardRef(function Input(
  {
    label,
    variant = "default",
    isSearchEmpty,
    onAddCustomSub,
    className = "",
    inputClassName = "",
    inputImageRight,
    inputImageLeft,
    altAdornment,
    togglePasswordView,
    autoCorrect,
    autoComplete,
    autoCapitalize,
    placeholder,
    autoFocus,
    secureTextEntry,
    keyboardType,
    textContentType,
    placeholderTextColor,
    onSubmitEditing,
    onChangeText,
    value,
    defaultValue,
    editable = true,
    onBlur,
    error,
    selectTextOnFocus,
    returnKeyType,
    maxLength,
    multiline,
    numberOfLines,
    textAlignVertical,
    name,
    type,
    ...rest
  },
  ref
) {
  const [focused, setFocused] = useState(false);

  const baseBorder = error
    ? "border-danger"
    : focused
    ? "border-primary"
    : "border-border";
  const baseRing = focused ? "ring-2 ring-primary/40" : "ring-0";
  const bg = "bg-background";

  return (
    <div className={`w-full ${className}`}>
      {label ? (
        <CustomText as="label" weight="semibold" className="block mb-2 text-sm">
          {label}
        </CustomText>
      ) : null}

      <div
        className={`w-full rounded-lg border ${baseBorder} ${baseRing} transition-all ${bg}`}
      >
        <div className="flex items-stretch">
          {inputImageLeft || variant === "search" ? (
            <div className="flex items-center justify-center px-3 text-foreground/60">
              {inputImageLeft || (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-foreground/60"
                >
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </div>
          ) : null}

          {variant === "tel" ? (
            <div className="flex items-center px-4 border-r border-border bg-muted text-sm text-foreground/80">
              {altAdornment || "+234"}
            </div>
          ) : null}

          <input
            ref={ref}
            name={name}
            type={type || (secureTextEntry ? "password" : "text")}
            autoFocus={autoFocus}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            autoCorrect={autoCorrect}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter" && onSubmitEditing) onSubmitEditing(e);
            }}
            onChange={(e) => onChangeText && onChangeText(e.target.value)}
            value={value}
            defaultValue={defaultValue}
            disabled={!editable}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              onBlur && onBlur(e);
              setFocused(false);
            }}
            className={`flex-1 min-w-0 px-4 py-3 outline-none border-none rounded-lg ${inputClassName} ${bg} text-foreground placeholder:text-foreground/50`}
            maxLength={maxLength}
          />

          {inputImageRight ? (
            <button
              type="button"
              onClick={togglePasswordView}
              className="flex items-center justify-center px-3 text-foreground/60"
            >
              {inputImageRight}
            </button>
          ) : null}
        </div>
      </div>
      {error ? (
        <CustomText size="sm" color="danger" className="mt-1">
          Invalid value
        </CustomText>
      ) : null}
    </div>
  );
});

export default Input;
