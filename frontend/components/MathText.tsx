'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTextProps {
  text?: string;
  className?: string;
  block?: boolean;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const greekUnicodeToLatex: Record<string, string> = {
  'α': '\\alpha', 'β': '\\beta', 'γ': '\\gamma', 'δ': '\\delta',
  'ε': '\\epsilon', 'ϵ': '\\epsilon', 'θ': '\\theta', 'μ': '\\mu',
  'σ': '\\sigma', 'ϕ': '\\phi', 'φ': '\\phi', 'ψ': '\\psi',
  'ω': '\\omega', 'λ': '\\lambda', 'ρ': '\\rho', 'π': '\\pi',
  'Σ': '\\Sigma', 'Π': '\\Pi', 'Ω': '\\Omega', 'Δ': '\\Delta'
};

const mathOpsToLatex: Record<string, string> = {
  '≈': ' \\approx ', '∼': ' \\sim ', '⊙': ' \\odot ', '·': ' \\cdot ',
  '×': ' \\times ', '∈': ' \\in ', '≤': ' \\le ', '≥': ' \\ge ',
  '≠': ' \\ne ', '±': ' \\pm ', '⇒': ' \\Rightarrow ', '→': ' \\to ',
  '½': '\\frac{1}{2}', '¼': '\\frac{1}{4}', '−': '-'
};

const superscripts: Record<string, string> = {
  '²': '^2', '³': '^3', '⁴': '^4', 'ⁿ': '^n',
  'ᵢ': '_i', 'ⱼ': '_j'
};

/**
 * Pre-processes plain math formulas that lack $...$ delimiters into LaTeX.
 */
function autoFormatMathText(text: string): string {
  if (!text) return '';

  // If text already has explicit LaTeX delimiters, preserve them
  if (/\$[^$]+\$|\\\([\s\S]+?\\\)|\\\[[\s\S]+?\\\]|\$\$[\s\S]+?\$\$/.test(text)) {
    return text;
  }

  const lines = text.split('\n');
  const processedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (!trimmed) return line;

    // Check if the entire line looks like a formula or equation (e.g. q_ϕ(z|x) = N(μ, σ²), p(z) = N(0, 1), DKL = ...)
    const isFormulaLine =
      /^(?:[a-zA-ZαβγδεϵθμσϕφψωλρπΣΠΩΔ_][a-zA-Z0-9_\^\{\}\(\)\|,\s\*\+\-\/\[\]αβγδεϵθμσϕφψωλρπΣΠΩΔ~≈∼⊙·×∈≤≥≠±⇒→²³⁴ⁿᵢⱼ]*[\=\≈\∼\∈\≤\≥\≠\→\⇒][a-zA-Z0-9_\^\{\}\(\)\|,\s\*\+\-\/\[\]αβγδεϵθμσϕφψωλρπΣΠΩΔ~≈∼⊙·×∈≤≥≠±⇒→²³⁴ⁿᵢⱼ\.]+)$/.test(trimmed) &&
      !/(?:which|statement|correct|following|because|therefore|suppose|yields|calculated|where|when|during|consider|calculate|given|assume)\b/i.test(trimmed);

    if (isFormulaLine) {
      let formula = trimmed;
      formula = formula.replace(/\bN\(/g, '\\mathcal{N}(');
      formula = formula.replace(/\bDKL\b/g, 'D_{KL}');
      formula = formula.replace(/\bD_KL\b/g, 'D_{KL}');
      formula = formula.replace(/\blog\(/g, '\\log(');
      formula = formula.replace(/\bln\(/g, '\\ln(');
      formula = formula.replace(/\bexp\(/g, '\\exp(');

      for (const [k, v] of Object.entries(greekUnicodeToLatex)) {
        formula = formula.replaceAll(k, v);
      }
      for (const [k, v] of Object.entries(mathOpsToLatex)) {
        formula = formula.replaceAll(k, v);
      }
      for (const [k, v] of Object.entries(superscripts)) {
        formula = formula.replaceAll(k, v);
      }

      return `$${formula}$`;
    }

    // Check for inline equations/assignments like "μ = 1", "σ² = 1", "θ = 4 × 10^9"
    let modified = line;
    modified = modified.replace(
      /([a-zA-ZαβγδεϵθμσϕφψωλρπΣΠΩΔ][a-zA-Z0-9_²³⁴]*\s*[\=\≈\∼]\s*[-+]?[0-9a-zA-Z\.\^]+)/g,
      (m) => {
        let f = m;
        for (const [k, v] of Object.entries(greekUnicodeToLatex)) f = f.replaceAll(k, v);
        for (const [k, v] of Object.entries(mathOpsToLatex)) f = f.replaceAll(k, v);
        for (const [k, v] of Object.entries(superscripts)) f = f.replaceAll(k, v);
        return `$${f}$`;
      }
    );

    return modified;
  });

  return processedLines.join('\n');
}

/**
 * Converts text containing math (LaTeX or Unicode) into KaTeX rendered HTML.
 */
function renderMathToHtml(inputText: string): string {
  if (!inputText) return '';
  const text = autoFormatMathText(inputText);

  // Regex matches:
  // 1) $$ ... $$ (display math)
  // 2) \[ ... \] (display math)
  // 3) $ ... $ (inline math)
  // 4) \( ... \) (inline math)
  const mathRegex = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\$([^\$\n]+?)\$|\\\(([\s\S]+?)\\\)/g;

  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = mathRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plain = text.substring(lastIndex, match.index);
      result += formatPlainText(plain);
    }

    const displayMath = match[1] || match[2];
    const inlineMath = match[3] || match[4];

    if (displayMath !== undefined) {
      try {
        const rendered = katex.renderToString(displayMath.trim(), {
          displayMode: true,
          throwOnError: false,
        });
        result += `<div class="katex-display-wrapper my-2.5 overflow-x-auto py-1">${rendered}</div>`;
      } catch {
        result += `<div class="katex-display-wrapper my-2 font-katex-math">${escapeHtml(displayMath)}</div>`;
      }
    } else if (inlineMath !== undefined) {
      try {
        const rendered = katex.renderToString(inlineMath.trim(), {
          displayMode: false,
          throwOnError: false,
        });
        result += `<span class="katex-inline-wrapper mx-0.5 inline-block align-baseline">${rendered}</span>`;
      } catch {
        result += `<span class="katex-inline-wrapper font-katex-math">${escapeHtml(inlineMath)}</span>`;
      }
    }

    lastIndex = mathRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    result += formatPlainText(text.substring(lastIndex));
  }

  return result;
}

function formatPlainText(str: string): string {
  const escaped = escapeHtml(str);
  // Style any remaining Greek letters or math symbols with the KaTeX serif math font
  const styled = escaped.replace(
    /([αβγδεϵθμσϕφψωλρπΣΠΩΔ≈∼⊙·×∈≤≥≠±⇒→²³⁴ⁿᵢⱼ])/g,
    '<span class="font-katex-math">$1</span>'
  );
  return styled.replace(/\n/g, '<br />');
}

export function MathText({ text = '', className = '', block = false }: MathTextProps) {
  const html = useMemo(() => renderMathToHtml(text), [text]);

  if (block) {
    return (
      <div
        className={`math-rendered-content ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`math-rendered-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
export default MathText;
