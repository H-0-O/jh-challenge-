import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseEntity } from "src/common/utils/base.entity";
import { Question } from "src/modules/questions/entities/question.entity";

@Entity({
    tableName: 'tags'
})
export class Tag extends BaseEntity {

    @Property({
        type: 'varchar',
        length: 50
    })
    name:string

    @ManyToMany(() => Question)
    questions: Collection<Question> = new Collection(this)
}