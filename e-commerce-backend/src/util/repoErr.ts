import { RepositoryError } from "../repository/user.repository";

// Type guard — narrows UserLoginData | RepositoryError to the error branch

export default function isRepositoryError(
    value: unknown
): value is RepositoryError {

    return (
        typeof value === "object" &&
        value !== null &&
        "isError" in value
    );
}