import { PrismaClient } from '@prisma/client';
import { IBaseCrudService, IBasePaginated, SearchQueryDto } from '../interfaces';


export abstract class BaseRepository<D, S> implements IBaseCrudService<D, S> {
  protected abstract model: PrismaClient;

  async create(data: Partial<D>): Promise<S> {
    return await this.model.create({ data });
  }

  async searchPaginated(query: SearchQueryDto): Promise<IBasePaginated<S>> {
    const {
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      orderBy = 'desc',
      fieldFilters,
    } = query;

    const where: any = {};
    if (search) {
      const stringFields = Object.keys(this.model.fields).filter(
        (field: string) => this.model.fields[field].type === 'String',
      );
      where.OR = stringFields.map((field: string) => ({
        [field]: { contains: search, mode: 'insensitive' },
      }));
    }

    const orderCondition = {
      [sortBy]: orderBy,
    };

    if (fieldFilters) {
      for (const [key, value] of Object.entries(fieldFilters)) {
        where[key] = { in: value };
      }
    }

    const validatedLimit = Math.min(Math.max(limit, 1), 100);
    const validatedPage = Math.max(page, 1);
    const skip = (validatedPage - 1) * validatedLimit;

    const [data, total] = await Promise.all([
      this.model.findMany({
        where,
        skip,
        take: validatedLimit,
        orderBy: orderCondition,
      }),
      this.model.count({ where }),
    ]);
    const totalPages = Math.ceil(total / validatedLimit);

    return {
      data,
      pagination: {
        page: validatedPage,
        limit: validatedLimit,
        total,
        totalPages,
      },
    };
  }

  async search(query: SearchQueryDto): Promise<IBasePaginated<S>> {
    return await this.model.findMany({
      where: {
        ...query.toQueryObject(),
      },
      orderBy: query.sortBy
        ? { [query.sortBy]: query.orderBy || 'asc' }
        : undefined,
      skip: ((query.page || 1) - 1) * (query.limit || 10),
      take: query.limit || 10,
    });
  }

  async searchAll(query: SearchQueryDto): Promise<S[]> {
    const {
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      orderBy = 'desc',
      fieldFilters,
    } = query;
    const where: any = {};
    if (search) {
      const stringFields = Object.keys(this.model.fields).filter(
        (field: string) => this.model.fields[field].type === 'String',
      );
      where.OR = stringFields.map((field: string) => ({
        [field]: { contains: search, mode: 'insensitive' },
      }));
    }

    // Construction de l'ordre de tri
    const orderCondition = {
      [sortBy]: orderBy,
    };

    if (fieldFilters) {
      for (const [key, value] of Object.entries(fieldFilters)) {
        where[key] = { in: value };
      }
    }
    const skip = ((page || 1) - 1) * (limit || 10);
    const take = limit || 10;
    const [data, total] = await Promise.all([
      this.model.findMany({
        where,
        skip,
        take,
        orderBy: orderCondition,
      }),
      this.model.count({ where }),
    ]);

    return data;
  }

  async findById(id: any): Promise<S | null> {
    return await this.model.findUnique({ where: { id } });
  }

  async findBy(field: any): Promise<S | null> {
    return await this.model.findUnique({ where: { ...field } });
  }

  async update(id: number, data: Partial<D>): Promise<S> {
    return await this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    return await this.model.delete({ where: { id } });
  }

  async count(filters: SearchQueryDto): Promise<number> {
    return await this.model.count({
      where: {
        ...filters.toQueryObject(),
      },
    });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.model.count({ where: { id } });
    return count > 0;
  }
}
