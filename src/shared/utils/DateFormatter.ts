export function formatDate(
    dateString: string,
    locale: string = "es-CO",
    options?: Intl.DateTimeFormatOptions
): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Fecha inválida";

    // Validar si el entorno soporta dateStyle
    const supportsDateStyle = (() => {
        try {
            new Intl.DateTimeFormat(locale, { dateStyle: "short" });
            return true;
        } catch {
            return false;
        }
    })();

    if (supportsDateStyle && options) {
        return new Intl.DateTimeFormat(locale, options).format(date);
    }

    // fallback seguro
    return `${date.toLocaleDateString(locale)} ${date.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
    })}`;
}