import { Roll } from "src/enums/account";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Contract } from "./contract.entity";
import { Property } from "./property.entity";

@Entity({
    name: "accounts"
})

export class Account {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    password: string

    @Column({ unique: true, length: 20, nullable: false })
    userName: string

    @Column()
    roll: Roll = Roll.USER

    @OneToOne(() => User, (user) => user.account_)
    @JoinColumn()
    user_: User;

    @OneToMany(() => Contract, (contract) => contract.account_ )
    contract_: Contract[]

    @OneToMany( () => Property, (property) => property.account_)
    property_: Property

}
