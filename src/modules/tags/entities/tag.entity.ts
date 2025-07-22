import { Collection, Entity, Index, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseEntity } from "src/common/utils/base.entity";
import { Question } from "src/modules/questions/entities/question.entity";

@Entity({
    tableName: 'tags'
})
export class Tag extends BaseEntity {

    @Index()
    @Property({
        type: 'varchar',
        length: 50
    })
    name:string

    @ManyToMany(() => Question , q => q.tags)
    questions: Collection<Question> = new Collection(this)
}