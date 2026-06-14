import { GitFork } from "lucide-react";

export function Footer() {
  return (
    <footer className="h-[72px] flex items-center px-6 border-t border-border-default bg-bg-base">
      <p className="text-label-md text-text-muted mr-auto">
        © 2026 SpecLens · MIT License
      </p>
      <p className="text-label-md text-text-muted hidden sm:block">
        Built to make specs sharper
      </p>
      <a
        href="https://github.com/RahulSriv/speclens"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto flex items-center gap-1.5 text-label-md text-text-muted hover:text-text-secondary transition-colors"
      >
        <GitFork className="w-4 h-4" />
        Star on GitHub
      </a>
    </footer>
  );
}
