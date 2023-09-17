import { Metadata } from "next";
import { Home } from "ui";
export function giveMetaData(title: string, description: string) {
  return {
    title,
    description,
  };
}
export const metadata: Metadata = giveMetaData(
  "HOME-FIT WEAR",
  "This is home page"
);
export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}
