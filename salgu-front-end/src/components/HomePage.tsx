import React from "react";
import Nav from "./NavBar";

export default function Homepage({ Toggle }: { Toggle: () => void }) {
  return (
    <div>
      <Nav Toggle={Toggle} />
    </div>
  );
}
