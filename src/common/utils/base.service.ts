import { EntityManager, FilterQuery, RequestContext } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { QueryBuilder , EntityManager as QBDriver } from '@mikro-orm/postgresql';

type EntityConstruct<Entity> = { new (): Entity };

export class BaseService<Entity extends BaseEntity> {
  protected entity: EntityConstruct<Entity>;

  constructor(entity: EntityConstruct<Entity>) {
    this.entity = entity;
  }

  public async all() {
    return await this.entityManager.findAll<User>(this.entity);
  }

  public async paginate(
    page: number,
    limit: number,
    where?: FilterQuery<NoInfer<Entity>>,
  ) {
    const offset = (page - 1) * limit;
    return await this.entityManager.findAndCount(this.entity, where, {
      limit,
      offset,
    });
  }

  protected get entityManager(): EntityManager {
    const em = RequestContext.getEntityManager();
    if (em === undefined)
      throw new Error('EntityManager not found in request context');
    return em;
  }

  public QB<Entity extends object, RootAlias extends string = never>(rootAlias?:RootAlias): QueryBuilder<
    Entity,
    RootAlias
  > {
    const em = this.entityManager as QBDriver;
    return em.createQueryBuilder<Entity , RootAlias>(this.entity , rootAlias);
  }
}
