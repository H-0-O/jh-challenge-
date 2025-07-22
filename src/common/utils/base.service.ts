import { EntityManager, RequestContext } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { User } from 'src/modules/users/entities/user.entity';

type EntityConstruct<Entity> = { new (): Entity };

export class BaseService<Entity extends BaseEntity> {
  protected entity: EntityConstruct<Entity>;

  constructor(entity: EntityConstruct<Entity>) {
    this.entity = entity;
  }

  public async all() {
    return await this.entityManager.findAll<User>(this.entity);
  }
  protected get entityManager(): EntityManager {
    const em = RequestContext.getEntityManager();
    if (em === undefined)
      throw new Error('EntityManager not found in request context');
    return em;
  }
}
