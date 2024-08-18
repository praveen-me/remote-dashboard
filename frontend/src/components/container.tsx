export interface ContainerProps {
  children?: React.ReactNode;
}

export default function Container(props: ContainerProps) {
  return (
    <div className="container mx-auto px-4 max-w-screen-lg">
      {props.children}
    </div>
  );
}
