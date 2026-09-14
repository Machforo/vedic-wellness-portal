import React from "react";
import { useLocation } from "react-router-dom";
import { usePageLayout } from "@/hooks/usePageLayout";
import CustomSectionRenderer from "@/components/CustomSectionRenderer";
import PageHeader from "@/components/PageHeader";

export function getPageIdFromPath(pathname: string): string {
  if (!pathname || pathname === "/" || pathname === "/home") return "homepage";
  const raw = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  if (raw === "about") return "about_us";
  return raw.replace(/-/g, "_");
}

function isHeaderElement(child: any): boolean {
  if (!React.isValidElement(child)) return false;
  if (child.type === PageHeader) return true;
  const typeName = (child.type as any)?.displayName || (child.type as any)?.name;
  if (typeName === "PageHeader") return true;
  if (
    child.props &&
    "title" in (child.props as any) &&
    ("subtitle" in (child.props as any) || "breadcrumbs" in (child.props as any))
  ) {
    return true;
  }
  return false;
}

function getElementSectionId(child: any): string | null {
  if (!React.isValidElement(child)) return null;
  const p: any = child.props || {};
  if (p["data-section-id"]) return p["data-section-id"];
  if (p.id) return p.id;
  if (isHeaderElement(child)) return "header";
  const typeName = (child.type as any)?.displayName || (child.type as any)?.name;
  if (typeName === "EnquiryCTA" || typeName === "CTASection") return "cta";
  if (typeName === "PageGallery" || typeName === "MediaGallery") return "gallery";
  return null;
}

interface DynamicContentReordererProps {
  children: React.ReactNode;
}

export default function DynamicContentReorderer({ children }: DynamicContentReordererProps) {
  const location = useLocation();
  const pathname = location.pathname;

  // On homepage, 404, or CMS dynamic pages (/p/:slug), pass through directly
  if (pathname === "/" || pathname === "/404" || pathname.startsWith("/p/")) {
    return <>{children}</>;
  }

  const childArray = React.Children.toArray(children);

  // If child already includes a top-level DynamicPageSections, pass through
  const hasDynamicPageSections = childArray.some(
    (c) =>
      React.isValidElement(c) &&
      ((c.type as any)?.displayName === "DynamicPageSections" ||
        (c.type as any)?.name === "DynamicPageSections")
  );
  if (hasDynamicPageSections) {
    return <>{children}</>;
  }

  const pageId = getPageIdFromPath(pathname);
  const { data: layoutData, isLoading } = usePageLayout(pageId);

  // If loading or no saved sections, render default children structure
  if (
    isLoading ||
    !layoutData ||
    !Array.isArray(layoutData.sections) ||
    layoutData.sections.length === 0
  ) {
    return <>{children}</>;
  }

  const childMap = new Map<string, React.ReactNode>();
  const unassignedChildren: React.ReactNode[] = [];

  childArray.forEach((child) => {
    const secId = getElementSectionId(child);
    if (secId) {
      childMap.set(secId, child);
      childMap.set(secId.replace(/-/g, "_"), child);
      childMap.set(secId.replace(/_/g, "-"), child);
    } else {
      unassignedChildren.push(child);
    }
  });

  const sections = layoutData.sections;
  const handledIds = new Set<string>();

  return (
    <>
      {sections.map((sec) => {
        handledIds.add(sec.id);
        const under = sec.id.replace(/-/g, "_");
        const dash = sec.id.replace(/_/g, "-");
        handledIds.add(under);
        handledIds.add(dash);

        if (sec.isHidden) {
          return null;
        }

        // Direct matching element by section ID
        const matchedChild = childMap.get(sec.id) || childMap.get(under) || childMap.get(dash);
        if (matchedChild) {
          return <React.Fragment key={sec.id}>{matchedChild}</React.Fragment>;
        }

        // Unassigned content bucket (for overview/content/main)
        if (
          (sec.id === "content" || sec.id === "overview" || sec.id === "main" || sec.id === "details_grid") &&
          unassignedChildren.length > 0
        ) {
          return <React.Fragment key={sec.id}>{unassignedChildren}</React.Fragment>;
        }

        // Custom section added by user (custom_html, hero, split, cards, cta, faq)
        return <CustomSectionRenderer key={sec.id} section={sec} />;
      })}

      {/* Render any children that weren't matched and weren't in layout */}
      {Array.from(childMap.entries()).map(([k, c]) => {
        if (!handledIds.has(k)) {
          handledIds.add(k);
          return <React.Fragment key={`unhandled-${k}`}>{c}</React.Fragment>;
        }
        return null;
      })}

      {unassignedChildren.length > 0 &&
        !handledIds.has("content") &&
        !handledIds.has("overview") &&
        !handledIds.has("main") &&
        !handledIds.has("details_grid") && (
          <React.Fragment key="fallback-unassigned">{unassignedChildren}</React.Fragment>
        )}
    </>
  );
}
