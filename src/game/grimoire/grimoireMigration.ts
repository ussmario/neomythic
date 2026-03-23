export function migrateGrimoire(data: any) {

  if (!data.version) {
    return {
      version: 1,
      creatures: data
    }
  }

  if (data.version === 1) {
    return data
  }

  return data
}