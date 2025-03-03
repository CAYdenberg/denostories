import type { FunctionComponent } from "preact";

interface LucideProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

import {
  CheckCheck,
  ChevronRight,
  File,
  Search,
  ShieldAlert,
} from "https://esm.sh/lucide-preact@0.299.0/?exports=Search,File,ChevronRight,ShieldAlert,CheckCheck";
export const FileIcon = File as FunctionComponent<LucideProps>;
export const SearchIcon = Search as FunctionComponent<LucideProps>;
export const ChevronIcon = ChevronRight as FunctionComponent<LucideProps>;
export const FailureIcon = ShieldAlert as FunctionComponent<LucideProps>;
export const SuccessIcon = CheckCheck as FunctionComponent<LucideProps>;
