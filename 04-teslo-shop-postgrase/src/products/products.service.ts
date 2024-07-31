import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleService } from 'src/common/common.error-handle.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { FunctionsService } from 'src/common/common.functions.service';
import { Product, ProductImage } from './entities';

@Injectable()
export class ProductsService {
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository:Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository:Repository<ProductImage>,
    private readonly errorHandleService:ErrorHandleService,
    private readonly functionsService:FunctionsService
  ) { }
  
  async create(createProductDto: CreateProductDto) {
    try {
      const {images = [], ...productDetails} = createProductDto;

      const product = this.productRepository.create({
        ...productDetails,
        images: images.map(image => this.productImageRepository.create({url:image}))
      });
      
      await this.productRepository.save(product);

      return {...product, images};
    } catch (error) {
      this.errorHandleService.errorHandleDB(error);
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true
      }
    });

    return products.map(({images, ...rest}) => ({
      ...rest,
      images: images.map(img => img.url)
    }));
  }

  async findOne(term: string) {
    
    let product:Product;
    if (this.functionsService.isUUID(term)) {
      product = await this.productRepository.findOneBy({productId:term});
    } else {
      const queryBuilder = this.productRepository.createQueryBuilder('prod');
      product = await queryBuilder
        .select('prod', 'prodImages.url')
        .where('slug = :slug OR UPPER(title) = :title', {
          slug:term.toLocaleLowerCase(),
          title:term.toUpperCase()
        }).leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }

    if (!product) this.errorHandleService.errorHandle(`Product with search end "${term}" not found`, 'nfe'); 

    return product;
  }

  async findOnePlain(term:string) {
    const {images = [], ...rest} = await this.findOne(term);

    return {
      ...rest,
      images: images.map(image => image.url)
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.preload({
        productId:id,
        ...JSON.parse(JSON.stringify(updateProductDto))
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
