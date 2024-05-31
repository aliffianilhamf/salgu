import React from "react";
import Navbar from "./NavBar";

export default function Homepage({ Toggle }: { Toggle: () => void }) {
  return <Navbar Toggle={Toggle} />;
}
