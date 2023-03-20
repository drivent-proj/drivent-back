import { ApplicationError } from "@/protocols";

export function TimeConflictError(name: string): ApplicationError {
  return {
    name: "TimeConflictError",
    message: `Horaŕio conflitante com o curso ${name}.`,
  };
}
