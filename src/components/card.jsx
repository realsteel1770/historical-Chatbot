import React from "react";
import { theme } from "../design/theme";

export const Card = ({ children }) => (
  <div
    style={{
      background: theme.colors.surface,
      borderRadius: theme.radius.lg,
      boxShadow: theme.shadows.soft,
      padding: "1rem",
      border: `1px solid ${theme.colors.border}`,
    }}
  >
    {children}
  </div>
);
