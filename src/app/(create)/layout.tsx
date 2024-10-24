import PageHeader from "@/components/shared/layout/PageHeader/PageHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "../../config/auth-options";
import { redirect } from "next/navigation";

export default async function Createlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <PageHeader session={session} />
      {children}
    </>
  );
}
