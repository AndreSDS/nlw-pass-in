import { ComponentProps } from "react";
import { cn } from "../../utils/cn";

const TRComponent = (props: ComponentProps<"tr">) => {
  return (
    <tr
      className={cn("border-b border-white/10", props.className)}
      {...props}
    />
  );
};

const THComponent = (props: ComponentProps<"th">) => {
  return (
    <th
      className={cn(
        "text-left py-3 px-4 text-sm font-semibold",
        props.className
      )}
      {...props}
    />
  );
};

const TDComponent = (props: ComponentProps<"td">) => {
  return (
    <td
      className={cn("py-3 px-4 text-sm text-zinc-300", props.className)}
      {...props}
    />
  );
};

const TBodyComponent = (props: ComponentProps<"tbody">) => {
  return <tbody className={cn(props.className)} {...props} />;
};

const THeadComponent = (props: ComponentProps<"thead">) => {
  return <thead className={cn(props.className)} {...props} />;
};

const TFootComponent = (props: ComponentProps<"tfoot">) => {
  return <tfoot className={cn(props.className)} {...props} />;
};

const Table = (props: ComponentProps<"table">) => {
  return (
    <div className="w-full border border-white/10 rounded-lg">
      <table className={cn("w-full", props.className)} {...props} />
    </div>
  );
};

const TableComponents = {
  Table,
  TBodyComponent,
  TDComponent,
  TFootComponent,
  THComponent,
  THeadComponent,
  TRComponent,
};

export { TableComponents };
