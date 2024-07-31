import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ErrorHandleService } from 'src/common/common.error-handle.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FunctionsService } from 'src/common/common.functions.service';
import { title } from 'process';

@Injectable()
export class ProductsService {
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>,
    private readonly errorHandleService:ErrorHandleService,
    private readonly functionsService:FunctionsService
  ) { }
  
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      console.log(product);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.errorHandleService.errorHandleDB(error);
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto;

    return await this.productRepository.find({
      take: limit,
      skip: offset
      // TODO: RELACIONES
    });
  }

  async findOne(term: string) {
    
    let product:Product;
    if (this.functionsService.isUUID(term)) {
      product = await this.productRepository.findOneBy({productId:term});
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = await queryBuilder
        .where('slug = :slug OR UPPER(title) = :title', {
          slug:term.toLocaleLowerCase(),
          title:term.toUpperCase()
        }).getOne();
    }

    if (!product) this.errorHandleService.errorHandle(`Product with search end "${term}" not found`, 'nfe'); 

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.preload({
        productId:id,
        ...updateProductDto
      });
  
      if (!product) this.errorHandleService.errorHandle(`Product with id "${id}" not found`, 'nfe'); 
  
      return await this.productRepository.save(product);
    } catch (error) {
      this.errorHandleService.errorHandleDB(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id); 
    await this.productRepository.remove(product);
  }
}
