export const CONSTRAINT_MESSAGES = {
  events_slug_unique: "An event with this URL slug already exists",
  users_email_unique: "This email is already registered",
};

export function humanizeField(column) {
  return column
    .replace(/_id$/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function parseUniqueViolationDetail(detail) {
  // Postgres detail format: Key (column)=(value) already exists.
  const match = detail?.match(/Key \(([^)]+)\)=\(([^)]+)\)/);
  if (!match) return null;
  const [, column, value] = match;
  return { column, value };
}

export function parseForeignKeyDetail(detail) {
  // Postgres detail format: Key (column)=(value) is not present in table "other_table".
  const match = detail?.match(
    /Key \(([^)]+)\)=\(([^)]+)\) is not present in table "([^"]+)"/,
  );
  if (!match) return null;
  const [, column, value, table] = match;
  return { column, value, table };
}
