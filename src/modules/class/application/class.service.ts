import { CLASSES } from "../class.constants.js"
import { IClass } from "../class.types.js"

export class ClassService {
  getAll(): IClass[] {
    return Object.values(CLASSES)
  }

  getById(id: string): IClass | null {
    return CLASSES[id] ?? null
  }

  getExpMultiplier(classId: string | null): number {
    if (!classId) return 1.0
    return CLASSES[classId]?.expMultiplier ?? 1.0
  }

  getMoneyMultiplier(classId: string | null): number {
    if (!classId) return 1.0
    return CLASSES[classId]?.moneyMultiplier ?? 1.0
  }
}