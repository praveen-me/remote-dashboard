export interface ChipProps {
  text: string;
  variant?: "primary" | "secondary";
}

export default function Chip(props: ChipProps) {
  const { text, variant = "primary" } = props;

  let chipClassName =
    "flex justify-center items-center px-2 py-1 rounded-full whitespace-nowrap ";
  if (variant === "primary") {
    chipClassName += " text-indigo-700 bg-indigo-50";
  } else {
    chipClassName += " text-gray-800 bg-gray-100";
  }

  return <span className={chipClassName}>{text}</span>;
}
