import { Household, HouseholdRole, User } from "@prisma/client";

class HousholdUserDto{
    household:Household;
    user:User;
    role:HouseholdRole
}
export {HousholdUserDto}