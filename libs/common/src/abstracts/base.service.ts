import { IBaseCrudService, IBasePaginated, SearchQueryDto } from "../interfaces";
import { BaseRepository } from "./base.repository";

export abstract class BaseService<D,S> extends BaseRepository<D,S> implements IBaseCrudService<D,S> {}