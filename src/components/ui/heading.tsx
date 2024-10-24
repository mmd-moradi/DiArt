import { cn } from "@/lib/utils";
import localFont from "next/font/local";

const CalSans = localFont({
  src: [{ path: "../../../fonts/CalSans-SemiBold.woff2" }],
  display: "swap",
});

export const Heading = ({
  children,
  className,
  as: Tag = "h1",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) => {
  return (
    <Tag
      className={cn(
        CalSans.className,
        "text-white text-3xl md:text-4xl lg:text-7xl font-bold",
        className,
      )}
    >
      {children}
    </Tag>
  );
};
