import { Response, Request } from "express";

export class ApiResponse<T = any>{

    constructor(private status: string, private message: string, private data: T | null){}   

    static success<T>(message: string, data: T): ApiResponse<T> {
        return new ApiResponse("SUCCESS", message, data);
    }

    static error(message: string, error: unknown | Error): ApiResponse<null>{
        const errorOrNot = error instanceof Error ? error.message : message;
        return new ApiResponse("ERROR", errorOrNot, null);
    }

    static errorValidacion(message: string): ApiResponse<null>{
        return new ApiResponse("ERROR", message, null);
    }
}