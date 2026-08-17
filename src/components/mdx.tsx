import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  Callout,
  FileTree,
  FileTreeItem,
  QuickLink,
  QuickLinkGrid,
  Step,
  Steps,
} from '@/components/docs/blocks';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Callout,
    FileTree,
    FileTreeItem,
    QuickLink,
    QuickLinkGrid,
    Step,
    Steps,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
