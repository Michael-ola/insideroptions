export default function toFloat(input: string | number): number | null {
  if (typeof input === "number") {
    return input;
  }

  if (typeof input === "string") {
    const cleanedStr = input.replace(/,|\s/g, "");
    const num = parseFloat(cleanedStr);
    return isNaN(num) ? null : num;
  }
  return null;
}
