import * as bcrypt from "bcryptjs";
export const verifyPassword = async ({password, hashedPassword}:{password: string, hashedPassword: string}) => {
    return await bcrypt.compare(password, hashedPassword);
};