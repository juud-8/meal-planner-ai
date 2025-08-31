import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Hello, Meal Planner!</h1>
      <Button>Get Started</Button>
    </div>
  );
}
