import React from "react";
import Link from "next/link";

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function CTAButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  icon,
}: CTAButtonProps) {
  // Base classes according to flat design, 8px border-radius, multiples of 8px spacing
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out rounded-lg text-body select-none";

  // Sizes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-caption",
    md: "px-4 py-2 text-body",
    lg: "px-6 py-3 text-body",
  }[size];

  // Variants following the color constraints
  const variantClasses = {
    // Primary: Verde MAC (primary -> primary-dark)
    primary: "bg-mac-primary text-white hover:bg-mac-primary-dark",
    // Secondary: Verde claro de fondo (primary-tint -> text primary)
    secondary: "bg-mac-primary-tint text-mac-primary hover:bg-mac-primary-tint/80",
    // Danger: Rojo exclusivo urgencias 24/7 (hover: opacity-90)
    danger: "bg-mac-danger text-white hover:opacity-90",
    // Outline: Border sutil 1px y color verde
    outline: "border border-mac-primary text-mac-primary bg-transparent hover:bg-mac-primary-tint",
  }[variant];

  const content = (
    <>
      {icon && <span className="mr-2 flex items-center justify-center">{icon}</span>}
      {children}
    </>
  );

  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={combinedClasses}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {content}
    </button>
  );
}
