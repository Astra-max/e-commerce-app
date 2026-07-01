import { User } from "../../types";
import { RepositoryError } from "../repository/user.repository";

// Type guard — narrows User | RepositoryError to the error branch
export default function isRepositoryError(val: User | RepositoryError): val is RepositoryError {
    return (val as RepositoryError).isError === true;
}