export {
  paramCase as kebabCase,
  sentenceCase,
} from "https://deno.land/x/case@2.2.0/mod.ts";
export { expandGlob } from "$std/fs/mod.ts";
export * as path from "jsr:@std/path";

/**
 * ICONS
 */

import type { FunctionComponent } from "preact";
interface LucideProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
}
import {
  ChevronRight,
  File,
  Search,
} from "https://esm.sh/lucide-preact@0.299.0/?exports=Search,File,ChevronRight";
export const FileIcon = File as FunctionComponent<LucideProps>;
export const SearchIcon = Search as FunctionComponent<LucideProps>;
export const ChevronIcon = ChevronRight as FunctionComponent<LucideProps>;
