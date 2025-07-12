import { useEffect } from "react";

/**
 * Set document.title and (optionally) meta tags.
 *
 * @param {string} title       - The string you want in the browser tab.
 * @param {Object[]} [meta=[]] - Array of meta descriptors:
 *   { name: "description", content: "..." }
 *   OR { property: "og:title", content: "..." }
 */
export function useDocumentHead(title, meta = []) {
  useEffect(() => {
    if (title) document.title = title;

    // Track tags we add so we can clean them up
    const addedTags = [];

    meta.forEach(({ name, property, content }) => {
      const selector = name
        ? `meta[name="${name}"]`
        : `meta[property="${property}"]`;

      let tag = document.head.querySelector(selector);

      if (!tag) {
        tag = document.createElement("meta");
        if (name) tag.setAttribute("name", name);
        if (property) tag.setAttribute("property", property);
        document.head.appendChild(tag);
        addedTags.push(tag);
      }

      tag.setAttribute("content", content);
    });

    return () => {
      // Clean up only the tags we added
      addedTags.forEach((tag) => {
        document.head.removeChild(tag);
      });
    };
  }, [title, meta]);
}
