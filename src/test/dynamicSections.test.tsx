import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomSectionRenderer from "@/components/CustomSectionRenderer";
import DynamicPageSections from "@/components/DynamicPageSections";
import * as usePageLayoutHook from "@/hooks/usePageLayout";

describe("CustomSectionRenderer (Ayurveda)", () => {
  it("renders custom_html section with dangerous HTML", () => {
    const section: usePageLayoutHook.SectionLayoutItem = {
      id: "custom_html_1",
      name: "Special BAMS Announcement",
      type: "custom_html",
      order: 0,
      isHidden: false,
      htmlContent: "<div class='test-announcement'><h3>Admissions Open 2026-27</h3><p>Direct NCISM Approved Seats</p></div>"
    };

    render(
      <BrowserRouter>
        <CustomSectionRenderer section={section} />
      </BrowserRouter>
    );

    expect(screen.getByText("Admissions Open 2026-27")).toBeInTheDocument();
    expect(screen.getByText("Direct NCISM Approved Seats")).toBeInTheDocument();
  });

  it("does not render when section is hidden", () => {
    const section: usePageLayoutHook.SectionLayoutItem = {
      id: "custom_hero_1",
      name: "Hidden Section",
      type: "hero",
      order: 0,
      isHidden: true,
      heading: "Hidden Heading"
    };

    const { container } = render(
      <BrowserRouter>
        <CustomSectionRenderer section={section} />
      </BrowserRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders split section with heading and cta", () => {
    const section: usePageLayoutHook.SectionLayoutItem = {
      id: "split_1",
      name: "Herbal Garden",
      type: "split",
      order: 0,
      isHidden: false,
      heading: "Over 200 Medicinal Species",
      description: "Cultivated for clinical pharmacology and research.",
      ctaText: "Explore Garden",
      ctaLink: "/facilities"
    };

    render(
      <BrowserRouter>
        <CustomSectionRenderer section={section} />
      </BrowserRouter>
    );

    expect(screen.getByText("Over 200 Medicinal Species")).toBeInTheDocument();
    expect(screen.getByText("Cultivated for clinical pharmacology and research.")).toBeInTheDocument();
    expect(screen.getByText("Explore Garden")).toBeInTheDocument();
  });
});

describe("DynamicPageSections (Ayurveda Reordering)", () => {
  it("renders reordered sections when layout is customized", () => {
    // Scenario: User moves about section above hero section
    vi.spyOn(usePageLayoutHook, "usePageLayout").mockReturnValue({
      data: {
        siteKey: "ayurveda",
        pageId: "homepage",
        sections: [
          { id: "about", name: "About IAMC", type: "builtin", order: 0, isHidden: false },
          { id: "hero", name: "Hero", type: "builtin", order: 1, isHidden: false }
        ]
      },
      isLoading: false,
      isError: false,
      error: null
    } as any);

    const defaultSections = {
      hero: <div data-testid="section-hero">IAMC Hero Banner</div>,
      about: <div data-testid="section-about">IAMC About Us</div>
    };

    const { container } = render(
      <BrowserRouter>
        <DynamicPageSections
          pageId="homepage"
          defaultSections={defaultSections}
          defaultOrder={["hero", "about"]}
        />
      </BrowserRouter>
    );

    const elements = container.querySelectorAll("[data-testid]");
    expect(elements.length).toBe(2);
    // Verified that about is now on top (index 0) and hero is below (index 1)
    expect(elements[0].getAttribute("data-testid")).toBe("section-about");
    expect(elements[1].getAttribute("data-testid")).toBe("section-hero");
  });
});
