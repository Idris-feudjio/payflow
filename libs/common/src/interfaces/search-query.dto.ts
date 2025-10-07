import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, Min, Max, IsIn, IsObject } from 'class-validator';

export class SearchQueryDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsObject()
    fieldFilters?: Record<string, (string | number|boolean)[]>; 

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt';

    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
    orderBy?: 'asc' | 'desc' = 'desc';

    toQueryObject(): Record<string, any> {
        const queryObject: Record<string, any> = {};
        if (this.search) queryObject.search = this.search;
        if (this.fieldFilters) queryObject.fieldFilters = this.fieldFilters;
        if (this.page) queryObject.page = this.page;
        if (this.limit) queryObject.limit = this.limit;
        if (this.sortBy) queryObject.sortBy = this.sortBy;
        if (this.orderBy) queryObject.orderBy = this.orderBy;
        return queryObject;
    }
} 