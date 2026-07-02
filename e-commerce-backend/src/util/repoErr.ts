import { RepositoryError } from "../repository/user.repository";
import { UserLoginData } from "../repository/user.repository";

// Type guard — narrows UserLoginData | RepositoryError to the error branch
export default function isRepositoryError(val: UserLoginData | RepositoryError): val is RepositoryError {
    return (val as RepositoryError).isError === true;
}