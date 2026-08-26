import { db } from "../../config/db.js"
import { eq } from "drizzle-orm"
import { paginateAndSearch } from "../utils/queryhelper.js"

export async function commonCreate(table, data) {
  const [result] = await db.insert(table).values(data).returning()

  return result
}

export async function commonFindById(table, id) {
  const [result] = await db.select().from(table).where(eq(table.id, id))
  return result
}

export async function commonFindAll(table, query = {}) {

  const result = await paginateAndSearch(table, {
    query: query.search,
    searchFields: query.searchFields,
    page: query.page,
    pageSize: query.pageSize,
    orderBy: query.orderBy,
    where: query.where,
  })
  return result
}

export async function commonUpdate(table, id, data) {
  const [result] = await db.update(table).set(data).where(eq(table.id, id)).returning()
  return result
}

export async function commonDelete(table, id) {
  const [result] = await db.delete(table).where(eq(table.id, id)).returning()
  return result
}
