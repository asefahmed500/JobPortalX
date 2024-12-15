// No "use client" here; this is a server component
import "./globals.css";
import RootLayout from "./RootLayout";

export const metadata = {
  title: "JOB PORTAL X",
  description: "JOB PORTAL X",
};

export default function Layout({ children }) {
  return (
    <RootLayout>
      {children}
    </RootLayout>
  );
}
