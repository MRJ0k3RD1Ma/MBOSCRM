export function formatDashboardNumber(number: number) {
  if (Math.abs(number) >= 1000) {
    const inThousands = number / 1000;
    return (
      new Intl.NumberFormat("ru-RU", {
        maximumFractionDigits: 0,
      }).format(inThousands) + "k"
    );
  }
  return new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(number);
}

export function formatMoney(value?: number) {
  if (value == null) return "0 so'm";
  return formatDashboardNumber(value) + " so'm";
}
