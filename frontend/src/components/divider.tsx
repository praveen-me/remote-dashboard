export interface DividerProps {
  /** Orientation of the divider */
  orientation?: "horizontal" | "vertical";
}

export default function Divider(props: DividerProps) {
  return (
    <div
      className={`bg-black rounded-full ${
        props.orientation === "vertical" ? "w-[3px] h-full" : "h-[3px] w-full"
      }`}
    ></div>
  );
}
