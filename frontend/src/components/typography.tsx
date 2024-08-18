export interface TypographyProps {
  children?: React.ReactNode;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2";
}

export default function Typography(props: TypographyProps) {
  const { children = null, variant = "body1" } = props;

  let typographyClassName = "";
  if (variant === "h1") {
    typographyClassName += "text-4xl font-bold";
  } else if (variant === "h2") {
    typographyClassName += "text-3xl font-bold";
  } else if (variant === "h3") {
    typographyClassName += "text-2xl font-bold";
  } else if (variant === "h4") {
    typographyClassName += "text-xl font-bold";
  } else if (variant === "h5") {
    typographyClassName += "text-lg font-bold";
  } else if (variant === "h6") {
    typographyClassName += "text-base font-bold";
  } else if (variant === "subtitle1") {
    typographyClassName += "text-base font-medium";
  } else if (variant === "subtitle2") {
    typographyClassName += "text-sm font-medium";
  } else if (variant === "body2") {
    typographyClassName += "text-sm";
  } else {
    // body1 is the default
    typographyClassName += "text-base";
  }

  return <span className={typographyClassName}>{children}</span>;
}
