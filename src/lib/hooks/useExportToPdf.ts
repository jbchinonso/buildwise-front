"use client";

import { useCallback } from "react";

interface ExportPDFOptions {
  filename?: string;
  quality?: number;
  format?: "a4" | "letter" | "auto";
  orientation?: "portrait" | "landscape";
  margin?: number;
  width?: number;
  height?: number;
}

interface ExportPDFResult {
  exportToPDF: (
    element: HTMLElement,
    options?: ExportPDFOptions
  ) => Promise<void>;
  isExporting: boolean;
}

export function useExportPDF(): ExportPDFResult {
  const exportToPDF = useCallback(
    async (element: HTMLElement, options: ExportPDFOptions = {}) => {
      const {
        filename = "export.pdf",
        quality = 2,
        format = "a4",
        orientation = "portrait",
        margin = 10,
      } = options;

      try {
        // Dynamically import the libraries to reduce bundle size
        const [{ default: html2canvas }, { default: jsPDF }] =
          await Promise.all([import("html2canvas-pro"), import("jspdf")]);

        // Capture the element as canvas
        const canvas = await html2canvas(element, {
          scale: quality,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
          removeContainer: true,
          imageTimeout: 0,
          logging: false,
          width: options?.width,
          height: options?.height
        });

        // Get canvas dimensions
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const imgData = canvas.toDataURL("image/png");

        // Calculate PDF dimensions based on format
        let pdfWidth: number;
        let pdfHeight: number;

        if (format === "a4") {
          pdfWidth = orientation === "portrait" ? 210 : 297;
          pdfHeight = orientation === "portrait" ? 297 : 210;
        } else if (format === "letter") {
          pdfWidth = orientation === "portrait" ? 216 : 279;
          pdfHeight = orientation === "portrait" ? 279 : 216;
        } else {
          // Auto format - use canvas aspect ratio
          const aspectRatio = imgWidth / imgHeight;
          if (aspectRatio > 1) {
            pdfWidth = 297;
            pdfHeight = 297 / aspectRatio;
          } else {
            pdfWidth = 210 * aspectRatio;
            pdfHeight = 210;
          }
        }

        // Create PDF
        const pdf = new jsPDF({
          orientation,
          unit: "mm",
          format: format === "auto" ? [pdfWidth, pdfHeight] : format,
        });

        // Calculate image dimensions to fit in PDF with margins
        const availableWidth = pdfWidth - margin * 2;
        const availableHeight = pdfHeight - margin * 2;

        const aspectRatio = imgWidth / imgHeight;
        let finalWidth = availableWidth;
        let finalHeight = availableWidth / aspectRatio;

        // If height exceeds available space, scale by height instead
        if (finalHeight > availableHeight) {
          finalHeight = availableHeight;
          finalWidth = availableHeight * aspectRatio;
        }

        // Center the image
        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;

        // Add image to PDF
        pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);

        // Save the PDF
        pdf.save(filename);
      } catch (error) {
        console.error("Error exporting to PDF:", error);
        throw new Error("Failed to export PDF. Please try again.");
      }
    },
    []
  );

  return {
    exportToPDF,
    isExporting: false, // Could be enhanced with state management for loading states
  };
}
