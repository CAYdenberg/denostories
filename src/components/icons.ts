import type { FunctionComponent } from "preact";
interface LucideProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}
import {
  ChevronRight,
  File,
  Search,
} from "https://esm.sh/lucide-preact@0.299.0/?exports=Search,File,ChevronRight";
export const FileIcon = File as FunctionComponent<LucideProps>;
export const SearchIcon = Search as FunctionComponent<LucideProps>;
export const ChevronIcon = ChevronRight as FunctionComponent<LucideProps>;
