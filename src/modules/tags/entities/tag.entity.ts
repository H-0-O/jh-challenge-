import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseEntity } from "src/common/utils/base.entity";

@Entity({
    tableName: 'tags'
})
export class Tag extends BaseEntity {

    @Property({
        type: 'varchar',
        length: 50
    })
    name:string
}