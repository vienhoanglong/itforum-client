export default function classNames(
  ...args: (string | Record<string, boolean>)[]
): string {
  return args
    .reduce<string[]>((acc, val) => {
      if (typeof val === "string") {
        return acc.concat(val.split(" "));
      }
      return acc.concat(
        Object.entries(val)
          .filter(([_, value]) => value)
          .map(([key]) => key)
      );
    }, [])
    .join(" ");
}
