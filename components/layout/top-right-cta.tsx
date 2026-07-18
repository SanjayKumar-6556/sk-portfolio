import { Button } from "@/components/ui/button";

export function TopRightCTA() {
  return (
    <div className="fixed right-6 top-6 z-50 hidden print:hidden md:block">
      <Button href="/contact" variant="primary" className="text-xs uppercase tracking-wide">
        Get in touch
      </Button>
    </div>
  );
}
