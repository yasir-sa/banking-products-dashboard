const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const date = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" });

// Formats a metric value based on the `format` sent by the API.
export const formatMetric = ({ value, format }) => {
  switch (format) {
    case "currency":
      return currency.format(value);
    case "percent":
      return `${Number(value).toFixed(2).replace(/\.?0+$/, "")}%`;
    case "date":
      return date.format(new Date(value));
    default:
      return String(value);
  }
};

export const formatTime = (d) =>
  d ? d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "";
