'use client';
import OButton from "@/components/OButton";

export default function Dashboard() {
  return (
    OButton({ color: "blue", title: "Click me", border: "none", onClick: () => console.log("Button clicked") })
  );
}
