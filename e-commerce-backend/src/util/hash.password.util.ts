import bcrypt from "bcrypt";


export const hashPassword = async (password: string): Promise<string> => {
    const cost = 10; // Number of salt rounds
    try {
        const hashedPassword = await bcrypt.hash(password, cost);
        return hashedPassword;
    } catch (error: any) {
        throw new Error("Error hashing password: " + error.message);
    }
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error: any) {
        throw new Error("Error comparing password: " + error.message);
    }
}