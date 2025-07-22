import { EntityData, RequestContext } from '@mikro-orm/core';

export function getOriginalEntity<Entity extends object>(
  entity: Entity,
): EntityData<Entity> | undefined {
  const em = RequestContext.getEntityManager();
  if (em === undefined) {
    //TODO replace it with central exception
    throw 'ORM NoT INIT';
  }

  return em.getUnitOfWork().getOriginalEntityData(entity);
}

export function isDirty<Entity extends object>(entity: Entity, field: keyof Entity): boolean {
  const original = getOriginalEntity(entity);
  if (!original) {
    // means it's in creation status
    return true;
  }
  return original[field as string] !== entity[field as string];
}
