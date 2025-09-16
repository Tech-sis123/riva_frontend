"use client";
import React from "react";

export default function CustomText({
  as: Component = "span",
  children,
  className = "",
  weight = "normal", // normal | medium | semibold | bold
  size = "base", // xs | sm | base | lg | xl | 2xl
  color = "foreground", // semantic: foreground | muted | primary | secondary | success | danger | background | white | black
  align = "left",
  ...rest
}) {
  const weightClass =
    weight === "bold"
      ? "font-bold"
      : weight === "semibold"
      ? "font-semibold"
      : weight === "medium"
      ? "font-medium"
      : "font-normal";

  const sizeClass =
    size === "xs"
      ? "text-xs"
      : size === "sm"
      ? "text-sm"
      : size === "lg"
      ? "text-lg"
      : size === "xl"
      ? "text-xl"
      : size === "2xl"
      ? "text-2xl"
      : "text-base";

  let colorClass = "";
  switch (color) {
    case "foreground":
      colorClass = "text-foreground";
      break;
    case "muted":
      colorClass = "text-foreground/70";
      break;
    case "subtle":
      colorClass = "text-foreground/60";
      break;
    case "primary":
      colorClass = "text-primary";
      break;
    case "secondary":
      colorClass = "text-secondary";
      break;
    case "success":
      colorClass = "text-success";
      break;
    case "danger":
      colorClass = "text-danger";
      break;
    case "background":
      colorClass = "text-background";
      break;
    case "white":
      colorClass = "text-white";
      break;
    case "black":
      colorClass = "text-black";
      break;
    default:
      colorClass = `text-${color}`;
  }
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : "text-left";

  return (
    <Component
      className={`${weightClass} ${sizeClass} ${colorClass} ${alignClass} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
