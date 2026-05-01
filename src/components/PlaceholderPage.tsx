import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function PlaceholderPage({
  title,
  description,
  icon,
}: PlaceholderPageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "hsl(var(--primary) / 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        {icon || (
          <Construction size={48} style={{ color: "hsl(var(--primary))" }} />
        )}
      </div>

      <h1
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "hsl(var(--foreground))",
          marginBottom: 12,
        }}
      >
        {title}
      </h1>

      {description && (
        <p
          style={{
            fontSize: 16,
            color: "hsl(var(--muted-foreground))",
            maxWidth: 500,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      )}

      <div
        style={{
          marginTop: 32,
          padding: "12px 24px",
          background: "hsl(var(--muted))",
          borderRadius: 8,
          fontSize: 14,
          color: "hsl(var(--muted-foreground))",
        }}
      >
        🚧 This page is under construction
      </div>
    </div>
  );
}
