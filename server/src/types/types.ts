import {RequestHandler} from "express";

export type Controller = { [key: string]: RequestHandler };