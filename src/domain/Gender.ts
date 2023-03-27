export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export const toGender = (name?: keyof typeof Gender) => {
  return name && Gender[name]
}
