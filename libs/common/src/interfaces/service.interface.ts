import { SearchQueryDto } from "./search-query.dto";
import { IBasePaginated } from "./base.paginable";

export interface IBaseCrudService<D,S> {
     create(data: Partial<D>): Promise<S>; 
     search(query: SearchQueryDto): Promise<IBasePaginated<S>>;
     searchAll(filters: SearchQueryDto): Promise<S[]>;
     findById(id: number):Promise<S | null>;
     update(id: number, data: Partial<D>): Promise<S>;
     delete(id: number): Promise<void>;
     count(filters: SearchQueryDto): Promise<number>;
     exists(id: number): Promise<boolean>;
}

export interface ResponseSummary<T>{
  data?:T,
  message?:string,
  success:boolean 
}
