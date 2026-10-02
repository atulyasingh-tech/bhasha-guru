// High-Performance KaTeX Math Formula Renderer
// Formats inline $...$ and block $$...$$ LaTeX syntax gracefully

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function MathRenderer({ content, block = false, className = '' }) {
  if (!content) return null;

  // Direct block mode if explicitly requested
  if (block) {
    const rendered = useMemo(() => {
      try {
        if (typeof content !== 'string') return '';
        const cleanLatex = content.replace(/^\$\$|\$\$$/g, '').trim();
        return katex.renderToString(cleanLatex, {
          displayMode: true,
          throwOnError: false
        });
      } catch (e) {
        return `<code>${String(content)}</code>`;
      }
    }, [content]);

    return (
      <div 
        className={`math-block-container ${className}`}
        dangerouslySetInnerHTML={{ __html: rendered }} 
      />
    );
  }

  // Parse mixed text with $inline$ and $$display$$ delimiters
  const parsedElements = useMemo(() => {
    if (typeof content !== 'string') return [];

    const parts = [];
    const regex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          value: content.substring(lastIndex, match.index)
        });
      }

      const matchStr = match[0];
      const isDisplay = matchStr.startsWith('$$');
      const mathCode = isDisplay 
        ? matchStr.slice(2, -2).trim() 
        : matchStr.slice(1, -1).trim();

      try {
        const html = katex.renderToString(mathCode, {
          displayMode: isDisplay,
          throwOnError: false
        });
        parts.push({ type: 'math', html, isDisplay });
      } catch (err) {
        parts.push({ type: 'text', value: matchStr });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        value: content.substring(lastIndex)
      });
    }

    return parts;
  }, [content]);

  if (Array.isArray(parsedElements) && parsedElements.length > 0) {
    return (
      <span className={`math-text-stream ${className}`}>
        {parsedElements.map((item, i) => {
          if (item.type === 'text') {
            return <span key={i}>{item.value}</span>;
          }
          return (
            <span
              key={i}
              className={item.isDisplay ? 'math-display-wrap' : 'math-inline-wrap'}
              dangerouslySetInnerHTML={{ __html: item.html }}
            />
          );
        })}
      </span>
    );
  }

  if (typeof content === 'string' || typeof content === 'number') {
    return <span>{content}</span>;
  }

  return null;
}
