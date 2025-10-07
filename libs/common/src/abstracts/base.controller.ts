import { Body, Delete, Get, Param, Post, Put } from "@nestjs/common"; 
import { IBaseCrudService, IBasePaginated, SearchQueryDto } from "../interfaces";


export abstract class BaseController<D,S> implements IBaseCrudService<D,S> {
  protected abstract service: IBaseCrudService<D,S>;

    @Post('create')
    async create(@Body() data: Partial<D>): Promise<S> {
        return this.service.create(data);
    }

    @Get('detail/:id')
    async findById(@Param('id') id: number): Promise<S | null>{
        return this.service.findById(id);
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() data: Partial<D>):Promise<S> {
        return this.service.update(id, data);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.service.delete(id);
    }

    @Post('count')
    async count(@Body() filters: SearchQueryDto): Promise<number> {
        return this.service.count(filters);
    }

    @Get('exists/:id')
    async exists(@Param('id') id: number): Promise<boolean> {
        return this.service.exists(id);
    }

    @Post('search')
    async search(@Body() query: SearchQueryDto): Promise<IBasePaginated<S>>  {
        return this.service.search(query);
    }

    @Post('search-all')
    async searchAll(@Body() filters: SearchQueryDto):  Promise<S[]>{
        return this.service.searchAll(filters);
    } 
}
